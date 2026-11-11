import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const add = (product) =>
    setItems((current) => {
      const found = current.find((item) => item.product._id === product._id);
      if (!found) return [...current, { product, qty: 1 }];
      return current.map((item) =>
        item.product._id === product._id ? { ...item, qty: Math.min(item.qty + 1, product.stock) } : item
      );
    });

  const setQty = (id, qty) =>
    setItems((current) =>
      current.map((item) => (item.product._id === id ? { ...item, qty: Math.max(1, Math.min(qty, item.product.stock)) } : item))
    );

  const remove = (id) => setItems((current) => current.filter((item) => item.product._id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + item.qty * item.product.price, 0);

  return <CartContext.Provider value={{ items, add, setQty, remove, clear, count, total }}>{children}</CartContext.Provider>;
}
