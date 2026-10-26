import { Link } from 'react-router-dom';
export default function NotFound() {
  return <main className="page-shell not-found"><div className="eyebrow">404 / A LITTLE DETOUR</div><h1>Well, this is <em>unexpected.</em></h1><p>The page you're looking for may have moved on to something else.</p><Link className="button button-dark" to="/">Return home</Link></main>;
}
