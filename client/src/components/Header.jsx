import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function Header({ cartCount }) {
  return <header className="site-header">
    <Link to="/" className="brand" aria-label="ShopSphere home"><span className="brand-mark"><Sparkles size={17}/></span>shopsphere<span className="brand-dot">.</span></Link>
    <nav className="main-nav" aria-label="Main navigation">
      <NavLink to="/catalog">Shop all</NavLink>
      <a href="/#story">Our story</a>
    </nav>
    <Link className="cart-link" to="/cart" aria-label={`Shopping cart with ${cartCount} items`}>
      <ShoppingBag size={19}/><span>Bag</span><b>{cartCount}</b>
    </Link>
  </header>;
}
