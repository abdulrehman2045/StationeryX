import { useEffect, useState } from 'react';
import api from '../../api';

export default function Messages() {
  const [messages, setMessages] = useState([]);

  const load = () => api.get('/messages').then((res) => setMessages(res.data));

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    await api.delete(`/messages/${id}`);
    load();
  };

  return (
    <>
      <h2>Messages</h2>
      {messages.length === 0 && <p className="empty">No messages received yet.</p>}
      {messages.map((item) => (
        <div className="order" key={item._id}>
          <div className="order-head">
            <strong>{item.name} ({item.email})</strong>
            <button className="btn btn-small btn-danger" onClick={() => remove(item._id)}>Delete</button>
          </div>
          <p>{item.message}</p>
        </div>
      ))}
    </>
  );
}
