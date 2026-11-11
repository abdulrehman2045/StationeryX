import { useCart } from '../context/CartContext';
import { money } from '../api';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const soldOut = product.stock < 1;

  return (
    <article className="product">
      <div className="product-image">
        {product.image ? <img src={product.image} alt={product.name} /> : <span>{product.name[0]}</span>}
      </div>
      <div className="product-body">
        <small>{product.category?.name}</small>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-footer">
          <strong>{money(product.price)}</strong>
          <button className="btn btn-dark" disabled={soldOut} onClick={() => add(product)}>
            {soldOut ? 'Sold out' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}
