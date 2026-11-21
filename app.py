"""TS Square - advance food booking. Flask + SQLite backend."""
import os, io, time, math, hmac, hashlib, json, sqlite3, secrets, smtplib, datetime
from functools import wraps
from email.message import EmailMessage
from flask import Flask, request, jsonify, session, g, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash

BASE = os.path.dirname(os.path.abspath(__file__))
DBF, UP = os.path.join(BASE, 'tssquare.db'), os.path.join(BASE, 'uploads')
os.makedirs(UP, exist_ok=True)
RZ_ID, RZ_SECRET = os.environ.get('RAZORPAY_KEY_ID'), os.environ.get('RAZORPAY_KEY_SECRET')
app = Flask(__name__, static_folder='static', static_url_path='')
app.secret_key = os.environ.get('SECRET_KEY', 'change-this-secret')
app.config['MAX_CONTENT_LENGTH'] = 3 * 1024 * 1024

SCHEMA = """
create table if not exists users(id integer primary key, name, email unique, phone, pw, role, blocked int default 0, created real);
create table if not exists rests(id integer primary key, uid int, name, cuisine, address, logo, open_t default '09:00', close_t default '22:00', slot_cap int default 10, status default 'pending');
create table if not exists menu(id integer primary key, rid int, name, price int, img);
create table if not exists orders(id integer primary key, code, uid int, rid int, items, total int, adv int, commission real, date, time, status, pay_id, rz_order, refund, at real);
create table if not exists reviews(id integer primary key, rid int, uid int, rating int, text, at real);
create table if not exists resets(token primary key, uid int, exp real);
create table if not exists settings(k primary key, v);
"""

def db():
    if 'db' not in g:
        g.db = sqlite3.connect(DBF); g.db.row_factory = sqlite3.Row
    return g.db
@app.teardown_appcontext
def _close(e):
    d = g.pop('db', None)
    if d: d.close()
def q(sql, a=(), one=False):
    r = db().execute(sql, a).fetchall(); db().commit()
    return (r[0] if r else None) if one else r
def ins(sql, a=()):
    c = db().execute(sql, a); db().commit(); return c.lastrowid
def err(m, c=400): return jsonify(error=m), c
def ok(**k): return jsonify(ok=True, **k)
def setting(k, d): r = q('select v from settings where k=?', (k,), True); return r['v'] if r else d

def init():
    with sqlite3.connect(DBF) as c:
        c.executescript(SCHEMA)
        if not c.execute("select 1 from users where role='admin'").fetchone():
            c.execute("insert into users(name,email,pw,role,created) values(?,?,?,?,?)", ('Admin',
                os.environ.get('ADMIN_EMAIL', 'admin@tssquare.com').lower(),
                generate_password_hash(os.environ.get('ADMIN_PASSWORD', 'admin123')), 'admin', time.time()))

def mail(to, sub, body):
    host = os.environ.get('SMTP_HOST')
    if not host: print(f'[MAIL to {to}] {sub}\n{body}\n'); return
    try:
        m = EmailMessage(); m['From'] = os.environ.get('SMTP_FROM', os.environ['SMTP_USER']); m['To'] = to; m['Subject'] = sub; m.set_content(body)
        with smtplib.SMTP(host, int(os.environ.get('SMTP_PORT', 587))) as s:
            s.starttls(); s.login(os.environ['SMTP_USER'], os.environ['SMTP_PASS']); s.send_message(m)
    except Exception as e: print('mail error:', e)

def rz(path, data):
    import requests
    return requests.post('https://api.razorpay.com/v1/' + path, json=data, auth=(RZ_ID, RZ_SECRET), timeout=20).json()

def me():
    uid = session.get('uid')
    u = q('select * from users where id=?', (uid,), True) if uid else None
    return u if u and not u['blocked'] else None
def need(role):
    def deco(f):
        @wraps(f)
        def w(*a, **k):
            u = me()
            if not u or u['role'] != role: return err('Please log in again', 403)
            return f(u, *a, **k)
        return w
    return deco
def my_rest(u): return q('select * from rests where uid=?', (u['id'],), True)

