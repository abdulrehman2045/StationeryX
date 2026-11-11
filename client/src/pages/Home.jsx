import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { useSettings } from '../context/SettingsContext';

export default function Home() {
  const { settings } = useSettings();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
    api.get('/products').then((res) => setProducts(res.data.slice(0, 8)));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Write it.<br />Sketch it.<br />Make it count.</h1>
          <p>{settings.tagline}. Pens, notebooks, art supplies and office essentials delivered to your door.</p>
          <Link to="/shop" className="btn btn-light">Shop now</Link>
        </div>
      </section>

      <section className="container section">
        <h2>Shop by category</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category._id} to={`/shop?category=${category._id}`} className="category-tile">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2>Latest products</h2>
        <div className="grid">
          {products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </section>
    </>
  );
}
