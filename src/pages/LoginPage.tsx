import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/');
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setError('Cuenta creada. Ya puedes iniciar sesión.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '400px', width: '100%', background: 'white', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '2px', color: '#1a1a1a', textDecoration: 'none' }}>
            SCENT BROTHERS
          </Link>
          <h2 style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#666' }}>
            {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta'}
          </h2>
        </div>

        {error && (
          <div style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            borderRadius: '4px',
            background: error.includes('creada') ? '#e8f5e9' : '#ffebee',
            color: error.includes('creada') ? '#2e7d32' : '#c62828'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: '#333' }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="tu@email.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: '#333' }}>
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#9f8e7d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            style={{ background: 'none', border: 'none', color: '#9f8e7d', cursor: 'pointer', fontWeight: 500 }}
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#666', fontSize: '0.9rem', textDecoration: 'none' }}>
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
};
