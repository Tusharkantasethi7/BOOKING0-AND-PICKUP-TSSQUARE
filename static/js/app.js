const L={en:{rests:'Restaurants',login:'Log in',signup:'Sign up',logout:'Log out',mine:'My bookings',total:'Total',paynow:'Pay now (25%)',later:'Pay at pickup (75%)',date:'Pickup date',time:'Pickup time',pw:'Password',email:'Email',name:'Name',search:'Search',book:'Pay and book',rp:'Restaurant portal',admin:'Admin',dash:'Dashboard',hero:'Book your meal now. Pick it up fresh.',sub:'Order ahead and pay just 25% to confirm. Pay the remaining 75% when you collect.',menu:'Menu',view:'View menu'},
hi:{rests:'रेस्टोरेंट',login:'लॉग इन',signup:'साइन अप',logout:'लॉग आउट',mine:'मेरी बुकिंग',total:'कुल',paynow:'अभी भुगतान (25%)',later:'पिकअप पर भुगतान (75%)',date:'पिकअप तारीख',time:'पिकअप समय',pw:'पासवर्ड',email:'ईमेल',name:'नाम',search:'खोजें',book:'भुगतान करें और बुक करें',rp:'रेस्टोरेंट पोर्टल',admin:'एडमिन',dash:'डैशबोर्ड',hero:'अभी बुक करें, ताज़ा खाना पिकअप करें।',sub:'पहले से ऑर्डर करें और बुकिंग पक्की करने के लिए सिर्फ़ 25% दें। बाकी 75% पिकअप पर दें।',menu:'मेनू',view:'मेनू देखें'},
or:{rests:'ରେଷ୍ଟୁରାଣ୍ଟ',login:'ଲଗ୍ ଇନ୍',signup:'ସାଇନ୍ ଅପ୍',logout:'ଲଗ୍ ଆଉଟ୍',mine:'ମୋର ବୁକିଂ',total:'ମୋଟ',paynow:'ଏବେ ଦିଅନ୍ତୁ (25%)',later:'ପିକଅପ୍ ବେଳେ ଦିଅନ୍ତୁ (75%)',date:'ପିକଅପ୍ ତାରିଖ',time:'ପିକଅପ୍ ସମୟ',pw:'ପାସୱାର୍ଡ',email:'ଇମେଲ୍',name:'ନାମ',search:'ଖୋଜନ୍ତୁ',book:'ଦେୟ ଦିଅନ୍ତୁ ଓ ବୁକ୍ କରନ୍ତୁ',rp:'ରେଷ୍ଟୁରାଣ୍ଟ ପୋର୍ଟାଲ୍',admin:'ଆଡମିନ୍',dash:'ଡ୍ୟାସବୋର୍ଡ',hero:'ବର୍ତ୍ତମାନ ବୁକ୍ କରନ୍ତୁ, ତାଜା ଖାଦ୍ୟ ନେଇଯାଆନ୍ତୁ।',sub:'ଆଗୁଆ ଅର୍ଡର କରନ୍ତୁ ଏବଂ ନିଶ୍ଚିତ କରିବାକୁ କେବଳ 25% ଦିଅନ୍ତୁ। ବାକି 75% ନେଲାବେଳେ ଦିଅନ୍ତୁ।',menu:'ମେନୁ',view:'ମେନୁ ଦେଖନ୍ତୁ'}};
let lang=localStorage.getItem('lang')||'en',me=null,view={n:'home'},cart={rid:null,items:{}};
const t=k=>(L[lang]||L.en)[k]||L.en[k]||k,$=id=>document.getElementById(id),v=id=>$(id)?$(id).value.trim():'';
const inr=n=>'₹'+Number(n).toLocaleString('en-IN'),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function toast(m){const e=document.createElement('div');e.className='toast';e.textContent=m;document.body.appendChild(e);setTimeout(()=>e.remove(),2800)}
async function api(p,m='GET',b){const r=await fetch('/api/'+p,{method:m,headers:b?{'Content-Type':'application/json'}:{},body:b?JSON.stringify(b):undefined});const d=await r.json().catch(()=>null);if(!r.ok){toast((d&&d.error)||'Something went wrong');throw d}return d}
async function upload(id){const f=$(id)&&$(id).files[0];if(!f)return null;const fd=new FormData();fd.append('file',f);const r=await fetch('/api/upload',{method:'POST',body:fd}),d=await r.json();if(!r.ok){toast(d.error);throw d}return d.url}
function go(n,p={}){view={n,...p};render();scrollTo(0,0)}
async function logout(){await api('logout','POST');me=null;cart={rid:null,items:{}};go('home')}
function setLang(l){lang=l;localStorage.setItem('lang',l);render()}
const img=(u,c)=>u?`<img class="${c}" src="${u}" alt="">`:`<div class="${c}"></div>`;
const stars=(r,c)=>c?`★ ${r} (${c})`:'No reviews yet';

