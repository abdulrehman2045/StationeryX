import { useEffect, useState } from 'react';
import api, { money } from '../api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/mine').then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="container section">
      <h2>My orders</h2>
      {orders.length === 0 && <p className="empty">You have not placed any orders yet.</p>}
      {orders.map((order) => (
        <div className="order" key={order._id}>
          <div className="order-head">
            <strong>Order #{order._id.slice(-6)}</strong>
            <span className="status">{order.status}</span>
          </div>
          {order.items.map((item) => (
            <p key={item._id}>{item.qty} x {item.name} - {money(item.price * item.qty)}</p>
          ))}
          <strong>Total: {money(order.total)}</strong>
        </div>
      ))}
    </div>
  );
}
