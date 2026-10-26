import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Minus, Plus, Star } from 'lucide-react';
import { getProduct } from '../services/api.js';

export default function ProductDetails({ onAdd }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => { let active = true; setLoading(true); getProduct(id).then(p=>{if(active)setProduct(p)}).finally(()=>{if(active)setLoading(false)}); return ()=>{active=false}; }, [id]);
  if (loading) return <main className="page-shell"><div className="loading-state"><span className="spinner"></span>Finding your item…</div></main>;
  if (!product) return <main className="page-shell empty-state"><h1>We couldn't find that item.</h1><Link className="button button-dark" to="/catalog">Back to the collection</Link></main>;
  return <main className="page-shell detail-page">
    <Link to="/catalog" className="back-link"><ArrowLeft size={16}/> Back to collection</Link>
    <div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.name} width="600" height="520"/></div>
      <div className="detail-copy"><div className="eyebrow">{product.category.toUpperCase()} / SHOPSPHERE EDIT</div><h1>{product.name}</h1><div className="detail-rating"><Star size={15} fill="currentColor"/> {product.rating} <span>· Thoughtfully reviewed</span></div><div className="detail-price">${Number(product.price).toFixed(2)}</div><p>{product.description}</p><div className="detail-meta"><span>Colour</span><b>{product.color || 'Signature'}</b></div><div className="detail-meta"><span>Availability</span><b className="in-stock"><Check size={15}/> In stock</b></div>
        <div className="purchase-row"><div className="quantity-control"><button onClick={()=>setQuantity(q=>Math.max(1,q-1))} aria-label="Decrease quantity"><Minus size={15}/></button><span>{quantity}</span><button onClick={()=>setQuantity(q=>Math.min(10,q+1))} aria-label="Increase quantity"><Plus size={15}/></button></div><button className="button button-dark add-wide" onClick={()=>onAdd(product, quantity)}>Add to bag — ${(product.price*quantity).toFixed(2)}</button></div>
        <div className="shipping-note"><Check size={16}/> Easy everyday essentials. Demo store — no real purchase is made.</div>
      </div>
    </div>
  </main>;
}
