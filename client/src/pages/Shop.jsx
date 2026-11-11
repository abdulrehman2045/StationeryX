import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const category = params.get('category') || '';

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    api.get('/products', { params: { category, search } }).then((res) => setProducts(res.data));
  }, [category, search]);

  return (
    <div className="container section">
      <h2>Shop</h2>
      <div className="filters">
        <input placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={category} onChange={(e) => setParams(e.target.value ? { category: e.target.value } : {})}>
          <option value="">All categories</option>
          {categories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
        </select>
      </div>
      {products.length === 0 && <p className="empty">No products match your search. Try another keyword or category.</p>}
      <div className="grid">
        {products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
}
