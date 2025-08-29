# Cranbourne Eagles JFC — Coaching EOI (Season 2026)

A lightweight, branded web form for collecting **Coaching Expressions of Interest** for Season 2026. Designed for **GitHub Pages** and integrated with **Google Apps Script** → **Google Sheets**.

---

## 1) Files

- `index.html` – The branded form UI (Eagles blue & gold).
- `styles.css` – Styling and responsive layout.
- `app.js` – Submission logic posting to Google Apps Script.
- `assets/logo.svg` – Placeholder club logo (replace with your official SVG/PNG if you like).
- `apps_script/Code.gs` – Google Apps Script for writing submissions into a Google Sheet.

---

## 2) Google Sheet setup (one-time)

1. Create a Google Sheet called **"Coaching EOI 2026"** with a first sheet named **"Responses"** (or change the name in the script).
2. In row 1, add headers (optional; the script will create headers if missing):

   ```
   submitted_at, full_name, email, phone, team_applied, role, coached_before, experience, accreditation, wwcc, availability_season, philosophy, success_metrics
   ```

---

## 3) Apps Script deployment

1. Open the Script Editor: **Extensions → Apps Script** (from your Google Sheet) or visit <https://script.google.com> and create a new project.
2. Paste the contents of `apps_script/Code.gs` into your project.
3. In `Code.gs`, set the target sheet name if different (`SHEET_NAME`).
4. Click **Deploy → New deployment** → **Web app**:
   - **Execute as:** *Me*
   - **Who has access:** *Anyone with the link* (or *Anyone*)
5. Copy the **Web app URL** (it looks like `https://script.google.com/macros/s/.../exec`).

---

## 4) Wire up the frontend

1. Open `app.js` and set:

   ```js
   const SCRIPT_URL = "YOUR_WEB_APP_URL_HERE";
   ```

2. Test locally by opening `index.html` in a browser, or upload the folder to GitHub and enable **GitHub Pages**.

> **Note:** If you see CORS issues, confirm that your Apps Script is deployed as a Web App and the `doPost` returns CORS headers (already included in `Code.gs`). After updating the script, **Redeploy** the web app to publish changes.

---

## 5) Publishing on GitHub Pages

1. Create a new **public** repo, e.g. `cranbournejfc.github.io/coaching-eoi-2026/` (or any repo).
2. Upload the contents of this folder to the repo root (or a `/docs` folder).
3. In repo **Settings → Pages**, set the **Branch** to `main` and **/ (root)` (or `/docs`). Save.
4. Your site will be live at your GitHub Pages URL.

---

## 6) Customisation

- Replace `assets/logo.svg` with your **official club logo** (`.svg` or `.png`). Keep the filename or update `index.html` accordingly.
- Colours are defined at the top of `styles.css`. Club colours used:
  - Blue `#0A2E6B`
  - Gold `#FDB515`
- Update any copy (e.g., footer tagline) to match club style.

---

## 7) Data captured

- **Full Name**
- **Email Address**
- **Phone Number**
- **What team are you applying for?**
- **Role applying for** (Head Coach / Assistant Coach)
- **Have you coached junior football before?** (Yes/No)
- **Previous coaching experience** (long text)
- **Coaching Accreditation** (Yes/No)
- **WWCC** (Yes / No, but willing to obtain one)
- **Availability for training, match days, and club events** (Yes/No)
- **Coaching philosophy**
- **How you measure success beyond wins/losses**

---

## 8) Closing date

> You will be contacted after the closing date of **5:00 pm, 19 September 2025** to schedule an interview with the coaching panel.  
> We look forward to working with you in 2026! 💙💛🦅  
> — **Loretta**

---

## 9) Troubleshooting

- **Form submits but nothing appears in the Sheet:** Ensure the Web App is **deployed** and the URL in `app.js` is the **/exec** URL (not `/dev`). Also verify **Anyone with the link** access.
- **CORS/Network errors:** Redeploy the Web App after changes. Make sure the script returns CORS headers (already included).
- **Validation warnings:** Required fields must be completed; the form checks radio groups and email format on submit.
