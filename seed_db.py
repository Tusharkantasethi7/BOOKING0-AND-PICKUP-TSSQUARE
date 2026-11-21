"""
Database migration and seed script for TS Square.
Sets up tables with stock management and populates with AI-generated dishes and restaurants.
"""
import sqlite3
import os
import time
from werkzeug.security import generate_password_hash

DB_PATH = os.path.join(os.path.dirname(__file__), 'tssquare.db')

def migrate_and_seed():
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()

    # Create tables if not exists
    cur.execute("""
    create table if not exists users(
        id integer primary key,
        name text,
        email text unique,
        phone text,
        pw text,
        role text,
        blocked int default 0,
        created real
    );
    """)

    cur.execute("""
    create table if not exists rests(
        id integer primary key,
        uid int,
        name text,
        cuisine text,
        address text,
        logo text,
        banner text,
        open_t text default '09:00',
        close_t text default '22:00',
        slot_cap int default 10,
        status text default 'pending'
    );
    """)

    cur.execute("""
    create table if not exists menu(
        id integer primary key,
        rid int,
        name text,
        price int,
        img text,
        category text default 'Main Course',
        stock_quantity int default 20,
        daily_quantity int default 20,
        is_veg int default 1
    );
    """)

    cur.execute("""
    create table if not exists orders(
        id integer primary key,
        code text,
        uid int,
        rid int,
        items text,
        total int,
        adv int,
        commission real,
        date text,
        time text,
        status text,
        pay_id text,
        rz_order text,
        refund text,
        at real
    );
    """)

    cur.execute("""
    create table if not exists reviews(
        id integer primary key,
        rid int,
        uid int,
        rating int,
        text text,
        at real
    );
    """)

    cur.execute("""
    create table if not exists resets(
        token text primary key,
        uid int,
        exp real
    );
    """)

    cur.execute("""
    create table if not exists settings(
        k text primary key,
        v text
    );
    """)

    con.commit()

    # Check columns in menu
    cols = [col[1] for col in cur.execute("PRAGMA table_info(menu)").fetchall()]
    if 'stock_quantity' not in cols:
        cur.execute("ALTER TABLE menu ADD COLUMN stock_quantity INT DEFAULT 20")
    if 'daily_quantity' not in cols:
        cur.execute("ALTER TABLE menu ADD COLUMN daily_quantity INT DEFAULT 20")
    if 'category' not in cols:
        cur.execute("ALTER TABLE menu ADD COLUMN category TEXT DEFAULT 'Main Course'")
    if 'is_veg' not in cols:
        cur.execute("ALTER TABLE menu ADD COLUMN is_veg INT DEFAULT 1")

    # Check columns in rests
    rest_cols = [col[1] for col in cur.execute("PRAGMA table_info(rests)").fetchall()]
    if 'banner' not in rest_cols:
        cur.execute("ALTER TABLE rests ADD COLUMN banner TEXT")

    con.commit()

    # Ensure Admin user exists
    admin = cur.execute("SELECT id FROM users WHERE role='admin'").fetchone()
    if not admin:
        cur.execute(
            "INSERT INTO users(name, email, pw, role, created) VALUES (?, ?, ?, ?, ?)",
            ('Admin', 'admin@tssquare.com', generate_password_hash('admin123'), 'admin', time.time())
        )
        con.commit()
    print("Admin verified.")

    # Seed Restaurant 1: Spice Garden
    rest1_user = cur.execute("SELECT id FROM users WHERE email='spice@demo.com'").fetchone()
    if not rest1_user:
        cur.execute(
            "INSERT INTO users(name, email, phone, pw, role, created) VALUES (?, ?, ?, ?, ?, ?)",
            ('Spice Garden Kitchen', 'spice@demo.com', '9876543211', generate_password_hash('rest123'), 'rest', time.time())
        )
        rest1_uid = cur.lastrowid
    else:
        rest1_uid = rest1_user[0]

    rest1 = cur.execute("SELECT id FROM rests WHERE uid=?", (rest1_uid,)).fetchone()
    if not rest1:
        cur.execute(
            """INSERT INTO rests(uid, name, cuisine, address, logo, open_t, close_t, slot_cap, status)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (rest1_uid, 'Spice Garden', 'North Indian, Mughlai & Biryani', 'Plot 42, Civil Township, Rourkela',
             '/uploads/spice_garden_logo.jpg', '10:00', '23:00', 15, 'approved')
        )
        r1_id = cur.lastrowid
    else:
        r1_id = rest1[0]
        cur.execute(
            "UPDATE rests SET logo=?, status='approved', cuisine='North Indian, Mughlai & Biryani' WHERE id=?",
            ('/uploads/spice_garden_logo.jpg', r1_id)
        )

    # Seed Restaurant 2: Royal Dine
    rest2_user = cur.execute("SELECT id FROM users WHERE email='royal@demo.com'").fetchone()
    if not rest2_user:
        cur.execute(
            "INSERT INTO users(name, email, phone, pw, role, created) VALUES (?, ?, ?, ?, ?, ?)",
            ('Royal Dine & Cafe', 'royal@demo.com', '9876543212', generate_password_hash('rest123'), 'rest', time.time())
        )
        rest2_uid = cur.lastrowid
    else:
        rest2_uid = rest2_user[0]

    rest2 = cur.execute("SELECT id FROM rests WHERE uid=?", (rest2_uid,)).fetchone()
    if not rest2:
        cur.execute(
            """INSERT INTO rests(uid, name, cuisine, address, logo, open_t, close_t, slot_cap, status)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (rest2_uid, 'Royal Dine & Cafe', 'Continental, Italian & Cafe Bites', 'VIP Road, Commercial Hub, Rourkela',
             '/uploads/royal_dine_logo.jpg', '09:00', '22:30', 12, 'approved')
        )
        r2_id = cur.lastrowid
    else:
        r2_id = rest2[0]
        cur.execute(
            "UPDATE rests SET logo=?, status='approved', cuisine='Continental, Italian & Cafe Bites' WHERE id=?",
            ('/uploads/royal_dine_logo.jpg', r2_id)
        )

    con.commit()

    # Clear and populate menu items for Spice Garden
    cur.execute("DELETE FROM menu WHERE rid=?", (r1_id,))
    spice_menu = [
        ('Hyderabadi Chicken Dum Biryani', 280, '/uploads/biryani.jpg', 'Biryani & Rice', 15, 25, 0),
        ('Sizzling Paneer Tikka', 220, '/uploads/paneer_tikka.jpg', 'Starters', 12, 20, 1),
        ('Butter Chicken Murgh Makhani', 320, '/uploads/butter_chicken.jpg', 'Main Course', 5, 15, 0),
        ('Royal Shahi Gulab Jamun (2 pcs)', 75, '/uploads/gulab_jamun.jpg', 'Desserts', 25, 30, 1),
    ]
    for name, price, img, cat, stock, daily, is_veg in spice_menu:
        cur.execute(
            """INSERT INTO menu(rid, name, price, img, category, stock_quantity, daily_quantity, is_veg)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (r1_id, name, price, img, cat, stock, daily, is_veg)
        )

    # Clear and populate menu items for Royal Dine
    cur.execute("DELETE FROM menu WHERE rid=?", (r2_id,))
    royal_menu = [
        ('Wood-Fired Margherita Pizza', 290, '/uploads/artisan_pizza.jpg', 'Pizza', 14, 20, 1),
        ('Double Smash Gourmet Cheeseburger', 240, '/uploads/gourmet_burger.jpg', 'Burgers', 4, 15, 0),
        ('Crispy Mysore Masala Dosa', 130, '/uploads/masala_dosa.jpg', 'Breakfast & Snacks', 20, 30, 1),
        ('Caramel Frappe Cold Coffee', 150, '/uploads/cold_coffee.jpg', 'Beverages', 18, 25, 1),
    ]
    for name, price, img, cat, stock, daily, is_veg in royal_menu:
        cur.execute(
            """INSERT INTO menu(rid, name, price, img, category, stock_quantity, daily_quantity, is_veg)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (r2_id, name, price, img, cat, stock, daily, is_veg)
        )

    con.commit()

    # Seed Sample Customer
    cust = cur.execute("SELECT id FROM users WHERE email='rahul@demo.com'").fetchone()
    if not cust:
        cur.execute(
            "INSERT INTO users(name, email, phone, pw, role, created) VALUES (?, ?, ?, ?, ?, ?)",
            ('Rahul Sharma', 'rahul@demo.com', '9876543210', generate_password_hash('user123'), 'user', time.time())
        )
        c_uid = cur.lastrowid
    else:
        c_uid = cust[0]

    # Seed Sample Order for demonstration
    cur.execute("DELETE FROM orders WHERE uid=?", (c_uid,))
    import json
    order_items = [
        {"id": 1, "n": "Hyderabadi Chicken Dum Biryani", "p": 280, "q": 2},
        {"id": 4, "n": "Royal Shahi Gulab Jamun (2 pcs)", "p": 75, "q": 1}
    ]
    tot = 280*2 + 75
    adv = int(tot * 0.25)
    comm = round(tot * 0.10, 2)
    cur.execute(
        """INSERT INTO orders(code, uid, rid, items, total, adv, commission, date, time, status, pay_id, at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        ('TS7821', c_uid, r1_id, json.dumps(order_items), tot, adv, comm,
         time.strftime('%Y-%m-%d'), '20:30', 'Preparing', 'demo_pay_1', time.time() - 1800)
    )

    # Seed Sample Reviews
    cur.execute("DELETE FROM reviews WHERE rid=?", (r1_id,))
    cur.execute("DELETE FROM reviews WHERE rid=?", (r2_id,))
    cur.execute(
        "INSERT INTO reviews(rid, uid, rating, text, at) VALUES (?, ?, ?, ?, ?)",
        (r1_id, c_uid, 5, 'The Biryani was fresh, hot and ready right when I reached! Advance booking saved so much time.', time.time() - 86400)
    )
    cur.execute(
        "INSERT INTO reviews(rid, uid, rating, text, at) VALUES (?, ?, ?, ?, ?)",
        (r2_id, c_uid, 5, 'Best artisan pizza in town! The crust is heavenly and pickup was super smooth.', time.time() - 43200)
    )

    con.commit()
    con.close()
    print("Database migration and seeding completed successfully!")

if __name__ == '__main__':
    migrate_and_seed()
