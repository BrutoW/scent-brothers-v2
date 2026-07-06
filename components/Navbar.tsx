import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full px-8 py-6 flex justify-between items-center bg-white/95 backdrop-blur-md z-50">
      <Link to="/" className="text-2xl font-bold tracking-wider text-amber-600">
        ScentBrothers
      </Link>
      <div className="hidden md:flex items-center space-x-8">
        <button
          onClick={() => scrollToSection('new')}
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Nuevo
        </button>
        <button
          onClick={() => scrollToSection('trending')}
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Tendencia
        </button>
        <button
          onClick={() => scrollToSection('luxury')}
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Diseñador
        </button>
        <button
          onClick={() => scrollToSection('catalogo')}
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Catálogo
        </button>

        {user ? (
          <>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Admin
              </Link>
            )}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Salir
              </button>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Iniciar Sesión
          </Link>
        )}

        {children}
      </div>
    </nav>
  );
};
