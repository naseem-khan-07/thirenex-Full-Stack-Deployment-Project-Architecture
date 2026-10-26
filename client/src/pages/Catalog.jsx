import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';

export default function Catalog({ products, loading, query, setQuery, category, setCategory, sort, setSort, categories, onAdd }) {
  return <main className="page-shell">
    <div className="page-intro"><div className="eyebrow">THE FULL COLLECTION</div><h1>Find your <em>favourite.</em></h1><p>Considered essentials for the everyday, from your desk to your weekend.</p></div>
    <div className="catalog-toolbar">
      <label className="search-box"><Search size={18}/><span className="sr-only">Search products</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the collection…" /></label>
      <label className="filter-select"><SlidersHorizontal size={17}/><span className="sr-only">Category</span><select value={category} onChange={e=>setCategory(e.target.value)}><option value="all">All categories</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
      <label className="filter-select"><span className="sr-only">Sort products</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="rating">Top rated</option></select></label>
    </div>
    <div className="catalog-count">{loading ? 'Finding good things…' : `${products.length} thoughtfully picked ${products.length === 1 ? 'item' : 'items'}`}</div>
    {loading ? <div className="loading-state"><span className="spinner"></span>Loading the collection…</div> :
      products.length ? <div className="product-grid catalog-grid">{products.map(p=><ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</div> :
      <div className="empty-state"><span>⌕</span><h2>No matches just yet.</h2><p>Try another search or choose a different category.</p><button className="button button-dark" onClick={()=>{setQuery('');setCategory('all');}}>Clear filters</button></div>}
  </main>;
}
