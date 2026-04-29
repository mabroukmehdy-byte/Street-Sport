import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const addItem = (product, size) => {
    const key = `${product.id}-${size || 'Unique'}`;
    setItems((prev) => {
      const found = prev.find((it) => it.key === key);
      if (found) {
        return prev.map((it) => (it.key === key ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { key, id: product.id, name: product.name, price: product.price, image: product.image, size: size || 'Unique', qty: 1 }];
    });
    setOpen(true);
  };

  const removeItem = (key) => setItems((prev) => prev.filter((it) => it.key !== key));
  const setQty = (key, qty) => setItems((prev) => prev.map((it) => (it.key === key ? { ...it, qty: Math.max(1, qty) } : it)));

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);
  const count = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, open, setOpen, addItem, removeItem, setQty, subtotal, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