# ---------- auth ----------
@app.post('/api/register')
def register():
    d = request.json or {}; role = d.get('role'); email = (d.get('email') or '').strip().lower(); pw = d.get('password') or ''
    if role not in ('user', 'rest') or not d.get('name') or '@' not in email or len(pw) < 6:
        return err('Fill all fields. Password needs at least 6 characters.')
    if q('select 1 from users where email=?', (email,), True): return err('This email is already registered')
    uid = ins('insert into users(name,email,phone,pw,role,created) values(?,?,?,?,?,?)',
              (d['name'], email, d.get('phone', ''), generate_password_hash(pw), role, time.time()))
    if role == 'rest': ins('insert into rests(uid,name,cuisine,address) values(?,?,?,?)', (uid, d['name'], d.get('cuisine', ''), d.get('address', '')))
    return ok()
@app.post('/api/login')
def login():
    d = request.json or {}; u = q('select * from users where email=?', ((d.get('email') or '').lower(),), True)
    if not u or not check_password_hash(u['pw'], d.get('password') or ''): return err('Wrong email or password')
    if u['blocked']: return err('This account is blocked. Contact TS Square support.', 403)
    session['uid'] = u['id']; return jsonify(id=u['id'], name=u['name'], role=u['role'])
@app.post('/api/logout')
def logout(): session.clear(); return ok()
@app.get('/api/me')
def whoami():
    u = me(); return jsonify(id=u['id'], name=u['name'], role=u['role']) if u else jsonify(None)
@app.post('/api/forgot')
def forgot():
    u = q('select * from users where email=?', ((request.json or {}).get('email', '').lower(),), True)
    if u:
        t = secrets.token_urlsafe(24); ins('insert into resets values(?,?,?)', (t, u['id'], time.time() + 3600))
        mail(u['email'], 'Reset your TS Square password', f'Open this link within 1 hour:\n{request.host_url}?reset={t}')
    return ok()
@app.post('/api/reset')
def reset():
    d = request.json or {}; r = q('select * from resets where token=? and exp>?', (d.get('token'), time.time()), True)
    if not r or len(d.get('password') or '') < 6: return err('Link expired or password too short')
    q('update users set pw=? where id=?', (generate_password_hash(d['password']), r['uid'])); q('delete from resets where token=?', (r['token'],)); return ok()

# ---------- public ----------
@app.get('/')
def index(): return send_from_directory('static', 'index.html')
@app.get('/uploads/<path:n>')
def uploads(n): return send_from_directory(UP, n)

RLIST = """select r.*, (select round(avg(rating),1) from reviews where rid=r.id) rating, (select count(*) from reviews where rid=r.id) rc,
 (select min(price) from menu where rid=r.id) minp from rests r join users u on u.id=r.uid where r.status='approved' and u.blocked=0"""
@app.get('/api/rests')
def rests():
    a = request.args; out = []
    for r in q(RLIST):
        r = dict(r)
        if a.get('q') and a['q'].lower() not in (r['name'] + ' ' + (r['cuisine'] or '')).lower(): continue
        if a.get('cuisine') and a['cuisine'].lower() not in (r['cuisine'] or '').lower(): continue
        if a.get('maxprice') and (r['minp'] or 0) > float(a['maxprice']): continue
        if a.get('minrating') and (r['rating'] or 0) < float(a['minrating']): continue
        out.append(r)
    return jsonify(out)
@app.get('/api/rests/<int:rid>')
def rest_detail(rid):
    r = q(RLIST + ' and r.id=?', (rid,), True)
    if not r: return err('Restaurant not found', 404)
    return jsonify(rest=dict(r), menu=[dict(m) for m in q('select * from menu where rid=?', (rid,))],
        reviews=[dict(x) for x in q('select v.rating,v.text,u.name from reviews v join users u on u.id=v.uid where v.rid=? order by v.at desc limit 20', (rid,))])

# ---------- restaurant ----------
@app.post('/api/upload')
@need('rest')
def upload(u):
    f = request.files.get('file'); ext = (f.filename.rsplit('.', 1)[-1] if f and '.' in f.filename else '').lower()
    if ext not in ('png', 'jpg', 'jpeg', 'webp'): return err('Upload a PNG, JPG or WEBP image')
    n = secrets.token_hex(8) + '.' + ext; f.save(os.path.join(UP, n)); return jsonify(url='/uploads/' + n)
@app.get('/api/rest/me')
@need('rest')
def rest_me(u):
    r = my_rest(u); return jsonify(rest=dict(r), menu=[dict(m) for m in q('select * from menu where rid=?', (r['id'],))])
