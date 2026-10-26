import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';
import { getProducts } from './services/api.js';

const Home = lazy(() => import('./pages/Home.jsx'));
const Catalog = lazy(() => import('./pages/Catalog.jsx'));
const ProductDetails = lazy(() => import('./pages/ProductDetails.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function readCart() {
  try { return JSON.parse(localStorage.getItem('shopsphere-cart') || '[]'); }
  catch { return []; }
}

export default function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState(readCart);
  const [toast, setToast] = useState('');
  const location = useLocation();

  useEffect(() => {
    let active = true;
    getProducts().then(items => { if (active) setAllProducts(items); })
      .catch(() => { if (active) setAllProducts([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => { localStorage.setItem('shopsphere-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [location.pathname]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(()=>setToast(''), 2400); return ()=>clearTimeout(timer); }, [toast]);

  const categories = useMemo(() => [...new Set(allProducts.map(p=>p.category))].sort(), [allProducts]);
  const visibleProducts = useMemo(() => {
    let list = [...allProducts];
    if (query.trim()) list = list.filter(p=>p.name.toLowerCase().includes(query.trim().toLowerCase()) || p.category.toLowerCase().includes(query.trim().toLowerCase()));
    if (category !== 'all') list = list.filter(p=>p.category === category);
    if (sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
    if (sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
    if (sort === 'rating') list.sort((a,b)=>b.rating-a.rating);
    return list;
  }, [allProducts, query, category, sort]);

  function addToCart(product, quantity = 1) {
    setCart(current => {
      const found = current.find(item=>item.id===product.id);
      return found ? current.map(item=>item.id===product.id ? {...item, quantity: Math.min(99,item.quantity+quantity)} : item) : [...current,{...product,quantity}];
    });
    setToast(`${product.name} added to your bag`);
  }
  function updateQuantity(id, quantity) {
    if (quantity <= 0) { setCart(current=>current.filter(item=>item.id!==id)); return; }
    setCart(current=>current.map(item=>item.id===id?{...item,quantity:Math.min(99,quantity)}:item));
  }
  function removeItem(id) { setCart(current=>current.filter(item=>item.id!==id)); setToast('Item removed from your bag'); }
  const cartCount = cart.reduce((sum,item)=>sum+item.quantity,0);

  return <div className="app-shell">
    <div className="announcement"><span>✳</span> A little more thoughtful, a little less ordinary. <span className="announcement-right">CURATED FOR EVERYDAY LIVING</span></div>
    <Header cartCount={cartCount}/>
    <Suspense fallback={<div className="loading-state route-loading"><span className="spinner"></span>Getting things ready…</div>}>
      <Routes>
        <Route path="/" element={<Home products={allProducts} onAdd={addToCart}/>}/>
        <Route path="/catalog" element={<Catalog products={visibleProducts} loading={loading} query={query} setQuery={setQuery} category={category} setCategory={setCategory} sort={sort} setSort={setSort} categories={categories} onAdd={addToCart}/>}/>
        <Route path="/product/:id" element={<ProductDetails onAdd={addToCart}/>}/>
        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeItem={removeItem}/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Suspense>
    <Footer/>
    <Toast message={toast}/>
  </div>;
}
