import { Link } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
export default function ProductCard({ product, onAdd }) {
  return <article className="product-card">
    <Link to={`/product/${product.id}`} className="product-image" aria-label={`View ${product.name}`}>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <img src={product.image} alt={product.name} loading="lazy" width="420" height="360"/>
      <span className="image-arrow"><ArrowUpRight size={18}/></span>
    </Link>
    <div className="product-info">
      <div className="product-category">{product.category}</div>
      <div className="product-title-row"><Link to={`/product/${product.id}`} className="product-name">{product.name}</Link><strong>${Number(product.price).toFixed(2)}</strong></div>
      <div className="product-bottom"><span className="rating"><Star size={13} fill="currentColor"/>{product.rating}</span><button onClick={() => onAdd(product)} className="quick-add">+ Add</button></div>
    </div>
  </article>;
}
