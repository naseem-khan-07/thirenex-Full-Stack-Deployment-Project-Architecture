import express from 'express';
import cors from 'cors';
import products from './data/products.js';

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin.split(',').map(origin => origin.trim()), methods: ['GET'], optionsSuccessStatus: 204 }));
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'ShopSphere API', timestamp: new Date().toISOString() }));

app.get('/api/categories', (_req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  res.json([...new Set(products.map(product => product.category))].sort());
});

app.get('/api/products', (req, res) => {
  const q = String(req.query.q || '').trim().slice(0, 100).toLowerCase();
  const category = String(req.query.category || 'all').trim().slice(0, 60);
  const sort = String(req.query.sort || 'featured');
  let result = products.filter(product => {
    const matchesQuery = !q || product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesQuery && matchesCategory;
  });
  if (sort === 'price-asc') result.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);
  if (sort === 'rating') result.sort((a,b) => b.rating - a.rating);
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json(result);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(item => item.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.set('Cache-Control', 'public, max-age=300');
  res.json(product);
});

app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, _req, res, _next) => {
  console.error('API error:', err.message);
  res.status(500).json({ error: 'Unexpected server error' });
});

app.listen(PORT, () => console.log(`ShopSphere API listening on port ${PORT}`));