@app.put('/api/rest/me')
@need('rest')
def rest_update(u):
    d = request.json or {}; r = my_rest(u)
    q('update rests set cuisine=?,address=?,logo=?,open_t=?,close_t=?,slot_cap=? where id=?', (d.get('cuisine', r['cuisine']), d.get('address', r['address']),
      d.get('logo') or r['logo'], d.get('open_t') or r['open_t'], d.get('close_t') or r['close_t'], max(1, int(d.get('slot_cap') or r['slot_cap'])), r['id'])); return ok()
@app.post('/api/menu')
@need('rest')
def menu_add(u):
    d = request.json or {}; p = int(d.get('price') or 0)
    if not d.get('name') or p < 1: return err('Enter dish name and price')
    ins('insert into menu(rid,name,price,img) values(?,?,?,?)', (my_rest(u)['id'], d['name'], p, d.get('img'))); return ok()
@app.delete('/api/menu/<int:mid>')
@need('rest')
def menu_del(u, mid): q('delete from menu where id=? and rid=?', (mid, my_rest(u)['id'])); return ok()

# ---------- booking ----------
def od(o):
    o = dict(o); o['items'] = json.loads(o['items']); return o
@app.post('/api/book')
@need('user')
def book(u):
    d = request.json or {}; r = q("select * from rests where id=? and status='approved'", (d.get('rid'),), True)
    if not r: return err('Restaurant not available')
    date, tm = d.get('date') or '', d.get('time') or ''
    if date < datetime.date.today().isoformat() or not tm: return err('Choose a valid pickup date and time')
    if not (r['open_t'] <= tm <= r['close_t']): return err(f"Restaurant is open {r['open_t']} to {r['close_t']}")
    n = q("select count(*) c from orders where rid=? and date=? and substr(time,1,2)=? and status in ('Confirmed','Preparing','Ready')", (r['id'], date, tm[:2]), True)['c']
    if n >= r['slot_cap']: return err('This time slot is full. Choose another time.')
    items, total = [], 0
    for mid, qty in (d.get('items') or {}).items():
        m = q('select * from menu where id=? and rid=?', (mid, r['id']), True)
        if m and int(qty) > 0: items.append(dict(n=m['name'], p=m['price'], q=int(qty))); total += m['price'] * int(qty)
    if not items: return err('Add at least one dish')
    adv = math.ceil(total * .25); comm = round(total * float(setting('commission', '10')) / 100, 2)
    code = 'TS' + str(secrets.randbelow(9000) + 1000); rzo = None
    if RZ_ID:
        res = rz('orders', {'amount': adv * 100, 'currency': 'INR', 'receipt': code})
        if 'id' not in res: return err('Payment gateway error. Try again.')
        rzo = res['id']
    oid = ins('insert into orders(code,uid,rid,items,total,adv,commission,date,time,status,rz_order,at) values(?,?,?,?,?,?,?,?,?,?,?,?)',
              (code, u['id'], r['id'], json.dumps(items), total, adv, comm, date, tm, 'Awaiting payment', rzo, time.time()))
    return jsonify(order_id=oid, amount=adv * 100, rz_order=rzo, key=RZ_ID, demo=not RZ_ID)
