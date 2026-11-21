/**
 * TS Square - Advance Food Booking & Restaurant Inventory Management
 * Real-time SQLite Database integration, AI Photo Presets, Stock Tracking, Animations & Multi-language.
 */

const L = {
  en: {
    rests: 'Restaurants', login: 'Log in', signup: 'Sign up', logout: 'Log out',
    mine: 'My bookings', total: 'Total', paynow: 'Pay now (25%)', later: 'Pay at pickup (75%)',
    date: 'Pickup date', time: 'Pickup time', pw: 'Password', email: 'Email', name: 'Name',
    search: 'Search food or restaurants', book: 'Pay 25% Advance & Book', rp: 'Restaurant Portal',
    admin: 'Admin Panel', dash: 'Dashboard', hero: 'Book food ahead. Pick up fresh without the wait.',
    sub: 'Select dishes, reserve your pickup slot, and pay just 25% advance to confirm your order.',
    menu: 'Menu', view: 'View Menu & Order', stock: 'Stock', remaining: 'left',
    soldout: 'Sold Out', lowstock: 'Hurry, only', available: 'in stock', restock: 'Restock',
    restockAll: 'Restock All Dishes', category: 'Category', veg: 'Pure Veg', nonveg: 'Non-Veg',
    itemsInCart: 'items in cart', reviewBook: 'Review & Checkout', dishes: 'dishes'
  },
  hi: {
    rests: 'रेस्टोरेंट', login: 'लॉग इन', signup: 'साइन अप', logout: 'लॉग आउट',
    mine: 'मेरी बुकिंग', total: 'कुल', paynow: 'अभी भुगतान (25%)', later: 'पिकअप पर भुगतान (75%)',
    date: 'पिकअप तारीख', time: 'पिकअप समय', pw: 'पासवर्ड', email: 'ईमेल', name: 'नाम',
    search: 'खाना या रेस्टोरेंट खोजें', book: '25% एडवांस दें और बुक करें', rp: 'रेस्टोरेंट पोर्टल',
    admin: 'एडमिन पैनल', dash: 'डैशबोर्ड', hero: 'पहले से खाना बुक करें, बिना इंतज़ार ताज़ा पाएं।',
    sub: 'अपने पसंदीदा व्यंजन चुनें, पिकअप स्लॉट तय करें और सिर्फ़ 25% एडवांस देकर बुकिंग पक्की करें।',
    menu: 'मेनू', view: 'मेनू देखें और ऑर्डर करें', stock: 'स्टॉक', remaining: 'बचे हैं',
    soldout: 'समाप्त (Sold Out)', lowstock: 'जल्दी करें, केवल', available: 'उपलब्ध', restock: 'रीस्टॉक',
    restockAll: 'सभी व्यंजन रीस्टॉक करें', category: 'श्रेणी', veg: 'शाकाहारी', nonveg: 'मांसाहारी',
    itemsInCart: 'आइटम कार्ट में', reviewBook: 'ऑर्डर चेकआउट करें', dishes: 'व्यंजन'
  },
  or: {
    rests: 'ରେଷ୍ଟୁରାଣ୍ଟ', login: 'ଲଗ୍ ଇନ୍', signup: 'ସାଇନ୍ ଅପ୍', logout: 'ଲଗ୍ ଆଉଟ୍',
    mine: 'ମୋର ବୁକିଂ', total: 'ମୋଟ', paynow: 'ଏବେ ଦିଅନ୍ତୁ (25%)', later: 'ପିକଅପ୍ ବେଳେ ଦିଅନ୍ତୁ (75%)',
    date: 'ପିକଅପ୍ ତାରିଖ', time: 'ପିକଅପ୍ ସମୟ', pw: 'ପାସୱାର୍ଡ', email: 'ଇମେଲ୍', name: 'ନାମ',
    search: 'ଖାଦ୍ୟ କିମ୍ବା ରେଷ୍ଟୁରାଣ୍ଟ ଖୋଜନ୍ତୁ', book: '25% ଅଗ୍ରୀମ ଦିଅନ୍ତୁ ଓ ବୁକ୍ କରନ୍ତୁ', rp: 'ରେଷ୍ଟୁରାଣ୍ଟ ପୋର୍ଟାଲ୍',
    admin: 'ଆଡମିନ୍ ପ୍ୟାନେଲ୍', dash: 'ଡ୍ୟାସବୋର୍ଡ', hero: 'ଆଗୁଆ ଖାଦ୍ୟ ବୁକ୍ କରନ୍ତୁ, ବିନା ଅପେକ୍ଷାରେ ତାଜା ନିଅନ୍ତୁ।',
    sub: 'ପସନ୍ଦର ଖାଦ୍ୟ ଚୟନ କରନ୍ତୁ ଏବଂ କେବଳ 25% ଅଗ୍ରୀମ ଦେଇ ଅର୍ଡର ସୁନିଶ୍ଚିତ କରନ୍ତୁ।',
    menu: 'ମେନୁ', view: 'ମେନୁ ଦେଖନ୍ତୁ ଓ ଅର୍ଡର କରନ୍ତୁ', stock: 'ଷ୍ଟକ୍', remaining: 'ବାକି ଅଛି',
    soldout: 'ସରିଯାଇଛି (Sold Out)', lowstock: 'ଶୀଘ୍ର କରନ୍ତୁ, କେବଳ', available: 'ଷ୍ଟକ୍ରେ ଅଛି', restock: 'ରିଷ୍ଟକ୍',
    restockAll: 'ସମସ୍ତ ଖାଦ୍ୟ ରିଷ୍ଟକ୍ କରନ୍ତୁ', category: 'ବିଭାଗ', veg: 'ନିରାମିଷ', nonveg: 'ଆମିଷ',
    itemsInCart: 'ଆଇଟମ୍ କାର୍ଟରେ ଅଛି', reviewBook: 'ଅର୍ଡର ଚେକ୍ଆଉଟ୍ କରନ୍ତୁ', dishes: 'ଖାଦ୍ୟ'
  }
};

const AI_PRESETS = [
  { name: 'Hyderabadi Chicken Biryani', url: '/uploads/biryani.jpg', cat: 'Biryani & Rice', veg: 0, price: 280 },
  { name: 'Sizzling Paneer Tikka', url: '/uploads/paneer_tikka.jpg', cat: 'Starters', veg: 1, price: 220 },
  { name: 'Butter Chicken Murgh Makhani', url: '/uploads/butter_chicken.jpg', cat: 'Main Course', veg: 0, price: 320 },
  { name: 'Crispy Masala Dosa', url: '/uploads/masala_dosa.jpg', cat: 'Breakfast & Snacks', veg: 1, price: 130 },
  { name: 'Wood-Fired Margherita Pizza', url: '/uploads/artisan_pizza.jpg', cat: 'Pizza', veg: 1, price: 290 },
  { name: 'Double Smash Gourmet Burger', url: '/uploads/gourmet_burger.jpg', cat: 'Burgers', veg: 0, price: 240 },
  { name: 'Royal Shahi Gulab Jamun', url: '/uploads/gulab_jamun.jpg', cat: 'Desserts', veg: 1, price: 75 },
  { name: 'Caramel Frappe Cold Coffee', url: '/uploads/cold_coffee.jpg', cat: 'Beverages', veg: 1, price: 150 }
];

