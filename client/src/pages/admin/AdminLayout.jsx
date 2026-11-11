import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const links = [
  ['/admin', 'Overview'],
  ['/admin/categories', 'Categories'],
  ['/admin/products', 'Products'],
  ['/admin/orders', 'Orders'],
  ['/admin/users', 'Users'],
  ['/admin/messages', 'Messages'],
  ['/admin/settings', 'Settings']
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin">
      <aside className="sidebar">
        <img src="/logo.png" alt="StationeryX" className="logo" />
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/admin'}>{label}</NavLink>
        ))}
        <NavLink to="/">View website</NavLink>
        <button className="btn btn-light" onClick={handleLogout}>Logout</button>
      </aside>
      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  );
}