async function render(){
 const lg=`<select style="width:auto;margin:0" onchange="setLang(this.value)" aria-label="Language"><option value="en">English</option><option value="hi" ${lang=='hi'?'selected':''}>हिन्दी</option><option value="or" ${lang=='or'?'selected':''}>ଓଡ଼ିଆ</option></select>`;
 $('nav').innerHTML=lg+(!me?`<button onclick="go('auth',{role:'user',mode:'login'})">${t('login')}</button><button class="p" onclick="go('auth',{role:'user',mode:'register'})">${t('signup')}</button><button onclick="go('auth',{role:'rest',mode:'login'})">${t('rp')}</button><button onclick="go('auth',{role:'admin',mode:'login'})">${t('admin')}</button>`
 :`${me.role=='user'?`<button onclick="go('home')">${t('rests')}</button>`:''}<button onclick="go('${me.role}')">${me.role=='user'?t('mine'):t('dash')}</button><button onclick="logout()">${t('logout')}</button>`);
 try{$('app').innerHTML=await V[view.n]()}catch(e){}
}

const V={};
V.home=async()=>{
 const p=new URLSearchParams({q:view.q||'',cuisine:view.cu||'',maxprice:view.mp||'',minrating:view.mr||''}),rs=await api('rests?'+p);
 return `<section class="hero"><h1>${t('hero')}</h1><p>${t('sub')}</p></section>
 <div class="filters"><input id="f_q" placeholder="${t('search')}" value="${esc(view.q)}"><input id="f_cu" placeholder="Cuisine" value="${esc(view.cu)}"><input id="f_mp" type="number" placeholder="Max dish price ₹" value="${esc(view.mp)}"><select id="f_mr"><option value="">Any rating</option><option value="3" ${view.mr=='3'?'selected':''}>3★ and up</option><option value="4" ${view.mr=='4'?'selected':''}>4★ and up</option></select><button class="p" onclick="go('home',{q:v('f_q'),cu:v('f_cu'),mp:v('f_mp'),mr:v('f_mr')})">${t('search')}</button></div>
 <h2>${t('rests')}</h2>${rs.length?`<div class="grid">${rs.map(r=>`<div class="card"><div style="display:flex;gap:10px">${img(r.logo,'logoimg')}<div><h3 style="margin:0">${esc(r.name)}</h3><div class="mu">${esc(r.cuisine)}</div><div class="mu">${stars(r.rating,r.rc)}</div></div></div><p class="mu">${esc(r.address)}<br>Open ${r.open_t} to ${r.close_t}${r.minp?' · from '+inr(r.minp):''}</p><button class="p" onclick="openRest(${r.id})">${t('view')}</button></div>`).join('')}</div>`:'<p class="mu">No restaurants match. Try different filters.</p>'}`;
};
function openRest(id){if(cart.rid!==id)cart={rid:id,items:{}};go('menu',{rid:id})}

