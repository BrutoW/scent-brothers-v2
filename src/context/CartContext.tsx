import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem } from '../types/cart';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  total: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(items => items.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const total = items
    .reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0)
    .toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
