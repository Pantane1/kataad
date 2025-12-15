# KataAd – Lightweight Ad Blocker Extension

**KataAd** is a fast, privacy‑first ad blocker built as a Chrome (Manifest V3) extension. It blocks intrusive ads, trackers, and pop‑ups using Chrome’s native `declarativeNetRequest` engine for maximum performance and minimum resource usage.

**Tagline:** Block noise. Keep control.

---

## ✨ Key Features

* 🚫 Blocks common ads (Google Ads, Facebook Ads, DoubleClick, Taboola, Outbrain)
* 🕵️ Blocks trackers, pixels, and tracking scripts
* 🧠 Uses Chrome’s native MV3 `declarativeNetRequest` (no background interception)
* ⚡ Lightweight and fast (no remote filter lists)
* 🌙 Clean dark‑mode popup UI
* 🔁 Enable / Disable blocking with one click
* 📌 Persistent state using Chrome storage
* 📬 Built‑in **Get in Touch** page for developer contact

---

## 🧩 Extension Structure

```
kataad/
├── manifest.json
├── rules.json
├── background.js
├── popup.html
├── popup.js
├── contact.html
├── contact.js
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── contact.png
```

---

## 🖥 Popup Interface

The popup provides a simple control panel:

* Extension name and status
* Toggle button to enable or disable ad blocking
* Footer navigation with **Get in Touch** button

Clicking **Get in Touch** opens an internal extension page with developer contact details.

---

## 📬 Get in Touch Page

The contact page is an internal, review‑safe extension page designed for transparency and support.

**Includes:**

* Developer name
* Email contact
* GitHub profile
* WhatsApp link

No tracking, no forms, no analytics.

---

## 🔒 Privacy & Security

KataAd is built with privacy as a first‑class principle:

* ❌ No user tracking
* ❌ No analytics
* ❌ No remote code execution
* ❌ No external filter subscriptions
* ✅ All logic runs locally in the browser

---

## 🛠 Installation (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to:

   ```
   chrome://extensions
   ```
3. Enable **Developer mode** (top‑right)
4. Click **Load unpacked**
5. Select the `kataad/` folder
6. KataAd will appear in your extensions list

---

## 🧪 Testing

To verify ad blocking:

* Visit a site known for ads
* Open DevTools → Network tab
* Observe blocked requests
* Toggle KataAd off and reload to compare

---

## 📦 Packaging for Chrome Web Store

1. Ensure all icons are present (16, 48, 128)
2. Validate `manifest.json` for MV3 compliance
3. Zip the contents of the `kataad/` folder
4. Upload via Chrome Web Store Developer Dashboard

---

## 🧭 Roadmap

Planned and optional upgrades:

* Per‑site allowlist
* Report broken site workflow
* Expanded ruleset (EasyList‑style)
* Firefox version (Manifest v2 compatible)
* Usage statistics (local‑only)

---

## 👤 Author

**Pantane**
📧 Email: [pantane254@gmail.com](mailto:pantane254@gmail.com)
💬 WhatsApp: +254 740 312 402
🐙 GitHub: [https://github.com/pantane1](https://github.com/pantane1)

<a href="mailto:pantane254@gmail.com" class="contact-link">
  <img src="icons/email.png" />
  <span>Email</span>
</a>

<a href="https://wa.me/254740312402" target="_blank" class="contact-link">
  <img src="icons/whatsapp.png" />
  <span>WhatsApp</span>
</a>

---

## 📄 License

MIT License. Free to use, modify, and distribute.

---

Built with focus, simplicity, and control.


# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