let lang = localStorage.getItem('lang') || 'en';
let me = null;
let view = { n: 'home' };
let cart = { rid: null, items: {} };
let activeCategory = 'All';

const t = k => (L[lang] || L.en)[k] || L.en[k] || k;
const $ = id => document.getElementById(id);
const v = id => $(id) ? $(id).value.trim() : '';
const inr = n => '₹' + Number(n || 0).toLocaleString('en-IN');
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function toast(m, isErr = false) {
  const e = document.createElement('div');
  e.className = 'toast';
  e.innerHTML = `<span>${isErr ? '⚠️' : '✨'}</span> <span>${m}</span>`;
  document.body.appendChild(e);
  setTimeout(() => e.remove(), 3200);
}

async function api(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {}
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch('/api/' + path, opts);
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = (data && data.error) || 'An unexpected error occurred';
    toast(msg, true);
    throw data;
  }
  return data;
}

async function uploadFile(inputElemId) {
  const file = $(inputElemId) && $(inputElemId).files[0];
  if (!file) return null;
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  const data = await res.json();
  if (!res.ok) {
    toast(data.error, true);
    throw data;
  }
  return data.url;
}

function go(n, p = {}) {
  view = { n, ...p };
  render();
  scrollTo({ top: 0, behavior: 'smooth' });
}

async function logout() {
  await api('logout', 'POST').catch(() => {});
  me = null;
  cart = { rid: null, items: {} };
  updateCartBar();
  toast('Logged out successfully');
  go('home');
}

function setLang(l) {
  lang = l;
  localStorage.setItem('lang', l);
  render();
}

function imgTag(src, className = 'dish') {
  if (!src) return `<div class="${className}" style="background:var(--bd);display:flex;align-items:center;justify-content:center;color:var(--mu);">🍲</div>`;
  return `<img class="${className}" src="${src}" alt="Food item" loading="lazy" onerror="this.onerror=null;this.src='/uploads/biryani.jpg';">`;
}

function vegBadge(isVeg) {
  return isVeg
    ? `<span class="veg-icon" title="Pure Vegetarian"></span>`
    : `<span class="nonveg-icon" title="Non-Vegetarian"></span>`;
}

function stars(rating, count) {
  if (!count) return `<span class="mu" style="font-size:0.85rem;">★ New restaurant</span>`;
  return `<span style="font-weight:700;color:var(--ac2);font-size:0.88rem;">★ ${rating}</span> <span class="mu">(${count})</span>`;
}

// ----------------- Dynamic Header & Navigation -----------------
async function render() {
  const langSelector = `
    <select style="width:auto;margin:0;padding:6px 10px;font-size:0.88rem;" onchange="setLang(this.value)" aria-label="Language selector">
      <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
      <option value="hi" ${lang === 'hi' ? 'selected' : ''}>हिन्दी</option>
      <option value="or" ${lang === 'or' ? 'selected' : ''}>ଓଡ଼ିଆ</option>
    </select>`;

  let navItems = '';
  if (!me) {
    navItems = `
      ${langSelector}
      <button onclick="go('auth',{role:'user',mode:'login'})">${t('login')}</button>
      <button class="p" onclick="go('auth',{role:'user',mode:'register'})">${t('signup')}</button>
      <button onclick="go('auth',{role:'rest',mode:'login'})">🏪 ${t('rp')}</button>
      <button onclick="go('auth',{role:'admin',mode:'login'})">⚙️ ${t('admin')}</button>
    `;
  } else {
    navItems = `
      ${langSelector}
      ${me.role === 'user' ? `<button onclick="go('home')">🏠 ${t('rests')}</button>` : ''}
      <button class="p" onclick="go('${me.role}')">
        ${me.role === 'user' ? '📋 ' + t('mine') : '📊 ' + t('dash')} (${esc(me.name.split(' ')[0])})
      </button>
      <button class="d" onclick="logout()">${t('logout')}</button>
    `;
  }
  $('nav').innerHTML = navItems;

  const viewFn = V[view.n] || V.home;
  try {
    $('app').innerHTML = await viewFn();
  } catch (e) {
    console.error('Render view error:', e);
  }
  updateCartBar();
}

// ----------------- View Definitions -----------------
const V = {};

