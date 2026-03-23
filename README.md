# Dashboard Deployment Guide (LXC + PM2 + Apache Proxy)

## Overview

This setup deploys a React/Vite frontend and a Node backend in a dedicated LXC, then exposes them through the shared Apache proxy LXC.

### Architecture

- **proxy LXC**: public entry point for `dev.dhis2.world`
- **dashboard LXC**: runs
  - frontend on port `3000`
  - backend API on port `3001`

### Public URLs

- Frontend: `https://dev.dhis2.world/dashboard/`
- API: `https://dev.dhis2.world/dashboard/api/...`

---

## 1. Create the dashboard LXC

On the host server:

```bash
sudo lxc launch ubuntu:24.04 dashboard
sudo lxc list
```

Optional local hostname mapping on the host:

```bash
sudo vi /etc/hosts
```

Add:

```text
192.168.0.60 dashboard
```

This is only for local name resolution and debugging.

---

## 2. Install dependencies inside the dashboard LXC

Enter the container:

```bash
sudo lxc exec dashboard bash
```

If DNS is broken inside the container, temporarily update `/etc/resolv.conf`:

```bash
vi /etc/resolv.conf
```

Add:

```text
nameserver 8.8.8.8
nameserver 1.1.1.1
```

Install packages:

```bash
apt update && apt upgrade -y
apt install -y curl git nodejs npm
npm install -g pm2
```

Clone the app and install dependencies:

```bash
git clone <YOUR_REPO_URL> dashboard
cd dashboard
npm install --legacy-peer-deps
```

---

## 3. Configure the frontend build

The app is served under `/dashboard/`, so Vite must build with that base path.

In `.env`:

```js
VITE_PRODUCTION_BASE="/dashboard/"
```

Why this matters:

- Without the correct base path, the built HTML may request assets from the wrong location.
- With `base: '/dashboard/'`, Vite generates asset URLs like:
  - `/dashboard/assets/index-xxxx.js`
  - `/dashboard/assets/index-xxxx.css`

Build the frontend:

```bash
npm run build
```

---

## 4. Run the frontend with PM2

Serve the built `dist` folder on port `3000`:

```bash
pm2 serve dist 3000 --name dashboard --spa
```

Useful checks:

```bash
pm2 status
pm2 logs dashboard
curl http://localhost:3000
```

Expected result: HTML output from the built app.

---

## 5. Run the backend with PM2

If your backend is started through npm, use:

```bash
pm2 start npm --name backend -- run server
```

Test the backend inside the dashboard LXC:

```bash
curl http://localhost:3001/api/orgUnits
```

Expected result: JSON or API response

---

## 6. Persist PM2 across reboots

Once both frontend and backend work:

```bash
pm2 save
pm2 startup
```

---

## 7. Configure the Apache proxy LXC

Enter the proxy container:

```bash
sudo lxc exec proxy bash
```

Create an upstream config file, for example:

```bash
vi /etc/apache2/upstream/dashboard
```

Use:

```apache
RedirectMatch 302 ^/dashboard$ /dashboard/

ProxyPreserveHost On

# API rule first (more specific path)
<Location /dashboard/api/>
    Require all granted
    ProxyPass http://192.168.0.60:3001/api/
    ProxyPassReverse http://192.168.0.60:3001/api/
</Location>

# Frontend rule
<Location /dashboard/>
    Require all granted
    ProxyPass http://192.168.0.60:3000/
    ProxyPassReverse http://192.168.0.60:3000/
</Location>
```

### Why `/dashboard/api/` instead of `/api/`

Using `/dashboard/api/` avoids conflicts with other apps on the same shared domain.

This keeps the dashboard app self-contained:

- `/dashboard/` → frontend
- `/dashboard/api/` → backend

---

## 8. Reload Apache

```bash
apachectl configtest
systemctl reload apache2
```

---

## 9. Verify the deployment

From the proxy LXC:

```bash
curl http://192.168.0.60:3000
curl http://192.168.0.60:3001/api/orgUnits
```

From the browser:

- `https://dev.dhis2.world/dashboard/`
- `https://dev.dhis2.world/dashboard/api/orgUnits`
