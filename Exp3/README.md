# Exp 3: React Progressive Web App (PWA) 📱

This project demonstrates how to convert a standard React application into a Progressive Web App (PWA) with offline capabilities using Vite, `vite-plugin-pwa`, and Service Workers.

## 🎯 Objectives
a. Add a `manifest.json` file to an existing React app with app name, icons, and theme colors, and verify that the app is installable in the browser.
b. Register a basic service worker that caches static assets (HTML, CSS, JS) and serves them from cache when the network is unavailable.
c. Implement advanced runtime caching for API responses using a Workbox service worker so that specific pages or data remain available and usable in complete offline mode.

## ✨ Features
- **Modern User Interface:** A responsive grid layout mapping Indian team profiles.
- **Offline Mode:** Displays a sticky red banner when the user loses internet connection.
- **Static Asset Caching:** HTML, CSS, and JS shell files are cached using a `CacheFirst` strategy.
- **Dynamic API Caching:** API responses from `jsonplaceholder.typicode.com` are stored using a `NetworkFirst` policy, allowing the team directory to load gracefully even without Wi-Fi.
- **Installable Desktop/Mobile App (PWA):** Contains a valid Web App Manifest allowing easy installation directly to your device launcher.

---

## 🚀 How to Run the Application

The service workers and PWA behavior only work properly in a **Production Build**, not the development server.

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the App
```bash
npm run build
```

### 3. Preview the Build
```bash
npm run preview
```
This will start a local server, typically at `http://localhost:4173/`.

---

## 🧪 Testing the Offline Mode & PWA capabilities

**Prerequisite:** Use a modern browser like Google Chrome, Microsoft Edge, or Brave.

### 1. Checking Offline Data Caching
1. Open the preview link (`http://localhost:4173`).
2. Open Chrome DevTools (Press `F12` or `Cmd+Option+I`).
3. Go to the **Application** Tab.
4. Under **Service Workers**, confirm the worker is registered and active.
5. Go to the **Network** tab, check the "Offline" box (or simply turn off your computer's Wi-Fi).
6. Refresh the page! You will observe:
    - An automatic "You are currently offline" banner.
    - All CSS styling remains intact.
    - The API data (Team Directory cards) loads instantly from the cache!

### 2. Installing it as Desktop App
1. Look at the right side of your browser's address search bar.
2. Click the specific **"Install React PWA App"** icon (desktop-with-arrow logo).
3. The app will immediately launch in its own standalone window and shortcut will be placed in your OS application launcher.

*(Note: If the install button is missing, verify you have replaced the blank placeholder `pwa-192x192.png` and `pwa-512x512.png` inside the `public` folder with valid icon images!)*
