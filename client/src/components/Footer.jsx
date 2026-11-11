import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="/logo.png" alt="StationeryX" className="logo" />
          <p>{settings.tagline}</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Reach us</h4>
          <p>{settings.email}</p>
          <p>{settings.phone}</p>
          <p>{settings.address}</p>
        </div>
      </div>
    </footer>
  );
}
