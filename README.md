# TS Square – advance food booking (Python / Flask)

Customers book food ahead and pay 25% online. They pay the other 75% at pickup.
There are three portals: customer, restaurant and admin.

## Run
    python -m venv venv && source venv/bin/activate     # Windows: venv\Scripts\activate
    pip install -r requirements.txt
    python app.py                                        # open http://localhost:5000

Admin login: admin@tssquare.com / admin123 (change it with the env vars below).
Restaurants register themselves and must be approved by the admin before they go live.

## Settings (environment variables)
| Variable | Purpose |
|---|---|
| SECRET_KEY | Long random string. Required in production |
| ADMIN_EMAIL, ADMIN_PASSWORD | Admin account, set before the first run |
| RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET | Real payments and refunds. Without them the app runs in demo payment mode |
| SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM | Booking and password-reset emails. Without them emails are printed in the terminal |

## Go live
    gunicorn -w 2 -b 0.0.0.0:8000 app:app
Put it behind HTTPS (Nginx or a host like Render or Railway). Back up `tssquare.db` and the `uploads/` folder.

## What is included
Passwords are hashed. Password reset by email link. Restaurant logo and dish photos. Search and filters.
Ratings and reviews (only after a picked-up order). Opening hours and a per-hour booking limit.
Email confirmation and a QR code for pickup. Automatic refund of the 25% advance on cancel.
Admin can approve restaurants, block users, set commission and see payouts. English, Hindi and Odia labels.

## Not included yet
Email verification at signup, SMS or WhatsApp messages, automatic bank payouts to restaurants.

## Project structure
    app.py            Flask backend (API, auth, payments, refunds, admin)
    schema.sql        Database tables (SQLite, created automatically on first run)
    requirements.txt  Python packages
    static/index.html Website page
    static/css/style.css  Styles
    static/js/app.js  Frontend logic (customer, restaurant and admin portals)
    uploads/          Restaurant logos and dish photos (created automatically)