V.auth=async()=>{
 const {role,mode}=view,reg=mode=='register',ti={user:'Customer',rest:'Restaurant',admin:'Admin'}[role];
 const head=mode=='forgot'?'Reset password':mode=='reset'?'Choose a new password':`${ti} ${reg?'sign up':'log in'}`;
 return `<div class="card auth"><h2>${head}</h2>
 ${reg?`<label>${role=='rest'?'Restaurant name':t('name')}</label><input id="a_name">`:''}
 ${reg&&role=='rest'?`<label>Cuisine</label><input id="a_cu"><label>Address</label><input id="a_ad">`:''}${reg&&role=='user'?`<label>Phone</label><input id="a_ph" type="tel">`:''}
 ${mode!='reset'?`<label>${t('email')}</label><input id="a_em" type="email">`:''}${mode!='forgot'?`<label>${t('pw')}</label><input id="a_pw" type="password">`:''}
 <button class="p" style="width:100%" onclick="doAuth('${role}','${mode}')">${mode=='forgot'?'Send reset link':mode=='reset'?'Save password':reg?t('signup'):t('login')}</button>
 ${role!='admin'&&mode!='reset'?`<p class="mu" style="text-align:center">${reg?`<a href="#" onclick="go('auth',{role:'${role}',mode:'login'});return false">${t('login')}</a>`:`<a href="#" onclick="go('auth',{role:'${role}',mode:'register'});return false">${t('signup')}</a> · <a href="#" onclick="go('auth',{role:'${role}',mode:'forgot'});return false">Forgot password?</a>`}</p>`:''}</div>`;
};
async function doAuth(role,mode){
 if(mode=='forgot'){await api('forgot','POST',{email:v('a_em')});toast('If this email is registered, a reset link was sent');return go('auth',{role,mode:'login'})}
 if(mode=='reset'){await api('reset','POST',{token:view.token,password:v('a_pw')});toast('Password changed. Log in now.');history.replaceState(0,'','/');return go('auth',{role:'user',mode:'login'})}
 const b={role,name:v('a_name'),email:v('a_em'),password:v('a_pw'),phone:v('a_ph'),cuisine:v('a_cu'),address:v('a_ad')};
 if(mode=='register'){await api('register','POST',b);if(role=='rest'){toast('Registered. Wait for admin approval, then log in.');return go('auth',{role,mode:'login'})}}
 me=await api('login','POST',b);go(me.role=='user'?'home':me.role);
}

