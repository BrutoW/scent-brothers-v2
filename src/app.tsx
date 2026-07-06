import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { AdminRoute } from './pages/AdminRoute';
import { supabase } from './lib/supabase';
import './index.css';

interface Perfume {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const fetchPerfumes = async () => {
    const { data } = await supabase.from('perfumes').select('*').order('name');
    if (data) setPerfumes(data);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">SCENT BROTHERS</div>
        <div className="nav-links">
          <a href="https://www.instagram.com/scent.brothersmx" target="_blank" rel="noopener noreferrer">
            <img src="public/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://wa.me/3348279597" target="_blank" rel="noopener noreferrer">
            <img src="public/icons/whatsapp.svg" alt="WhatsApp" />
          </a>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" style={{ fontWeight: 600 }}>Admin</Link>
              )}
              <button
                onClick={handleSignOut}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333', fontWeight: 500 }}
              >
                Salir
              </button>
            </>
          ) : (
            <Link to="/login">Iniciar Sesión</Link>
          )}
        </div>
      </nav>

      <header className="hero">
        <h1>Descubre tu aroma favorito</h1>
        <p>Explora nuestra colección de fragancias en tendencia</p>
      </header>

      <main>
        <section id="catalogo" className="perfume-section">
          <h2>Catálogo</h2>
          <h3>Preguntar si aún está disponible el perfume</h3>
          <div className="perfume-grid">
            {perfumes.map((perfume, index) => (
              <div key={perfume.id || index} className="perfume-card">
                <img src={perfume.image} alt={perfume.name} className="perfume-image" />
                <div className="perfume-info">
                  <h3>{perfume.name}</h3>
                  <p>{perfume.description}</p>
                  <span className="price">${perfume.price.toLocaleString()}</span>
                  <button
                    className="add-to-cart"
                    onClick={() => window.open('https://www.instagram.com/scent.brothersmx/', '_blank')}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h3></h3>
          <h4>Si está interesado en algún perfume mandar mensaje al Instagram o WhatsApp que están en los botones de arriba</h4>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <p>&copy; 2024 SCENT BROTHERS. All rights reserved.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/scent.brothersmx" target="_blank" rel="noopener noreferrer">
              <img src="public/icons/instagram.svg" alt="Instagram" />
            </a>
            <a href="https://wa.me/3348279597" target="_blank" rel="noopener noreferrer">
              <img src="public/icons/whatsapp.svg" alt="WhatsApp" />
            </a>
          </div>
        </div>
      </footer>

      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <span>Carrito</span>
          <button onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          <p>El carrito está vacío</p>
        </div>
        <div className="cart-footer">
          <button className="checkout-button">Realizar Pedido</button>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
