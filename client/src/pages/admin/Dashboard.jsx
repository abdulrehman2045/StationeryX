import { useEffect, useState } from 'react';
import api, { money } from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/stats').then((res) => setStats(res.data));
  }, []);

  if (!stats) return null;

  const cards = [
    ['Products', stats.products],
    ['Categories', stats.categories],
    ['Users', stats.users],
    ['Orders', stats.orders],
    ['Revenue', money(stats.revenue)]
  ];

  return (
    <>
      <h2>Overview</h2>
      <div className="stats">
        {cards.map(([label, value]) => (
          <div className="stat" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
