import fallbackProducts from '../data/fallbackProducts.js';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export async function getProducts(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== 'all') query.set(key, value);
  });
  try {
    const response = await fetch(`${API_BASE}/products${query.toString() ? `?${query}` : ''}`, {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error(`API request failed (${response.status})`);
    return await response.json();
  } catch (error) {
    // Keep the catalogue usable for a local preview if the API is not running.
    let list = [...fallbackProducts];
    if (params.q) list = list.filter(p => p.name.toLowerCase().includes(params.q.toLowerCase()));
    if (params.category && params.category !== 'all') list = list.filter(p => p.category === params.category);
    if (params.sort === 'price-asc') list.sort((a,b) => a.price - b.price);
    if (params.sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    if (params.sort === 'rating') list.sort((a,b) => b.rating - a.rating);
    return list;
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${API_BASE}/products/${encodeURIComponent(id)}`);
    if (!response.ok) throw new Error('Product not found');
    return await response.json();
  } catch {
    return fallbackProducts.find(product => product.id === id) || null;
  }
}
