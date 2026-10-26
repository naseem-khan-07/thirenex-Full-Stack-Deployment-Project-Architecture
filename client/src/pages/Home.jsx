import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, Leaf, PackageCheck, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';

export default function Home({ products, onAdd }) {
  return <main>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line"></span>THE EVERYDAY EDIT · VOL. 01</div>
        <h1>Little things.<br/><em>Better living.</em></h1>
        <p>Thoughtful finds for your routines, your spaces, and everything that makes a day yours.</p>
        <div className="hero-actions"><Link to="/catalog" className="button button-dark">Explore the collection <ArrowUpRight size={17}/></Link><a href="#featured" className="text-link">Meet your new favourites <ArrowDownRight size={16}/></a></div>
        <div className="hero-note"><div className="avatar-stack"><span>✳</span><span>✦</span><span>◒</span></div><span><b>Good design, less fuss.</b><br/>Curated with care, every day.</span></div>
      </div>
      <div className="hero-art" aria-label="Illustration of curated everyday products">
        <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
        <div className="hero-sticker"><Sparkles size={15}/> GOOD THINGS INSIDE</div>
        <img src="/products/hero.svg" alt="A curated collection of everyday essentials" width="700" height="640" fetchPriority="high"/>
        <div className="hero-caption"><span>01 / 06</span><span>Objects for a softer everyday</span></div>
      </div>
    </section>
    <section className="value-strip">
      <div><Leaf size={19}/><span><b>Thoughtfully chosen</b><small>Less, but better</small></span></div>
      <div><PackageCheck size={19}/><span><b>Ready for real life</b><small>Useful by design</small></span></div>
      <div><Sparkles size={19}/><span><b>A little delight</b><small>In every detail</small></span></div>
    </section>
    <section className="section featured-section" id="featured">
      <div className="section-heading"><div><div className="eyebrow">A FEW GOOD THINGS</div><h2>Made for your <em>everyday.</em></h2></div><Link to="/catalog" className="text-link">View all products <ArrowUpRight size={16}/></Link></div>
      <div className="product-grid">{products.slice(0,4).map(p => <ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</div>
    </section>
    <section className="story-band" id="story"><div className="story-symbol">✳</div><div><div className="eyebrow">OUR POINT OF VIEW</div><h2>Useful can be <em>beautiful.</em></h2><p>We believe the things you use every day deserve a little thought. ShopSphere brings together considered essentials that feel good to use and easy to live with.</p></div><Link to="/catalog" className="button button-light">Find your everyday <ArrowUpRight size={17}/></Link></section>
  </main>;
}
