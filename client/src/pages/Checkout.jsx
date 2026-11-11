import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api, { errorMessage, money } from '../api';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: '', address: '' });
  const [error, setError] = useState('');

  if (items.length === 0) return <Navigate to="/cart" replace />;

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/orders', { ...form, items: items.map((item) => ({ product: item.product._id, qty: item.qty })) });
      clear();
      navigate('/orders');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div className="container section narrow">
      <h2>Checkout</h2>
      <form className="form" onSubmit={submit}>
        <label>Phone<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label>Delivery address<textarea required rows="3" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></label>
        <p className="note">Payment method: Cash on delivery</p>
        <h3>Order total: {money(total)}</h3>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-dark">Place order</button>
      </form>
    </div>
  );
}
