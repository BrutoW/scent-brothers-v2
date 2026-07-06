import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Perfume } from '../types/perfume';
import { useCart } from '../context/CartContext';

interface PerfumeCardProps {
  perfume: Perfume;
}

export const PerfumeCard: React.FC<PerfumeCardProps> = ({ perfume }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: perfume.name, // Using name as ID for simplicity
      name: perfume.name,
      price: perfume.price,
      image: perfume.image
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2">
      <img
        src={perfume.image}
        alt={perfume.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{perfume.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{perfume.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-800">{perfume.price}</span>
          
        </div>
      </div>
    </div>
  );
};
