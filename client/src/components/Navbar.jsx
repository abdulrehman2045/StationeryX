import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/">
          <img src="/logo.png" alt="StationeryX" className="logo" />
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user && <NavLink to="/orders">My orders</NavLink>}
          {user?.role === 'admin' && <NavLink to="/admin">Dashboard</NavLink>}
        </nav>
        <div className="nav-actions">
          <Link to="/cart" className="cart-link" aria-label="Cart">
            <FiShoppingCart size={22} />
            {count > 0 && <span className="badge">{count}</span>}
          </Link>
          {user ? (
            <button className="btn btn-light" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="btn btn-light">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