V.menu=async()=>{
 const d=await api('rests/'+view.rid),r=d.rest,items=d.menu.filter(m=>cart.items[m.id]>0).map(m=>({...m,q:cart.items[m.id]})),tot=items.reduce((s,i)=>s+i.price*i.q,0),adv=Math.ceil(tot*.25),today=new Date().toISOString().slice(0,10);
 return `<div style="display:flex;gap:12px;align-items:center">${img(r.logo,'logoimg')}<div><h2 style="margin:0">${esc(r.name)}</h2><div class="mu">${esc(r.cuisine)} · ${esc(r.address)} · Open ${r.open_t} to ${r.close_t} · ${stars(r.rating,r.rc)}</div></div></div><br>
 <div class="two"><div><div class="card">${d.menu.length?d.menu.map(m=>`<div class="row"><div style="display:flex;gap:10px;align-items:center">${m.img?img(m.img,'dish'):''}<div><b>${esc(m.name)}</b><div class="mu">${inr(m.price)}</div></div></div><div><button onclick="qty(${m.id},-1)" aria-label="Remove one">−</button> <b>${cart.items[m.id]||0}</b> <button onclick="qty(${m.id},1)" aria-label="Add one">+</button></div></div>`).join(''):'<p class="mu">No dishes added yet.</p>'}</div>
 <h3 style="margin-top:18px">Reviews</h3>${d.reviews.length?d.reviews.map(x=>`<div class="card" style="margin-bottom:8px"><b>${esc(x.name)}</b> ★ ${x.rating}<div class="mu">${esc(x.text)}</div></div>`).join(''):'<p class="mu">No reviews yet.</p>'}</div>
 <div class="card" style="align-self:start"><h3>Your booking</h3>${items.length?items.map(i=>`<div class="row"><span>${i.q} × ${esc(i.name)}</span><span>${inr(i.price*i.q)}</span></div>`).join('')+`<div class="row"><span>${t('total')}</span><b>${inr(tot)}</b></div><div class="row"><span>${t('paynow')}</span><b style="color:var(--ac)">${inr(adv)}</b></div><div class="row"><span class="mu">${t('later')}</span><span>${inr(tot-adv)}</span></div>
 <label>${t('date')}</label><input id="pd" type="date" min="${today}" value="${today}"><label>${t('time')}</label><input id="pt" type="time" value="19:00"><button class="p" style="width:100%" onclick="checkout()">${t('book')} ${inr(adv)}</button>`:'<p class="mu">Add dishes to start your booking.</p>'}</div></div>`;
};
function qty(id,d){cart.items[id]=Math.max(0,(cart.items[id]||0)+d);const y=scrollY;render().then(()=>scrollTo(0,y))}
async function checkout(){
 if(!me||me.role!='user'){toast('Log in as a customer to book');return go('auth',{role:'user',mode:'login'})}
 const d=await api('book','POST',{rid:cart.rid,items:cart.items,date:v('pd'),time:v('pt')});
 if(d.demo){await api('pay/verify','POST',{order_id:d.order_id});return done()}
 if(!window.Razorpay)await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://checkout.razorpay.com/v1/checkout.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)});
 new Razorpay({key:d.key,amount:d.amount,currency:'INR',order_id:d.rz_order,name:'TS Square',description:'25% advance',handler:async r=>{await api('pay/verify','POST',{order_id:d.order_id,...r});done()}}).open();
}
function done(){cart={rid:null,items:{}};toast('Booking confirmed. Check your email for the code.');go('user')}

