import { useEffect, useState } from 'react';
import api, { money } from '../../api';

const statuses = ['pending', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const load = () => api.get('/orders').then((res) => setOrders(res.data));

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    load();
  };

  return (
    <>
      <h2>Orders</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Delivery</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-6)}</td>
                <td>{order.user?.name}<br />{order.user?.email}</td>
                <td>{order.items.map((item) => <div key={item._id}>{item.qty} x {item.name}</div>)}</td>
                <td>{order.phone}<br />{order.address}</td>
                <td>{money(order.total)}</td>
                <td>
                  <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="empty">No orders have been placed yet.</p>}
      </div>
    </>
  );
}
