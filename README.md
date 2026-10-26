# ShopSphere — Full-Stack E-commerce Capstone
**Creator:** Naseem Khan

A responsive product-catalog web application built with React, Vite, React Router, Node.js, and Express. It demonstrates modular frontend architecture, client-side routing, REST API integration, search/filter/sort, a persistent shopping cart, production build optimization, and deployment guidance.

## Features
- Modular React components and pages
- Client-side routes: Home, Catalog, Product Details, Cart, About, Not Found
- Express REST API for product data and health checks
- Search, category filter, price sorting, and product detail pages
- Cart stored in `localStorage`
- Responsive layout for mobile, tablet, and desktop
- Loading, empty, and API error states
- Lightweight local SVG product artwork (no large external image dependencies)
- Vite production build with hashed assets and code splitting
- Accessible labels, semantic markup, and reduced-motion support

> Demo checkout is intentionally a UI-only flow. Do not collect real payment information without integrating a PCI-compliant payment provider and production security controls.

## Project structure
```text
ecommerce-capstone/
├── client/
│   ├── public/
│   │   └── products/           # lightweight SVG artwork
│   ├── src/
│   │   ├── components/         # shared UI
│   │   ├── pages/              # route-level screens
│   │   ├── services/           # API client
│   │   ├── data/               # fallback demo products
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── server/
    ├── src/
    │   ├── data/products.js
    │   └── index.js
    ├── .env.example
    └── package.json
```

## Run locally
Requirements: Node.js 18+ and npm.

### 1. Start the API
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
The API runs at `http://localhost:5000`.

### 2. Start the frontend
Open another terminal:
```bash
cd client
npm install
cp .env.example .env
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

The frontend uses `VITE_API_URL` to find the API. For local development it defaults to `http://localhost:5000/api`.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health status |
| GET | `/api/products` | List products; optional `q`, `category`, `sort` query parameters |
| GET | `/api/products/:id` | Get one product |
| GET | `/api/categories` | List available categories |

Examples:
```text
GET /api/products?q=headphones
GET /api/products?category=Accessories
GET /api/products?sort=price-asc
```

## Production build
```bash
cd client
npm run build
npm run preview
```
Vite outputs optimized assets to `client/dist/`.

## Deploy frontend to Vercel
1. Push this project to a GitHub repository.
2. In Vercel, import the repository.
3. Set **Root Directory** to `client`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable `VITE_API_URL` with your deployed API base, e.g. `https://YOUR-API.onrender.com/api`.
7. Deploy.
8. The included `vercel.json` rewrites app routes to `index.html` so React Router URLs work on refresh.

## Deploy frontend to Netlify
1. Import the Git repository.
2. Base directory: `client`
3. Build command: `npm run build`
4. Publish directory: `client/dist` (or `dist` if the base directory is set to `client`)
5. Set `VITE_API_URL` to `https://YOUR-API.onrender.com/api`.
6. The included `public/_redirects` file supports client-side routes.

## Deploy API to Render
1. Create a new **Web Service** from the same GitHub repository.
2. Set Root Directory to `server`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add `NODE_ENV=production` and `CLIENT_ORIGIN=https://YOUR-FRONTEND.vercel.app` (or your Netlify URL).
6. Deploy and check `/api/health`.
7. Update the frontend's `VITE_API_URL` with the deployed API URL plus `/api`, then redeploy the frontend.

### Important deployment notes
- A frontend environment variable is baked in at build time, so redeploy after changing `VITE_API_URL`.
- If your frontend and backend use different domains, set `CLIENT_ORIGIN` to the exact frontend origin.
- This starter stores demo products in code and cart data in the browser. A real production shop needs a database, authentication, inventory transactions, server-side cart/order validation, logging, rate limiting, monitoring, and secure payment integration.
- No public live URL is created automatically by generating this source folder. Deploy it using the steps above to obtain your own public URL.
# thirenex-Full-Stack-Deployment-Project-Architecture
