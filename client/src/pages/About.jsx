import { Link } from 'react-router-dom';
import { ArrowUpRight, Leaf, Heart, Sparkles } from 'lucide-react';
export default function About() {
  return <main className="page-shell about-page"><div className="eyebrow">A NOTE FROM US</div><h1>Make room for<br/><em>the good stuff.</em></h1><p className="about-lead">ShopSphere is a concept store built around a simple idea: everyday objects can be useful, lasting, and a little bit delightful.</p><div className="about-pillars"><article><Leaf/><h2>Thoughtful by nature</h2><p>We look for pieces that earn their place in your daily routine.</p></article><article><Heart/><h2>Made for real life</h2><p>Good design should feel intuitive, approachable, and easy to enjoy.</p></article><article><Sparkles/><h2>Joy in the details</h2><p>Small moments matter. The right everyday object can make one better.</p></article></div><Link to="/catalog" className="button button-dark">Shop the collection <ArrowUpRight size={17}/></Link></main>;
}