function oc(o,who){
 const cls={Confirmed:'wa',Preparing:'wa',Ready:'ok','Picked up':'ok',Cancelled:'no'}[o.status],R=o.rest_name,U=o.user_name;
 const btn=(s,l,c)=>`<button class="${c||'p'}" onclick="setSt(${o.id},'${s}')">${l}</button>`,nx={Confirmed:['Preparing','Start preparing'],Preparing:['Ready','Mark ready'],Ready:['Picked up','Balance collected, picked up']}[o.status];
 return `<div class="card"><div class="row"><span class="code">${o.code}</span><span class="tag ${cls}">${o.status}</span></div>
 <div class="mu">${who=='user'?esc(R):who=='rest'?esc(U)+' · '+esc(o.user_phone):esc(R)+' ← '+esc(U)}</div><p style="margin:6px 0">${o.items.map(i=>i.q+' × '+esc(i.n)).join(', ')}</p><div class="mu">Pickup ${o.date} at ${o.time}</div>
 <div class="row"><span>${t('total')}</span><b>${inr(o.total)}</b></div><div class="row"><span>Advance paid (25%)</span><span>${inr(o.adv)}</span></div><div class="row"><span>Balance at pickup</span><b>${o.status=='Picked up'?'Paid':o.status=='Cancelled'?'–':inr(o.total-o.adv)}</b></div>
 ${o.refund?`<p class="tag ok">Advance ${o.refund}</p>`:''}
 ${who=='user'&&['Confirmed','Preparing','Ready'].includes(o.status)?`<div><img class="qr" src="/api/orders/${o.id}/qr" alt="Pickup QR code"></div>`:''}
 ${who=='rest'&&nx?`<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">${btn(nx[0],nx[1])}${btn('Cancelled','Cancel and refund','d')}</div>`:''}
 ${who=='user'&&o.status=='Confirmed'?`<div style="margin-top:8px">${btn('Cancelled','Cancel and refund','d')}</div>`:''}
 ${who=='user'&&o.status=='Picked up'&&!o.reviewed?`<div style="margin-top:8px"><select id="rt${o.id}"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select><input id="rx${o.id}" placeholder="Write a short review"><button class="p" onclick="rev(${o.rid},${o.id})">Submit review</button></div>`:''}</div>`;
}
async function setSt(id,s){await api(`orders/${id}/status`,'POST',{status:s});render()}
async function rev(rid,id){await api('review','POST',{rid,rating:v('rt'+id),text:v('rx'+id)});toast('Thanks for your review');render()}

V.user=async()=>{
 if(!me||me.role!='user'){go('auth',{role:'user',mode:'login'});return ''}
 const os=await api('orders');
 return `<h2>${t('mine')}</h2><p class="mu">Show your code or QR at the counter.</p>${os.length?`<div class="grid">${os.map(o=>oc(o,'user')).join('')}</div>`:`<p class="mu">No bookings yet.</p><button class="p" onclick="go('home')">Find a restaurant</button>`}`;
};
V.rest=async()=>{
 if(!me||me.role!='rest'){go('auth',{role:'rest',mode:'login'});return ''}
 const d=await api('rest/me'),r=d.rest;
 if(r.status!='approved')return `<div class="card"><h2>${esc(r.name)}</h2><p>Status: <span class="tag ${r.status=='rejected'?'no':'wa'}">${r.status}</span></p><p class="mu">${r.status=='pending'?'An admin will review your registration soon.':'Your registration was rejected. Contact TS Square support.'}</p></div>`;
 const tab=view.tab||'orders',os=await api('orders');
 return `<h2>${esc(r.name)}</h2><div class="stats"><div class="card"><b>${os.filter(o=>['Confirmed','Preparing','Ready'].includes(o.status)).length}</b>Active bookings</div><div class="card"><b>${os.length}</b>All bookings</div><div class="card"><b>${inr(os.filter(o=>o.status!='Cancelled').reduce((s,o)=>s+o.total,0))}</b>Booked value</div></div>
 <div class="tabs">${[['orders','Bookings'],['menu',t('menu')],['settings','Settings']].map(([k,l])=>`<button class="${tab==k?'on':''}" onclick="go('rest',{tab:'${k}'})">${l}</button>`).join('')}</div>
 ${tab=='orders'?(os.length?`<div class="grid">${os.map(o=>oc(o,'rest')).join('')}</div>`:'<p class="mu">No bookings yet.</p>'):
 tab=='menu'?`<div class="two"><div class="card">${d.menu.length?d.menu.map(m=>`<div class="row"><span style="display:flex;gap:10px;align-items:center">${m.img?img(m.img,'dish'):''}${esc(m.name)} · ${inr(m.price)}</span><button class="d" onclick="delItem(${m.id})">Remove</button></div>`).join(''):'<p class="mu">Add your first dish.</p>'}</div><div class="card"><h3>Add dish</h3><label>Dish name</label><input id="mn"><label>Price (₹)</label><input id="mp" type="number" min="1"><label>Photo</label><input id="mi" type="file" accept="image/*"><button class="p" onclick="addItem()">Add dish</button></div></div>`:
 `<div class="card" style="max-width:460px"><label>Logo</label><input id="lg" type="file" accept="image/*"><label>Cuisine</label><input id="s_cu" value="${esc(r.cuisine)}"><label>Address</label><input id="s_ad" value="${esc(r.address)}"><label>Opens at</label><input id="s_o" type="time" value="${r.open_t}"><label>Closes at</label><input id="s_c" type="time" value="${r.close_t}"><label>Max bookings per hour</label><input id="s_n" type="number" min="1" value="${r.slot_cap}"><button class="p" onclick="saveSet()">Save settings</button></div>`}`;
};
async function addItem(){const img=await upload('mi');await api('menu','POST',{name:v('mn'),price:v('mp'),img});render()}
async function delItem(id){await api('menu/'+id,'DELETE');render()}
async function saveSet(){const logo=await upload('lg');await api('rest/me','PUT',{logo,cuisine:v('s_cu'),address:v('s_ad'),open_t:v('s_o'),close_t:v('s_c'),slot_cap:v('s_n')});toast('Settings saved');render()}

V.admin=async()=>{
 if(!me||me.role!='admin'){go('auth',{role:'admin',mode:'login'});return ''}
 const d=await api('admin/data'),tab=view.tab||'rests',os=tab=='orders'?await api('orders'):[];
 let b='';
 if(tab=='rests')b=`<div class="grid">${d.rests.map(r=>`<div class="card"><h3>${esc(r.name)}</h3><div class="mu">${esc(r.email)}<br>${esc(r.cuisine)} · ${esc(r.address)}</div><p><span class="tag ${r.status=='approved'?'ok':r.status=='pending'?'wa':'no'}">${r.status}</span></p>${r.status!='approved'?`<button class="p" onclick="rs(${r.id},'approved')">Approve</button> `:''}${r.status!='rejected'?`<button class="d" onclick="rs(${r.id},'rejected')">Reject</button>`:''}</div>`).join('')||'<p class="mu">No restaurants.</p>'}</div>`;
 if(tab=='users')b=`<div class="card">${d.users.map(u=>`<div class="row"><span><b>${esc(u.name)}</b> ${u.blocked?'<span class="tag no">blocked</span>':''}<br><span class="mu">${esc(u.email)} ${esc(u.phone)} · ${u.n} bookings</span></span><button class="${u.blocked?'p':'d'}" onclick="blk(${u.id})">${u.blocked?'Unblock':'Block'}</button></div>`).join('')||'<p class="mu">No customers yet.</p>'}</div>`;
 if(tab=='orders')b=os.length?`<div class="grid">${os.map(o=>oc(o,'admin')).join('')}</div>`:'<p class="mu">No bookings yet.</p>';
 if(tab=='pay')b=`<div class="card" style="margin-bottom:14px;max-width:360px"><label>Commission per picked-up order (%)</label><input id="cm" type="number" min="0" max="50" value="${d.commission}"><button class="p" onclick="setCm()">Save commission</button></div><div class="card tw"><table><tr><th>Restaurant</th><th>Orders</th><th>Sales</th><th>Commission</th><th>Payout</th></tr>${d.payouts.map(p=>`<tr><td>${esc(p.name)}</td><td>${p.n}</td><td>${inr(p.gross)}</td><td>${inr(p.comm)}</td><td><b>${inr(p.gross-p.comm)}</b></td></tr>`).join('')}</table></div>`;
 return `<h2>Admin panel</h2><div class="stats"><div class="card"><b>${d.rests.filter(r=>r.status=='pending').length}</b>Pending restaurants</div><div class="card"><b>${d.users.length}</b>Customers</div><div class="card"><b>${inr(d.advance)}</b>Advance collected</div><div class="card"><b>${d.commission}%</b>Commission</div></div>
 <div class="tabs">${[['rests','Restaurants'],['users','Customers'],['orders','Bookings'],['pay','Payouts']].map(([k,l])=>`<button class="${tab==k?'on':''}" onclick="go('admin',{tab:'${k}'})">${l}</button>`).join('')}</div>${b}`;
};
async function rs(id,s){await api('admin/rest/'+id,'POST',{status:s});render()}
async function blk(id){await api(`admin/user/${id}/block`,'POST');render()}
async function setCm(){await api('admin/commission','POST',{pct:v('cm')});toast('Commission saved');render()}

(async()=>{try{me=await api('me')}catch(e){}
 const tk=new URLSearchParams(location.search).get('reset');if(tk)view={n:'auth',mode:'reset',role:'user',token:tk};render()})();
