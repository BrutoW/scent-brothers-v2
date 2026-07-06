import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { PerfumeSection } from '../components/PerfumeSection';
import { CartDrawer } from '../components/CartDrawer';
import { CartButton } from '../components/CartButton';
import { SocialLinks } from '../components/SocialLinks';
import { CartProvider } from '../context/CartContext';
import { perfumes } from '../data/perfumes';

export const StorePage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar>
          <CartButton onClick={() => setIsCartOpen(true)} />
        </Navbar>
        <Hero />
        <main className="pt-20">
          <PerfumeSection id="new" title="Lo Nuevo" perfumes={perfumes.new} />
          <PerfumeSection id="trending" title="En Tendencia" perfumes={perfumes.trending} />
          <PerfumeSection id="luxury" title="Colección de diseñador" perfumes={perfumes.luxury} />
          <PerfumeSection id="catalogo" title="Catálogo" perfumes={perfumes.catalogo} />
        </main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p>&copy; 2024 SCENT BROTHERS. All rights reserved.</p>
              <SocialLinks />
            </div>
          </div>
        </footer>
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};
