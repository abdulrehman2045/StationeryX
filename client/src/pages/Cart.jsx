import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { money } from '../api';

export default function Cart() {
  const { items, setQty, remove, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container section">
        <h2>Your cart</h2>
        <p className="empty">Your cart is empty. <Link to="/shop"><u>Browse products</u></Link></p>
      </div>
    );
  }

  return (
    <div className="container section">
      <h2>Your cart</h2>
      <div className="cart-list">
        {items.map(({ product, qty }) => (
          <div className="cart-row" key={product._id}>
            <div className="cart-info">
              <strong>{product.name}</strong>
              <span>{money(product.price)}</span>
            </div>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(product._id, Number(e.target.value))}
            />
            <strong>{money(product.price * qty)}</strong>
            <button className="icon-btn" onClick={() => remove(product._id)} aria-label="Remove item">
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: {money(total)}</h3>
        <button className="btn btn-dark" onClick={() => navigate('/checkout')}>Proceed to checkout</button>
      </div>
    </div>
  );
}
