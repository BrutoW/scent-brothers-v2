import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Carrito de Compras</h2>
          <button onClick={onClose} className="p-2">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">El carrito está vacío</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-amber-800 font-semibold">{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold text-amber-800">{total}</span>
          </div>
          <button
            className="w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 transition-colors"
            onClick={() => alert('¡Gracias por tu compra!')}
          >
            Realizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};
