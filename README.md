# TS Square – Advance Food Booking & Restaurant Inventory Management

Customers book meals in advance, pay **25% online**, and pay the remaining **75% upon pickup**. Features real-time stock and quantity management, AI-generated culinary photos, smooth micro-animations, and full SQLite database persistence.

There are three complete portals:
1. **Customer Portal**: Browse approved restaurants, filter by cuisine/rating/price, view live remaining dish quantities with urgency alerts, and pay 25% advance.
2. **Restaurant Portal**: Real-time dish inventory management (`-5`, `-1`, `+1`, `+5`, custom stock, daily quota, "⚡ Restock All"), order state machine (`Confirmed` → `Preparing` → `Ready` → `Picked up`), and dish creation with AI photo presets or uploads.
3. **Admin Portal**: Review pending restaurants (Approve / Reject), view customer analytics, toggle customer blocks, configure commission rates (0–50%), and calculate net payouts.

---

## Quick Start

### 1. Activate Environment & Run
```bash
# Windows
.\venv\Scripts\activate
python app.py
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

### 2. Default Test Accounts
| Role | Email | Password | Details |
|---|---|---|---|
| **Admin** | `admin@tssquare.com` | `admin123` | Approves restaurants, sets commissions |
| **Restaurant 1** | `spice@demo.com` | `rest123` | Spice Garden (Mughlai & Biryani) |
| **Restaurant 2** | `royal@demo.com` | `rest123` | Royal Dine & Cafe (Pizza, Burgers) |
| **Customer** | `rahul@demo.com` | `user123` | Pre-loaded customer with active & past bookings |

*(You can reseed the database anytime by running `python seed_db.py`)*

---

## What's New & Upgraded

### 1. 🗄️ SQLite Database Integration
- Full persistent database in `tssquare.db` (`users`, `rests`, `menu`, `orders`, `reviews`, `resets`, `settings`).
- Dynamic migrations automatically update columns if schema evolves.
- Stock quantities are locked upon booking and restored automatically if an order is cancelled.

### 2. 📸 AI-Generated Food & Restaurant Photos
- High-resolution culinary photos generated for key signature dishes:
  - Hyderabadi Chicken Dum Biryani
  - Sizzling Paneer Tikka
  - Butter Chicken Murgh Makhani
  - Wood-Fired Margherita Pizza
  - Double Smash Gourmet Cheeseburger
  - Crispy Mysore Masala Dosa
  - Royal Shahi Gulab Jamun
  - Caramel Frappe Cold Coffee
  - Restaurant emblems for *Spice Garden* and *Royal Dine*
- Photo gallery picker in the restaurant portal allows instant 1-click photo selection when adding dishes.

### 3. 📦 Restaurant Quantity & Stock Management
- **Live Inventory Dashboard**: Displays active dishes, portions in stock, low-stock warnings, and sold-out items.
- **Real-Time Adjustments**: Quick `[-5]`, `[-1]`, `[+1]`, `[+5]` steppers and direct number inputs.
- **Daily Quotas**: Set standard daily prep quantities and use **"⚡ Restock All Dishes"** for 1-click morning replenishment.
- **Auto Stock Deduction & Cancellation Restoral**: Ordered quantities deduct automatically upon payment verification; cancellations restore stock to the restaurant's inventory.

### 4. ⚡ Customer Remaining Quantity & Urgency Indicators
- **High Stock**: `⚡ X in stock` with green availability progress bar.
- **Low Stock (< 5 left)**: `🔥 Hurry, only X left!` with pulsing flame animation.
- **Sold Out**: `❌ Sold Out` badge with disabled buttons and dimmed card.
- **Cart Guard**: Stepper controls dynamically prevent customers from adding more than the available stock.
- **Floating Cart Drawer**: Animated bottom tray displaying current items, 25% advance breakdown, and checkout prompt.

### 5. ✨ Modern Styling & Animations
- Glassmorphism sticky navbar with glowing animated logo.
- Smooth card hover lift and image zoom effects.
- Standard Indian Veg / Non-Veg dot icons.
- Multi-language support (English, हिन्दी, ଓଡ଼ିଆ).
- Pickup QR code generator for easy counter collection.
