import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

export default function Cart({ cart, updateQuantity, removeItem }) {
  const total = cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  return <main className="page-shell cart-page">
    <div className="eyebrow">YOUR LITTLE COLLECTION</div><h1>Your <em>bag.</em></h1>
    {!cart.length ? <div className="empty-state cart-empty"><span className="empty-bag"><ShoppingBag size={30}/></span><h2>Your bag is taking a quiet moment.</h2><p>There's plenty of room for something lovely.</p><Link className="button button-dark" to="/catalog">Explore the collection</Link></div> :
    <div className="cart-layout"><div className="cart-items">{cart.map(item=><article className="cart-item" key={item.id}><img src={item.image} alt={item.name} width="120" height="110"/><div className="cart-item-info"><span className="product-category">{item.category}</span><h2>{item.name}</h2><strong>${Number(item.price).toFixed(2)}</strong><div className="quantity-control"><button onClick={()=>updateQuantity(item.id,item.quantity-1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={13}/></button><span>{item.quantity}</span><button onClick={()=>updateQuantity(item.id,item.quantity+1)} aria-label={`Increase ${item.name} quantity`}><Plus size={13}/></button></div></div><button className="remove-button" onClick={()=>removeItem(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={17}/></button></article>)}
      <Link to="/catalog" className="back-link"><ArrowLeft size={16}/> Continue browsing</Link></div>
      <aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><b>${total.toFixed(2)}</b></div><div><span>Shipping</span><b>Complimentary</b></div><div><span>Estimated tax</span><b>Calculated at checkout</b></div><div className="summary-total"><span>Total</span><b>${total.toFixed(2)}</b></div><button className="button button-dark checkout-button" onClick={()=>window.alert('This is a capstone demo. Checkout and payments are not enabled.')}>Continue to checkout</button><p>Demo checkout only. No payment is collected.</p></aside>
    </div>}
  </main>;
}