// Home View: Restaurant Catalog with search and filters
V.home = async () => {
  const p = new URLSearchParams({
    q: view.q || '',
    cuisine: view.cu || '',
    maxprice: view.mp || '',
    minrating: view.mr || ''
  });
  const rests = await api('rests?' + p);

  return `
    <section class="hero">
      <h1>${t('hero')}</h1>
      <p>${t('sub')}</p>
      <div class="hero-stats">
        <div class="hero-stat-item">⚡ <b>25%</b> Advance Payment</div>
        <div class="hero-stat-item">⏱️ Zero Waiting Time</div>
        <div class="hero-stat-item">📦 Real-time Item Stock Tracking</div>
        <div class="hero-stat-item">🔒 Instant Refund on Cancellation</div>
      </div>
    </section>

    <div class="steps">
      <div class="step-card">
        <div class="step-num">1</div>
        <div>
          <h4 style="margin-bottom:4px;">Select Dishes</h4>
          <p class="mu" style="font-size:0.88rem;">Explore AI-curated menus and check real-time dish availability.</p>
        </div>
      </div>
      <div class="step-card">
        <div class="step-num">2</div>
        <div>
          <h4 style="margin-bottom:4px;">Pay 25% Advance</h4>
          <p class="mu" style="font-size:0.88rem;">Reserve your pickup time slot. Inventory is instantly locked for you.</p>
        </div>
      </div>
      <div class="step-card">
        <div class="step-num">3</div>
        <div>
          <h4 style="margin-bottom:4px;">Pick Up Fresh</h4>
          <p class="mu" style="font-size:0.88rem;">Show your booking QR code, pay the 75% balance, and collect.</p>
        </div>
      </div>
    </div>

    <div class="filters">
      <input id="f_q" placeholder="${t('search')}..." value="${esc(view.q || '')}">
      <input id="f_cu" placeholder="Cuisine (e.g. Biryani, Italian, North Indian)" value="${esc(view.cu || '')}">
      <input id="f_mp" type="number" placeholder="Max price ₹" value="${esc(view.mp || '')}">
      <select id="f_mr">
        <option value="">All Ratings</option>
        <option value="4" ${view.mr === '4' ? 'selected' : ''}>4★ & above</option>
        <option value="3" ${view.mr === '3' ? 'selected' : ''}>3★ & above</option>
      </select>
      <button class="p" onclick="go('home',{q:v('f_q'),cu:v('f_cu'),mp:v('f_mp'),mr:v('f_mr')})">🔍 Filter</button>
      ${view.q || view.cu || view.mp || view.mr ? `<button onclick="go('home')">Reset</button>` : ''}
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h2>Approved Restaurants (${rests.length})</h2>
      <span class="mu" style="font-size:0.9rem;">Fresh meals prepared upon advance booking</span>
    </div>

    ${rests.length ? `
      <div class="grid">
        ${rests.map(r => `
          <div class="card rest-card">
            <div class="rest-img-wrapper">
              <img src="${r.logo || '/uploads/spice_garden_logo.jpg'}" alt="${esc(r.name)}">
              <div class="rest-badge-float">
                <span>🕒 ${r.open_t} - ${r.close_t}</span>
              </div>
            </div>
            <div class="rest-body">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px;">
                <h3 style="font-size:1.25rem;">${esc(r.name)}</h3>
                ${stars(r.rating, r.rc)}
              </div>
              <p style="color:var(--tx-sec);font-size:0.9rem;margin-bottom:6px;">
                🍛 ${esc(r.cuisine || 'Multi-cuisine')}
              </p>
              <p class="mu" style="margin-bottom:14px;font-size:0.85rem;">
                📍 ${esc(r.address)}
              </p>
              <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--bd);">
                <div>
                  <span class="mu" style="font-size:0.8rem;display:block;">Menu</span>
                  <b>${r.menu_count || 0} ${t('dishes')}</b>
                  ${r.total_stock ? `<span class="stock-badge stock-in" style="margin-left:4px;">${r.total_stock} in stock</span>` : ''}
                </div>
                <button class="p" onclick="openRest(${r.id})">${t('view')} →</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:48px 20px;">
        <div style="font-size:2.5rem;margin-bottom:12px;">🔍</div>
        <h3>No restaurants match your search</h3>
        <p class="mu">Try clearing your filters or search keywords.</p>
        <button class="p" style="margin-top:14px;" onclick="go('home')">View All Restaurants</button>
      </div>
    `}
  `;
};

function openRest(id) {
  if (cart.rid !== id) {
    cart = { rid: id, items: {} };
  }
  activeCategory = 'All';
  go('menu', { rid: id });
}

// Menu View: Dish Cards with Stock Management, Remaining Quantity Indicator & Cart
V.menu = async () => {
  const d = await api('rests/' + view.rid);
  const r = d.rest;
  const menuList = d.menu || [];

  // Group dishes by category
  const categories = ['All', ...new Set(menuList.map(m => m.category || 'General'))];
  const filteredMenu = activeCategory === 'All'
    ? menuList
    : menuList.filter(m => (m.category || 'General') === activeCategory);

  const cartItemEntries = Object.entries(cart.items)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => {
      const dish = menuList.find(m => m.id === Number(id));
      return dish ? { ...dish, q } : null;
    })
    .filter(Boolean);

  const total = cartItemEntries.reduce((s, i) => s + i.price * i.q, 0);
  const advance = Math.ceil(total * 0.25);
  const balance = total - advance;
  const today = new Date().toISOString().slice(0, 10);

  return `
    <div style="margin-bottom:20px;">
      <a href="#" onclick="go('home');return false;" style="color:var(--ac);font-weight:600;text-decoration:none;font-size:0.9rem;">
        ← Back to Restaurants
      </a>
    </div>

    <!-- Restaurant Header Card -->
    <div class="card" style="margin-bottom:24px;padding:24px;display:flex;gap:20px;align-items:center;flex-wrap:wrap;background:linear-gradient(135deg,var(--sf),var(--bg));">
      <img src="${r.logo || '/uploads/spice_garden_logo.jpg'}" alt="${esc(r.name)}" style="width:84px;height:84px;border-radius:18px;object-fit:cover;border:3px solid var(--sf);box-shadow:var(--shadow-md);">
      <div style="flex:1;min-width:260px;">
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <h2 style="font-size:1.8rem;margin:0;">${esc(r.name)}</h2>
          ${stars(r.rating, r.rc)}
        </div>
        <p style="color:var(--tx-sec);margin:4px 0 6px;font-size:0.95rem;">
          🍽️ ${esc(r.cuisine)} · 📍 ${esc(r.address)}
        </p>
        <div style="display:flex;gap:12px;font-size:0.85rem;color:var(--mu);flex-wrap:wrap;">
          <span>🕒 Hours: <b>${r.open_t} - ${r.close_t}</b></span>
          <span>⚡ Advance Required: <b>25%</b></span>
          <span>📦 Capacity: <b>${r.slot_cap} slots/hr</b></span>
        </div>
      </div>
    </div>

    <!-- Category Tabs -->
    <div class="category-chips">
      ${categories.map(cat => `
        <div class="chip ${activeCategory === cat ? 'active' : ''}" onclick="setCategory('${cat}')">
          ${cat}
        </div>
      `).join('')}
    </div>

    <div class="two">
      <!-- Dishes Grid Column -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <h3>${activeCategory} (${filteredMenu.length})</h3>
          <span class="mu" style="font-size:0.85rem;">Quantities update in real-time</span>
        </div>

        ${filteredMenu.length ? `
          <div class="grid" style="grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:16px;">
            ${filteredMenu.map(m => {
              const stock = m.stock_quantity ?? 20;
              const daily = m.daily_quantity || 20;
              const isSoldOut = stock <= 0;
              const isLow = stock > 0 && stock <= 5;
              const inCartQty = cart.items[m.id] || 0;
              const stockPercent = Math.min(100, Math.round((stock / daily) * 100));

              return `
                <div class="card dish-card ${isSoldOut ? 'sold-out' : ''}">
                  <div class="dish-img-box">
                    ${imgTag(m.img, 'dish-img')}
                    <div style="position:absolute;top:10px;left:10px;display:flex;gap:6px;z-index:2;">
                      <span style="background:rgba(255,255,255,0.92);backdrop-filter:blur(4px);padding:4px;border-radius:6px;display:flex;">
                        ${vegBadge(m.is_veg)}
                      </span>
                    </div>

                    <!-- Remaining Stock Pill on Image -->
                    <div style="position:absolute;bottom:10px;right:10px;z-index:2;">
                      ${isSoldOut ? `
                        <span class="stock-badge stock-out">❌ ${t('soldout')}</span>
                      ` : isLow ? `
                        <span class="stock-badge stock-low">🔥 ${t('lowstock')} ${stock} ${t('remaining')}!</span>
                      ` : `
                        <span class="stock-badge stock-in">⚡ ${stock} ${t('available')}</span>
                      `}
                    </div>
                  </div>

                  <div class="dish-details">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:4px;">
                      <b style="font-size:1.05rem;line-height:1.25;">${esc(m.name)}</b>
                      <span class="price">${inr(m.price)}</span>
                    </div>

                    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:2px;font-size:0.8rem;" class="mu">
                      <span>${esc(m.category || 'General')}</span>
                      <span>Stock: <b>${stock}</b> / ${daily}</span>
                    </div>

                    <!-- Stock Availability Progress Bar -->
                    <div class="stock-bar-wrap" title="${stock} of ${daily} remaining">
                      <div class="stock-bar-fill ${isSoldOut ? 'stock-bar-out' : isLow ? 'stock-bar-low' : 'stock-bar-in'}"
                           style="width:${isSoldOut ? '100%' : stockPercent + '%'};"></div>
                    </div>

                    <!-- Stepper & Action Controls -->
                    <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;padding-top:10px;">
                      <div class="mu" style="font-size:0.85rem;">
                        ${isSoldOut ? '<span style="color:var(--danger);font-weight:700;">Unavailable</span>' : `${inr(m.price * (inCartQty || 1))}`}
                      </div>

                      ${isSoldOut ? `
                        <button disabled style="padding:6px 12px;font-size:0.85rem;">Sold Out</button>
                      ` : inCartQty > 0 ? `
                        <div class="stepper">
                          <button onclick="changeQty(${m.id}, -1, ${stock})" aria-label="Decrease">−</button>
                          <span class="stepper-count">${inCartQty}</span>
                          <button onclick="changeQty(${m.id}, 1, ${stock})" aria-label="Increase" ${inCartQty >= stock ? 'disabled' : ''}>+</button>
                        </div>
                      ` : `
                        <button class="p" style="padding:6px 14px;font-size:0.85rem;" onclick="changeQty(${m.id}, 1, ${stock})">
                          + Add
                        </button>
                      `}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div class="card" style="text-align:center;padding:36px 16px;">
            <p class="mu">No dishes in this category.</p>
          </div>
        `}

        <!-- Customer Reviews -->
        <div style="margin-top:36px;">
          <h3>Customer Reviews (${d.reviews.length})</h3>
          <div style="margin-top:12px;">
            ${d.reviews.length ? d.reviews.map(rv => `
              <div class="card" style="margin-bottom:12px;padding:14px 18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                  <b>${esc(rv.name)}</b>
                  <span style="color:var(--ac2);font-weight:700;">★ ${rv.rating}</span>
                </div>
                <p style="font-size:0.92rem;color:var(--tx-sec);margin-bottom:4px;">${esc(rv.text)}</p>
                <div class="mu" style="font-size:0.75rem;">${new Date(rv.at * 1000).toLocaleDateString()}</div>
              </div>
            `).join('') : `
              <p class="mu">No reviews yet. Be the first to order and review!</p>
            `}
          </div>
        </div>
      </div>

      <!-- Booking Sidebar Summary Column -->
      <div>
        <div class="card" style="position:sticky;top:84px;box-shadow:var(--shadow-md);">
          <h3 style="border-bottom:1px solid var(--bd);padding-bottom:10px;margin-bottom:12px;">
            🛍️ Booking Summary
          </h3>

          ${cartItemEntries.length ? `
            <div style="max-height:280px;overflow-y:auto;margin-bottom:12px;">
              ${cartItemEntries.map(item => `
                <div class="row">
                  <div style="display:flex;gap:8px;align-items:center;">
                    ${vegBadge(item.is_veg)}
                    <div>
                      <b style="font-size:0.9rem;">${esc(item.name)}</b>
                      <div class="mu" style="font-size:0.8rem;">${inr(item.price)} × ${item.q}</div>
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <b>${inr(item.price * item.q)}</b>
                    <div class="stepper" style="transform:scale(0.85);">
                      <button onclick="changeQty(${item.id}, -1, ${item.stock_quantity})" aria-label="Decrease">−</button>
                      <span class="stepper-count">${item.q}</span>
                      <button onclick="changeQty(${item.id}, 1, ${item.stock_quantity})" ${item.q >= item.stock_quantity ? 'disabled' : ''} aria-label="Increase">+</button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="row">
              <span class="mu">Total Value</span>
              <b>${inr(total)}</b>
            </div>
            <div class="row" style="background:var(--ac-light);padding:8px 10px;border-radius:8px;margin:6px 0;">
              <div>
                <b style="color:var(--ac);">${t('paynow')}</b>
                <div class="mu" style="font-size:0.78rem;">25% confirms booking & holds stock</div>
              </div>
              <b style="color:var(--ac);font-size:1.15rem;">${inr(advance)}</b>
            </div>
            <div class="row">
              <span class="mu">${t('later')}</span>
              <b>${inr(balance)}</b>
            </div>

            <div style="margin-top:14px;">
              <label for="pd">${t('date')}</label>
              <input id="pd" type="date" min="${today}" value="${today}">

              <label for="pt">${t('time')}</label>
              <input id="pt" type="time" value="19:30">

              <button class="p" style="width:100%;margin-top:10px;padding:12px;font-size:1rem;" onclick="checkout()">
                💳 ${t('book')} (${inr(advance)})
              </button>
            </div>
          ` : `
            <div style="text-align:center;padding:32px 10px;">
              <div style="font-size:2.5rem;margin-bottom:8px;">🛒</div>
              <p style="font-weight:600;margin-bottom:4px;">Your tray is empty</p>
              <p class="mu" style="font-size:0.85rem;">Add mouth-watering dishes from the menu to reserve your table slot.</p>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
};

function setCategory(cat) {
  activeCategory = cat;
  render();
}

function changeQty(mid, delta, maxStock) {
  const current = cart.items[mid] || 0;
  const next = current + delta;

  if (delta > 0 && next > maxStock) {
    toast(`Cannot add more. Only ${maxStock} portions left in stock!`, true);
    return;
  }

  if (next <= 0) {
    delete cart.items[mid];
  } else {
    cart.items[mid] = next;
  }

  const scrollYPos = window.scrollY;
  render().then(() => {
    window.scrollTo(0, scrollYPos);
  });
}

function updateCartBar() {
  const bar = $('cartBar');
  if (!bar) return;

  if (view.n !== 'menu' || !cart.rid) {
    bar.style.display = 'none';
    bar.classList.remove('active');
    return;
  }

  const count = Object.values(cart.items).reduce((s, q) => s + q, 0);
  if (count <= 0) {
    bar.style.display = 'none';
    bar.classList.remove('active');
    return;
  }

  bar.style.display = 'flex';
  setTimeout(() => bar.classList.add('active'), 10);

  bar.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;">
      <span class="cart-bar-badge">${count} items</span>
      <span>Dishes added to booking</span>
    </div>
    <button class="p" style="padding:8px 16px;box-shadow:none;" onclick="scrollToCheckout()">
      ${t('reviewBook')} →
    </button>
  `;
}

function scrollToCheckout() {
  const pd = $('pd');
  if (pd) {
    pd.scrollIntoView({ behavior: 'smooth', block: 'center' });
    pd.focus();
  }
}

async function checkout() {
  if (!me || me.role !== 'user') {
    toast('Please log in as a customer to proceed with booking');
    return go('auth', { role: 'user', mode: 'login' });
  }

  const dateVal = v('pd');
  const timeVal = v('pt');
  if (!dateVal || !timeVal) {
    return toast('Please select a valid pickup date and time', true);
  }

  try {
    const res = await api('book', 'POST', {
      rid: cart.rid,
      items: cart.items,
      date: dateVal,
      time: timeVal
    });

    if (res.demo) {
      // Demo Payment Flow: Modal preview
      $('ov').innerHTML = `
        <div class="modal">
          <div class="card">
            <h3 style="margin-bottom:6px;">Confirm Advance Payment</h3>
            <p class="mu" style="font-size:0.88rem;margin-bottom:14px;">
              TS Square Demo Gateway · Advance: <b>${inr(res.amount / 100)}</b>
            </p>

            <label>Payment Method</label>
            <select id="pay_method">
              <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
              <option value="card">Debit / Credit Card</option>
              <option value="netbanking">Net Banking</option>
            </select>

            <label>UPI ID or Card Details</label>
            <input id="pay_details" placeholder="name@upi / 4111 2222 3333 4444" value="user@okhdfcbank">

            <div style="display:flex;gap:8px;margin-top:14px;">
              <button class="p" style="flex:1;" onclick="completeDemoPay(${res.order_id})">
                ✅ Pay ${inr(res.amount / 100)} & Confirm
              </button>
              <button onclick="$('ov').innerHTML=''">Cancel</button>
            </div>
          </div>
        </div>
      `;
    } else {
      // Live Razorpay Flow
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://checkout.razorpay.com/v1/checkout.js';
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      new Razorpay({
        key: res.key,
        amount: res.amount,
        currency: 'INR',
        order_id: res.rz_order,
        name: 'TS Square',
        description: '25% Advance Food Booking',
        handler: async rzRes => {
          await api('pay/verify', 'POST', { order_id: res.order_id, ...rzRes });
          orderSuccess();
        }
      }).open();
    }
  } catch (err) {
    console.error('Booking failed:', err);
  }
}

async function completeDemoPay(orderId) {
  try {
    const verified = await api('pay/verify', 'POST', { order_id: orderId });
    $('ov').innerHTML = '';
    orderSuccess(verified.code);
  } catch (e) {
    console.error('Verification error:', e);
  }
}

function orderSuccess(code) {
  cart = { rid: null, items: {} };
  updateCartBar();
  toast('🎉 Booking confirmed! Dishes reserved & remaining balance is payable at pickup.');
  go('user');
}

// ----------------- Auth View -----------------
V.auth = async () => {
  const { role, mode } = view;
  const reg = mode === 'register';
  const roleTitle = { user: 'Customer', rest: 'Restaurant Partner', admin: 'Platform Admin' }[role];
  const title = mode === 'forgot' ? 'Reset Password' : `${roleTitle} ${reg ? 'Sign Up' : 'Log In'}`;

  return `
    <div class="card auth" style="box-shadow:var(--shadow-lg);">
      <h2 style="margin-bottom:6px;">${title}</h2>
      <p class="mu" style="font-size:0.88rem;margin-bottom:18px;">
        ${reg ? 'Create your account to start managing bookings.' : 'Enter your credentials to access your dashboard.'}
      </p>

      ${reg ? `
        <label>${role === 'rest' ? 'Restaurant Name' : t('name')}</label>
        <input id="a_name" placeholder="${role === 'rest' ? 'e.g. Spice Garden' : 'e.g. Rahul Sharma'}">
      ` : ''}

      ${reg && role === 'rest' ? `
        <label>Cuisine Specialties</label>
        <input id="a_cu" placeholder="e.g. North Indian, Biryani, Mughlai">
        <label>Full Address</label>
        <input id="a_ad" placeholder="e.g. Main Road, Civil Township, Rourkela">
      ` : ''}

      ${reg && role === 'user' ? `
        <label>Phone Number</label>
        <input id="a_ph" type="tel" placeholder="10-digit mobile number">
      ` : ''}

      <label>${t('email')}</label>
      <input id="a_em" type="email" placeholder="name@domain.com" value="${role === 'admin' ? 'admin@tssquare.com' : ''}">

      ${mode !== 'forgot' ? `
        <label>${t('pw')}</label>
        <input id="a_pw" type="password" placeholder="At least 6 characters" value="${role === 'admin' ? 'admin123' : ''}">
      ` : ''}

      <button class="p" style="width:100%;padding:12px;margin-top:6px;font-size:1rem;" onclick="doAuth('${role}','${mode}')">
        ${mode === 'forgot' ? 'Send Reset Link' : reg ? t('signup') : t('login')}
      </button>

      ${role !== 'admin' ? `
        <div style="margin-top:16px;text-align:center;font-size:0.88rem;" class="mu">
          ${reg ? `
            Already have an account? <a href="#" onclick="go('auth',{role:'${role}',mode:'login'});return false;" style="color:var(--ac);font-weight:600;">Log in here</a>
          ` : `
            New here? <a href="#" onclick="go('auth',{role:'${role}',mode:'register'});return false;" style="color:var(--ac);font-weight:600;">Create an account</a>
          `}
        </div>
      ` : ''}
    </div>
  `;
};

async function doAuth(role, mode) {
  const email = v('a_em').toLowerCase();
  const password = v('a_pw');
  if (!email || (mode !== 'forgot' && !password)) {
    return toast('Please enter all required credentials', true);
  }

  const payload = {
    role,
    name: v('a_name'),
    email,
    password,
    phone: v('a_ph'),
    cuisine: v('a_cu'),
    address: v('a_ad')
  };

  try {
    if (mode === 'register') {
      await api('register', 'POST', payload);
      if (role === 'rest') {
        toast('Registration submitted! Admin approval is pending.');
        return go('auth', { role, mode: 'login' });
      }
    }

    me = await api('login', 'POST', payload);
    toast(`Welcome back, ${me.name}!`);
    go(me.role === 'user' ? 'home' : me.role);
  } catch (err) {
    console.error('Auth error:', err);
  }
}

// ----------------- Customer Dashboard (My Bookings) -----------------
V.user = async () => {
  if (!me || me.role !== 'user') {
    go('auth', { role: 'user', mode: 'login' });
    return '';
  }
  const orders = await api('orders');

  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:10px;">
      <div>
        <h2>${t('mine')}</h2>
        <p class="mu">Show your booking code or QR at the counter to collect your fresh food.</p>
      </div>
      <button class="p" onclick="go('home')">+ Book Another Meal</button>
    </div>

    ${orders.length ? `
      <div class="grid">
        ${orders.map(o => renderOrderCard(o, 'user')).join('')}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:48px 20px;">
        <div style="font-size:2.8rem;margin-bottom:8px;">🍱</div>
        <h3>No bookings placed yet</h3>
        <p class="mu">Book a meal ahead with just 25% advance and pick it up fresh.</p>
        <button class="p" style="margin-top:14px;" onclick="go('home')">Find Restaurants</button>
      </div>
    `}
  `;
};

// ----------------- Restaurant Portal (Stock & Inventory Management) -----------------
V.rest = async () => {
  if (!me || me.role !== 'rest') {
    go('auth', { role: 'rest', mode: 'login' });
    return '';
  }

  const d = await api('rest/me');
  const r = d.rest;

  if (r.status !== 'approved') {
    return `
      <div class="card" style="max-width:540px;margin:40px auto;text-align:center;padding:36px 24px;">
        <div style="font-size:3rem;margin-bottom:12px;">⏳</div>
        <h2>${esc(r.name)}</h2>
        <p style="margin:10px 0;">Status: <span class="tag ${r.status === 'rejected' ? 'no' : 'wa'}">${r.status.toUpperCase()}</span></p>
        <p class="mu">
          ${r.status === 'pending'
            ? 'Your restaurant registration is under review by TS Square administrators. You will be activated shortly.'
            : 'Your registration was rejected. Please reach out to TS Square support for assistance.'}
        </p>
      </div>
    `;
  }

  const tab = view.tab || 'menu'; // Default to menu for inventory management
  const orders = await api('orders');
  const menuItems = d.menu || [];

  // Inventory stats
  const totalDishes = menuItems.length;
  const totalStock = menuItems.reduce((s, m) => s + (m.stock_quantity || 0), 0);
  const lowStockCount = menuItems.filter(m => (m.stock_quantity || 0) > 0 && (m.stock_quantity || 0) <= 5).length;
  const outOfStockCount = menuItems.filter(m => (m.stock_quantity || 0) === 0).length;
  const bookedVal = orders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0);

  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <div>
        <h2>${esc(r.name)}</h2>
        <p class="mu">${esc(r.cuisine)} · ${esc(r.address)}</p>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="accent2" onclick="restockAll()">⚡ ${t('restockAll')}</button>
        <button class="p" onclick="openAddDishModal()">+ Add New Dish</button>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="stats">
      <div class="card">
        <b>${totalDishes}</b>
        <span>Active Menu Dishes</span>
      </div>
      <div class="card">
        <b style="color:var(--ac);">${totalStock}</b>
        <span>Total Portions in Stock</span>
      </div>
      <div class="card">
        <b style="color:${lowStockCount > 0 ? 'var(--warn)' : 'var(--tx)'};">${lowStockCount}</b>
        <span>Low Stock Alert (≤ 5)</span>
      </div>
      <div class="card">
        <b style="color:${outOfStockCount > 0 ? 'var(--danger)' : 'var(--tx)'};">${outOfStockCount}</b>
        <span>Sold Out Dishes</span>
      </div>
      <div class="card">
        <b>${inr(bookedVal)}</b>
        <span>Total Sales Value</span>
      </div>
    </div>

    <!-- Portal Navigation Tabs -->
    <div class="tabs">
      <button class="${tab === 'menu' ? 'on' : ''}" onclick="go('rest',{tab:'menu'})">
        📦 Inventory & Item Quantities (${menuItems.length})
      </button>
      <button class="${tab === 'orders' ? 'on' : ''}" onclick="go('rest',{tab:'orders'})">
        📋 Orders & Pickups (${orders.length})
      </button>
      <button class="${tab === 'settings' ? 'on' : ''}" onclick="go('rest',{tab:'settings'})">
        ⚙️ Restaurant Settings
      </button>
    </div>

    <!-- Tab 1: Inventory & Stock Management -->
    ${tab === 'menu' ? `
      <div class="card" style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
          <div>
            <h3>Live Item Quantity Management</h3>
            <p class="mu" style="font-size:0.85rem;">Adjust portion quantities instantly. Changes reflect in real-time on customer screens.</p>
          </div>
        </div>

        ${menuItems.length ? `
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${menuItems.map(m => {
              const stock = m.stock_quantity ?? 20;
              const daily = m.daily_quantity || 20;
              const isOut = stock <= 0;
              const isLow = stock > 0 && stock <= 5;

              return `
                <div class="stock-manager-row">
                  <div style="display:flex;align-items:center;gap:12px;min-width:220px;flex:1;">
                    <img src="${m.img || '/uploads/biryani.jpg'}" alt="" style="width:52px;height:52px;border-radius:10px;object-fit:cover;">
                    <div>
                      <div style="display:flex;align-items:center;gap:6px;">
                        ${vegBadge(m.is_veg)}
                        <b>${esc(m.name)}</b>
                      </div>
                      <div class="mu" style="font-size:0.82rem;">
                        ${esc(m.category || 'General')} · <b>${inr(m.price)}</b>
                      </div>
                    </div>
                  </div>

                  <!-- Stock Status Pill -->
                  <div style="min-width:130px;">
                    ${isOut ? `
                      <span class="stock-badge stock-out">❌ Sold Out</span>
                    ` : isLow ? `
                      <span class="stock-badge stock-low">⚠️ Low: ${stock} left</span>
                    ` : `
                      <span class="stock-badge stock-in">✅ In Stock: ${stock}</span>
                    `}
                    <div class="mu" style="font-size:0.75rem;margin-top:2px;">Daily Quota: ${daily}</div>
                  </div>

                  <!-- Quick Stock Adjuster Stepper -->
                  <div class="stock-controls">
                    <button class="d" onclick="updateStockDelta(${m.id}, -5)" title="Decrease by 5">-5</button>
                    <button onclick="updateStockDelta(${m.id}, -1)" title="Decrease by 1">-1</button>
                    <input id="stk_${m.id}" class="quick-stock-input" type="number" min="0" value="${stock}">
                    <button onclick="updateStockDelta(${m.id}, 1)" title="Increase by 1">+1</button>
                    <button onclick="updateStockDelta(${m.id}, 5)" title="Increase by 5">+5</button>
                    <button class="p" onclick="saveDirectStock(${m.id})" title="Save exact number">Save</button>
                  </div>

                  <!-- Quick Actions -->
                  <div style="display:flex;align-items:center;gap:6px;">
                    <button class="accent2" onclick="restockItemToDaily(${m.id})" title="Reset to daily quota">⚡ Restock (${daily})</button>
                    <button class="d" onclick="delItem(${m.id})" title="Remove dish from menu">🗑️</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div style="text-align:center;padding:36px 16px;">
            <p class="mu">No dishes added yet.</p>
            <button class="p" style="margin-top:10px;" onclick="openAddDishModal()">+ Add Your First Dish</button>
          </div>
        `}
      </div>
    ` : ''}

    <!-- Tab 2: Orders -->
    ${tab === 'orders' ? `
      ${orders.length ? `
        <div class="grid">
          ${orders.map(o => renderOrderCard(o, 'rest')).join('')}
        </div>
      ` : `
        <div class="card" style="text-align:center;padding:48px 20px;">
          <p class="mu">No orders placed yet.</p>
        </div>
      `}
    ` : ''}

    <!-- Tab 3: Settings -->
    ${tab === 'settings' ? `
      <div class="card" style="max-width:520px;">
        <h3 style="margin-bottom:14px;">Store Profile & Pickup Settings</h3>
        <label>Restaurant Logo Image</label>
        <input id="s_logo" type="file" accept="image/*">
        <label>Cuisine Specialties</label>
        <input id="s_cu" value="${esc(r.cuisine)}">
        <label>Physical Address</label>
        <input id="s_ad" value="${esc(r.address)}">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label>Opening Time</label>
            <input id="s_o" type="time" value="${r.open_t}">
          </div>
          <div>
            <label>Closing Time</label>
            <input id="s_c" type="time" value="${r.close_t}">
          </div>
        </div>
        <label>Max Bookings Limit per Hour Slot</label>
        <input id="s_n" type="number" min="1" value="${r.slot_cap}">
        <button class="p" style="width:100%;margin-top:8px;" onclick="saveRestSettings()">Save Settings</button>
      </div>
    ` : ''}
  `;
};

// Restaurant stock controls
async function updateStockDelta(mid, delta) {
  try {
    await api(`menu/${mid}/stock`, 'PUT', { delta });
    toast(`Stock updated successfully`);
    render();
  } catch (e) {
    console.error(e);
  }
}

async function saveDirectStock(mid) {
  const stockVal = Number(v('stk_' + mid));
  if (isNaN(stockVal) || stockVal < 0) {
    return toast('Enter a valid stock number', true);
  }
  try {
    await api(`menu/${mid}/stock`, 'PUT', { stock_quantity: stockVal });
    toast('Stock quantity saved');
    render();
  } catch (e) {
    console.error(e);
  }
}

async function restockItemToDaily(mid) {
  try {
    await api(`menu/${mid}/stock`, 'PUT', { action: 'restock' });
    toast('Restocked to daily quota!');
    render();
  } catch (e) {
    console.error(e);
  }
}

async function restockAll() {
  if (!confirm('Reset all dishes to their daily inventory quantities?')) return;
  try {
    await api('rest/restock-all', 'POST');
    toast('All dishes restocked successfully! 🚀');
    render();
  } catch (e) {
    console.error(e);
  }
}

async function delItem(mid) {
  if (!confirm('Are you sure you want to remove this dish?')) return;
  try {
    await api('menu/' + mid, 'DELETE');
    toast('Dish deleted');
    render();
  } catch (e) {
    console.error(e);
  }
}

async function saveRestSettings() {
  try {
    const logo = await uploadFile('s_logo');
    await api('rest/me', 'PUT', {
      logo,
      cuisine: v('s_cu'),
      address: v('s_ad'),
      open_t: v('s_o'),
      close_t: v('s_c'),
      slot_cap: v('s_n')
    });
    toast('Settings saved successfully');
    render();
  } catch (e) {
    console.error(e);
  }
}

// Add Dish Modal with AI Photos Preset
let selectedAiPhoto = '/uploads/biryani.jpg';
function openAddDishModal() {
  selectedAiPhoto = AI_PRESETS[0].url;
  $('ov').innerHTML = `
    <div class="modal">
      <div class="card" style="max-width:540px;">
        <h3 style="margin-bottom:4px;">Add New Dish to Menu</h3>
        <p class="mu" style="font-size:0.85rem;margin-bottom:14px;">Select an AI-generated photo or upload your own.</p>

        <label>Dish Name</label>
        <input id="m_name" placeholder="e.g. Hyderabadi Dum Biryani">

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label>Category</label>
            <select id="m_cat">
              <option>Biryani & Rice</option>
              <option>Starters</option>
              <option>Main Course</option>
              <option>Pizza</option>
              <option>Burgers</option>
              <option>Breakfast & Snacks</option>
              <option>Desserts</option>
              <option>Beverages</option>
            </select>
          </div>
          <div>
            <label>Type</label>
            <select id="m_veg">
              <option value="1">🥬 Pure Veg</option>
              <option value="0">🍗 Non-Veg</option>
            </select>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
          <div>
            <label>Price (₹)</label>
            <input id="m_price" type="number" min="1" placeholder="250">
          </div>
          <div>
            <label>Initial Stock</label>
            <input id="m_stock" type="number" min="0" value="20">
          </div>
          <div>
            <label>Daily Quota</label>
            <input id="m_daily" type="number" min="1" value="25">
          </div>
        </div>

        <label style="margin-top:6px;">Choose AI Generated Food Photo</label>
        <div class="preset-grid">
          ${AI_PRESETS.map((p, idx) => `
            <img src="${p.url}" class="preset-thumb ${idx === 0 ? 'selected' : ''}" onclick="selectPreset('${p.url}', this)" title="${p.name}">
          `).join('')}
        </div>

        <label style="margin-top:10px;">Or Upload Custom Photo</label>
        <input id="m_file" type="file" accept="image/*">

        <div style="display:flex;gap:8px;margin-top:16px;">
          <button class="p" style="flex:1;" onclick="submitNewDish()">+ Add Dish</button>
          <button onclick="$('ov').innerHTML=''">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

function selectPreset(url, elem) {
  selectedAiPhoto = url;
  document.querySelectorAll('.preset-thumb').forEach(e => e.classList.remove('selected'));
  if (elem) elem.classList.add('selected');
}

async function submitNewDish() {
  const name = v('m_name');
  const price = Number(v('m_price'));
  const stock = Number(v('m_stock')) || 20;
  const daily = Number(v('m_daily')) || stock;
  const category = v('m_cat') || 'Main Course';
  const isVeg = Number(v('m_veg'));

  if (!name || isNaN(price) || price < 1) {
    return toast('Please provide a valid dish name and price', true);
  }

  let finalImg = selectedAiPhoto;
  try {
    const uploaded = await uploadFile('m_file');
    if (uploaded) finalImg = uploaded;

    await api('menu', 'POST', {
      name,
      price,
      img: finalImg,
      category,
      stock_quantity: stock,
      daily_quantity: daily,
      is_veg: isVeg
    });

    $('ov').innerHTML = '';
    toast('Dish added to menu with real-time stock tracking!');
    render();
  } catch (e) {
    console.error(e);
  }
}

// ----------------- Admin View -----------------
V.admin = async () => {
  if (!me || me.role !== 'admin') {
    go('auth', { role: 'admin', mode: 'login' });
    return '';
  }

  const d = await api('admin/data');
  const tab = view.tab || 'rests';
  const orders = tab === 'orders' ? await api('orders') : [];

  return `
    <div style="margin-bottom:18px;">
      <h2>Platform Admin Dashboard</h2>
      <p class="mu">Approve restaurants, monitor transactions, manage commissions, and track user bookings.</p>
    </div>

    <div class="stats">
      <div class="card">
        <b>${d.rests.filter(r => r.status === 'pending').length}</b>
        <span>Pending Approvals</span>
      </div>
      <div class="card">
        <b>${d.rests.length}</b>
        <span>Total Restaurants</span>
      </div>
      <div class="card">
        <b>${d.users.length}</b>
        <span>Registered Customers</span>
      </div>
      <div class="card">
        <b style="color:var(--ac);">${inr(d.advance)}</b>
        <span>Total Advance Collected</span>
      </div>
      <div class="card">
        <b>${d.commission}%</b>
        <span>Platform Commission</span>
      </div>
    </div>

    <div class="tabs">
      <button class="${tab === 'rests' ? 'on' : ''}" onclick="go('admin',{tab:'rests'})">
        🏪 Restaurants (${d.rests.length})
      </button>
      <button class="${tab === 'users' ? 'on' : ''}" onclick="go('admin',{tab:'users'})">
        👥 Customers (${d.users.length})
      </button>
      <button class="${tab === 'orders' ? 'on' : ''}" onclick="go('admin',{tab:'orders'})">
        📋 All Bookings
      </button>
      <button class="${tab === 'payout' ? 'on' : ''}" onclick="go('admin',{tab:'payout'})">
        💰 Payouts & Commission
      </button>
    </div>

    ${tab === 'rests' ? `
      <div class="grid">
        ${d.rests.map(r => `
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
              <div>
                <h3 style="margin-bottom:2px;">${esc(r.name)}</h3>
                <div class="mu" style="font-size:0.85rem;">${esc(r.email)}</div>
              </div>
              <span class="tag ${r.status === 'approved' ? 'ok' : r.status === 'pending' ? 'wa' : 'no'}">
                ${r.status}
              </span>
            </div>
            <p class="mu" style="font-size:0.88rem;margin-bottom:12px;">
              ${esc(r.cuisine)} · ${esc(r.address)}
            </p>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              ${r.status !== 'approved' ? `<button class="p" onclick="setRestStatus(${r.id}, 'approved')">Approve</button>` : ''}
              ${r.status !== 'rejected' ? `<button class="d" onclick="setRestStatus(${r.id}, 'rejected')">Reject</button>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${tab === 'users' ? `
      <div class="card tw">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${d.users.map(u => `
              <tr>
                <td><b>${esc(u.name)}</b></td>
                <td>${esc(u.email)}</td>
                <td>${esc(u.phone || '–')}</td>
                <td><b>${u.n}</b></td>
                <td><span class="tag ${u.blocked ? 'no' : 'ok'}">${u.blocked ? 'Blocked' : 'Active'}</span></td>
                <td>
                  <button class="${u.blocked ? 'p' : 'd'}" onclick="toggleBlock(${u.id})">
                    ${u.blocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    ${tab === 'orders' ? `
      <div class="grid">
        ${orders.map(o => renderOrderCard(o, 'admin')).join('')}
      </div>
    ` : ''}

    ${tab === 'payout' ? `
      <div class="card" style="max-width:380px;margin-bottom:20px;">
        <label>Update Platform Commission Rate (%)</label>
        <input id="comm_rate" type="number" min="0" max="50" value="${d.commission}">
        <button class="p" onclick="saveCommission()">Save Commission %</button>
      </div>

      <div class="card tw">
        <table>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Completed Orders</th>
              <th>Gross Revenue</th>
              <th>Commission (${d.commission}%)</th>
              <th>Net Payout Due</th>
            </tr>
          </thead>
          <tbody>
            ${d.payouts.map(p => `
              <tr>
                <td><b>${esc(p.name)}</b></td>
                <td>${p.n}</td>
                <td>${inr(p.gross)}</td>
                <td style="color:var(--warn);">${inr(p.comm)}</td>
                <td style="color:var(--ac);font-weight:700;">${inr(p.gross - p.comm)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}
  `;
};

async function setRestStatus(rid, st) {
  try {
    await api(`admin/rest/${rid}`, 'POST', { status: st });
    toast(`Restaurant marked as ${st}`);
    render();
  } catch (e) {
    console.error(e);
  }
}

async function toggleBlock(uid) {
  try {
    await api(`admin/user/${uid}/block`, 'POST');
    toast('Customer status toggled');
    render();
  } catch (e) {
    console.error(e);
  }
}

async function saveCommission() {
  const pct = Number(v('comm_rate'));
  if (isNaN(pct) || pct < 0 || pct > 50) {
    return toast('Commission must be between 0 and 50%', true);
  }
  try {
    await api('admin/commission', 'POST', { pct });
    toast('Commission rate updated');
    render();
  } catch (e) {
    console.error(e);
  }
}

// ----------------- Order Card Component -----------------
function renderOrderCard(o, role) {
  const statusColor = {
    Confirmed: 'wa',
    Preparing: 'wa',
    Ready: 'ok',
    'Picked up': 'ok',
    Cancelled: 'no'
  }[o.status] || 'wa';

  const nextStepMap = {
    Confirmed: ['Preparing', 'Start Preparing 🍳'],
    Preparing: ['Ready', 'Mark Ready for Pickup 🔔'],
    Ready: ['Picked up', 'Collect Balance & Picked Up ✅']
  };

  const nextStep = nextStepMap[o.status];

  return `
    <div class="card" style="box-shadow:var(--shadow-sm);border-radius:var(--radius-lg);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span class="code">${esc(o.code)}</span>
        <span class="tag ${statusColor}">${esc(o.status)}</span>
      </div>

      <div class="mu" style="font-size:0.88rem;margin-bottom:8px;">
        ${role === 'user' ? `🏪 <b>${esc(o.rest_name)}</b>` : role === 'rest' ? `👤 <b>${esc(o.user_name)}</b> · 📞 ${esc(o.user_phone)}` : `🏪 ${esc(o.rest_name)} ← 👤 ${esc(o.user_name)}`}
      </div>

      <div style="background:var(--bg);padding:10px;border-radius:var(--radius-md);margin-bottom:10px;">
        ${(o.items || []).map(it => `
          <div style="display:flex;justify-content:space-between;font-size:0.88rem;padding:2px 0;">
            <span>${it.q} × ${esc(it.n)}</span>
            <b>${inr(it.p * it.q)}</b>
          </div>
        `).join('')}
      </div>

      <div class="mu" style="font-size:0.82rem;margin-bottom:8px;">
        📅 Pickup: <b>${o.date} at ${o.time}</b>
      </div>

      <div class="row">
        <span class="mu">Total Bill</span>
        <b>${inr(o.total)}</b>
      </div>
      <div class="row">
        <span class="mu">25% Advance Paid</span>
        <b style="color:var(--ac);">${inr(o.adv)}</b>
      </div>
      <div class="row">
        <span class="mu">Balance Due at Counter</span>
        <b>${o.status === 'Picked up' ? '<span style="color:var(--ac);">Paid in Full</span>' : o.status === 'Cancelled' ? '–' : inr(o.total - o.adv)}</b>
      </div>

      ${o.refund ? `
        <div style="margin-top:8px;">
          <span class="tag ok">Advance Refunded Successfully</span>
        </div>
      ` : ''}

      <!-- Customer QR Code -->
      ${role === 'user' && ['Confirmed', 'Preparing', 'Ready'].includes(o.status) ? `
        <div style="text-align:center;margin-top:14px;padding:12px;background:var(--bg);border-radius:12px;">
          <img class="qr" src="/api/orders/${o.id}/qr" alt="Pickup QR Code" title="Show at restaurant counter">
          <p class="mu" style="font-size:0.8rem;margin-top:4px;">Show this QR code at pickup</p>
        </div>
      ` : ''}

      <!-- Restaurant Flow Status Buttons -->
      ${role === 'rest' && nextStep ? `
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
          <button class="p" style="flex:1;" onclick="setOrderStatus(${o.id}, '${nextStep[0]}')">
            ${nextStep[1]}
          </button>
          <button class="d" onclick="setOrderStatus(${o.id}, 'Cancelled')">Cancel & Refund</button>
        </div>
      ` : ''}

      <!-- Customer Cancellation (if Confirmed) -->
      ${role === 'user' && o.status === 'Confirmed' ? `
        <div style="margin-top:12px;">
          <button class="d" style="width:100%;" onclick="setOrderStatus(${o.id}, 'Cancelled')">
            Cancel Booking (Auto-Refund 25% Advance)
          </button>
        </div>
      ` : ''}

      <!-- Customer Review -->
      ${role === 'user' && o.status === 'Picked up' && !o.reviewed ? `
        <div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--bd);">
          <b style="font-size:0.9rem;">Rate your pickup experience:</b>
          <div style="display:flex;gap:8px;margin-top:6px;">
            <select id="rt_${o.id}" style="width:85px;margin:0;">
              <option value="5">5 ★★★★★</option>
              <option value="4">4 ★★★★</option>
              <option value="3">3 ★★★</option>
              <option value="2">2 ★★</option>
              <option value="1">1 ★</option>
            </select>
            <input id="rx_${o.id}" placeholder="Write a short review..." style="margin:0;flex:1;">
            <button class="p" onclick="submitReview(${o.rid}, ${o.id})">Post</button>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

async function setOrderStatus(oid, st) {
  try {
    await api(`orders/${oid}/status`, 'POST', { status: st });
    toast(`Order status changed to ${st}`);
    render();
  } catch (e) {
    console.error(e);
  }
}

async function submitReview(rid, oid) {
  const rating = Number(v('rt_' + oid));
  const text = v('rx_' + oid);
  try {
    await api('review', 'POST', { rid, rating, text });
    toast('Thank you for reviewing your meal!');
    render();
  } catch (e) {
    console.error(e);
  }
}

// ----------------- App Initialization -----------------
(async () => {
  try {
    me = await api('me');
  } catch (e) {
    me = null;
  }

  const resetToken = new URLSearchParams(location.search).get('reset');
  if (resetToken) {
    view = { n: 'auth', mode: 'reset', role: 'user', token: resetToken };
  }

  render();
})();
