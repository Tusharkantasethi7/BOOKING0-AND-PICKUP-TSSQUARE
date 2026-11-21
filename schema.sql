-- TS Square database schema (created automatically by app.py)
create table if not exists users(id integer primary key, name, email unique, phone, pw, role, blocked int default 0, created real);
create table if not exists rests(id integer primary key, uid int, name, cuisine, address, logo, banner, open_t default '09:00', close_t default '22:00', slot_cap int default 10, status default 'pending');
create table if not exists menu(id integer primary key, rid int, name, price int, img, category default 'Main Course', stock_quantity int default 20, daily_quantity int default 20, is_veg int default 1);
create table if not exists orders(id integer primary key, code, uid int, rid int, items, total int, adv int, commission real, date, time, status, pay_id, rz_order, refund, at real);
create table if not exists reviews(id integer primary key, rid int, uid int, rating int, text, at real);
create table if not exists resets(token primary key, uid int, exp real);
create table if not exists settings(k primary key, v);
