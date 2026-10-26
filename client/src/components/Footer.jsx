import { Link } from 'react-router-dom';
export default function Footer() {
  return <footer className="footer">
    <div><Link to="/" className="footer-brand">shopsphere<span>.</span></Link><p>Good things for everyday living.</p></div>
    <div className="footer-right"><span>Thoughtfully picked. Made to last.</span><span>© {new Date().getFullYear()} ShopSphere · Capstone demo</span></div>
  </footer>;
}