@app.post('/api/pay/verify')
@need('user')
def verify(u):
    d = request.json or {}; o = q("select * from orders where id=? and uid=? and status='Awaiting payment'", (d.get('order_id'), u['id']), True)
    if not o: return err('Booking not found')
    if RZ_ID:
        sig = hmac.new(RZ_SECRET.encode(), f"{o['rz_order']}|{d.get('razorpay_payment_id')}".encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(sig, d.get('razorpay_signature') or ''): return err('Payment could not be verified')
        pay = d['razorpay_payment_id']
    else: pay = 'demo_' + secrets.token_hex(4)
    q("update orders set status='Confirmed', pay_id=? where id=?", (pay, o['id']))
    mail(u['email'], f"Booking {o['code']} confirmed", f"Your pickup code is {o['code']}.\nPickup: {o['date']} {o['time']}\nPaid now: Rs {o['adv']}\nPay at pickup: Rs {o['total'] - o['adv']}")
    return ok(code=o['code'])
@app.get('/api/orders')
def orders():
    u = me()
    if not u: return err('Please log in', 403)
    base = 'select o.*, r.name rest_name, x.name user_name, x.phone user_phone, (select count(*) from reviews v where v.rid=o.rid and v.uid=o.uid) reviewed from orders o join rests r on r.id=o.rid join users x on x.id=o.uid where o.status!=\'Awaiting payment\''
    if u['role'] == 'user': rows = q(base + ' and o.uid=? order by o.at desc', (u['id'],))
    elif u['role'] == 'rest': rows = q(base + ' and o.rid=? order by o.at desc', (my_rest(u)['id'],))
    else: rows = q(base + ' order by o.at desc')
    return jsonify([od(o) for o in rows])
FLOW = {'Confirmed': ['Preparing', 'Cancelled'], 'Preparing': ['Ready', 'Cancelled'], 'Ready': ['Picked up', 'Cancelled']}
@app.post('/api/orders/<int:oid>/status')
def set_status(oid):
    u = me(); s = (request.json or {}).get('status'); o = q('select * from orders where id=?', (oid,), True)
    if not u or not o: return err('Not allowed', 403)
    if u['role'] == 'user': allowed = o['uid'] == u['id'] and o['status'] == 'Confirmed' and s == 'Cancelled'
    elif u['role'] == 'rest': allowed = o['rid'] == my_rest(u)['id'] and s in FLOW.get(o['status'], [])
    else: allowed = False
    if not allowed: return err('This change is not allowed', 403)
    refund = None
    if s == 'Cancelled':
        refund = 'Refunded'
        if RZ_ID and o['pay_id']:
            res = rz(f"payments/{o['pay_id']}/refund", {'amount': o['adv'] * 100})
            if 'id' not in res: return err('Refund failed. Try again or contact support.')
    q('update orders set status=?, refund=coalesce(?,refund) where id=?', (s, refund, oid)); return ok()
@app.get('/api/orders/<int:oid>/qr')
def qr(oid):
    u = me(); o = q('select * from orders where id=?', (oid,), True)
    if not u or not o or (u['role'] == 'user' and o['uid'] != u['id']): return err('Not allowed', 403)
    try: import segno
    except ImportError: return err('Install segno for QR codes', 501)
    b = io.BytesIO(); segno.make(f"TSQ|{o['code']}|{o['id']}").save(b, kind='svg', scale=5); return b.getvalue(), 200, {'Content-Type': 'image/svg+xml'}
@app.post('/api/review')
@need('user')
def review(u):
    d = request.json or {}; rid = d.get('rid'); rt = int(d.get('rating') or 0)
    if not 1 <= rt <= 5 or not q("select 1 from orders where uid=? and rid=? and status='Picked up'", (u['id'], rid), True): return err('You can review after picking up an order')
    if q('select 1 from reviews where uid=? and rid=?', (u['id'], rid), True): return err('You already reviewed this restaurant')
    ins('insert into reviews(rid,uid,rating,text,at) values(?,?,?,?,?)', (rid, u['id'], rt, (d.get('text') or '')[:300], time.time())); return ok()

# ---------- admin ----------
@app.get('/api/admin/data')
@need('admin')
def admin_data(u):
    live = "('Confirmed','Preparing','Ready','Picked up')"
    return jsonify(
        rests=[dict(r) | {'email': r['email']} for r in q('select r.*, u.email, u.blocked from rests r join users u on u.id=r.uid')],
        users=[dict(x) for x in q("select u.id,u.name,u.email,u.phone,u.blocked,(select count(*) from orders where uid=u.id) n from users u where role='user'")],
        payouts=[dict(x) for x in q("select r.id,r.name,count(o.id) n,coalesce(sum(o.total),0) gross,coalesce(sum(o.commission),0) comm from rests r left join orders o on o.rid=r.id and o.status='Picked up' group by r.id")],
        advance=q(f'select coalesce(sum(adv),0) s from orders where status in {live}', one=True)['s'], commission=float(setting('commission', '10')))
@app.post('/api/admin/rest/<int:rid>')
@need('admin')
def admin_rest(u, rid): q('update rests set status=? where id=?', ((request.json or {}).get('status'), rid)); return ok()
@app.post('/api/admin/user/<int:uid>/block')
@need('admin')
def admin_block(u, uid): q("update users set blocked=1-blocked where id=? and role!='admin'", (uid,)); return ok()
@app.post('/api/admin/commission')
@need('admin')
def admin_comm(u):
    p = float((request.json or {}).get('pct', 10))
    if not 0 <= p <= 50: return err('Commission must be 0 to 50')
    q('insert or replace into settings values(?,?)', ('commission', str(p))); return ok()

init()
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=bool(os.environ.get('DEBUG')))
