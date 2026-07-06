import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface Perfume {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Expense {
  id: string;
  name: string;
  brand: string;
  ml: number;
  purchase_price: number;
  sale_price: number;
}

export const AdminPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'perfumes' | 'expenses'>('perfumes');

  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null);
  const [showAddPerfume, setShowAddPerfume] = useState(false);
  const [newPerfume, setNewPerfume] = useState({ name: '', description: '', price: '', image: '' });

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({ name: '', brand: '', ml: '', purchase_price: '', sale_price: '' });

  useEffect(() => {
    fetchPerfumes();
    fetchExpenses();
  }, []);

  const fetchPerfumes = async () => {
    const { data } = await supabase.from('perfumes').select('*').order('name');
    if (data) setPerfumes(data);
  };

  const fetchExpenses = async () => {
    const { data } = await supabase.from('expenses').select('*').order('created_at', { ascending: false });
    if (data) setExpenses(data);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleEditPerfume = (perfume: Perfume) => {
    setEditingPerfume({ ...perfume });
  };

  const handleSavePerfume = async () => {
    if (!editingPerfume) return;
    await supabase.from('perfumes').update({
      name: editingPerfume.name,
      description: editingPerfume.description,
      price: editingPerfume.price,
      image: editingPerfume.image
    }).eq('id', editingPerfume.id);
    setEditingPerfume(null);
    fetchPerfumes();
  };

  const handleAddPerfume = async () => {
    if (!newPerfume.name || !newPerfume.price) return;
    await supabase.from('perfumes').insert({
      name: newPerfume.name,
      description: newPerfume.description,
      price: parseFloat(newPerfume.price),
      image: newPerfume.image || 'public/images/placeholder.jpg'
    });
    setNewPerfume({ name: '', description: '', price: '', image: '' });
    setShowAddPerfume(false);
    fetchPerfumes();
  };

  const handleDeletePerfume = async (id: string) => {
    if (!confirm('¿Eliminar este perfume?')) return;
    await supabase.from('perfumes').delete().eq('id', id);
    fetchPerfumes();
  };

  const handleAddExpense = async () => {
    if (!newExpense.name || !newExpense.brand) return;
    await supabase.from('expenses').insert({
      name: newExpense.name,
      brand: newExpense.brand,
      ml: parseFloat(newExpense.ml) || 0,
      purchase_price: parseFloat(newExpense.purchase_price) || 0,
      sale_price: parseFloat(newExpense.sale_price) || 0
    });
    setNewExpense({ name: '', brand: '', ml: '', purchase_price: '', sale_price: '' });
    fetchExpenses();
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('¿Eliminar este registro?')) return;
    await supabase.from('expenses').delete().eq('id', id);
    fetchExpenses();
  };

  const totalPurchase = expenses.reduce((sum, e) => sum + e.purchase_price, 0);
  const totalSale = expenses.reduce((sum, e) => sum + e.sale_price, 0);
  const profit = totalSale - totalPurchase;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <nav style={{ background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '2px', color: '#1a1a1a', textDecoration: 'none' }}>
            SCENT BROTHERS
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#666' }}>{user?.email}</span>
            <button
              onClick={handleSignOut}
              style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('perfumes')}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === 'perfumes' ? '#1a1a1a' : 'white',
              color: activeTab === 'perfumes' ? 'white' : '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Gestionar Perfumes
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === 'expenses' ? '#1a1a1a' : 'white',
              color: activeTab === 'expenses' ? 'white' : '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Control de Gastos
          </button>
          <Link
            to="/"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#9f8e7d',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Ver Tienda
          </Link>
        </div>

        {activeTab === 'perfumes' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Catálogo de Perfumes</h2>
              <button
                onClick={() => setShowAddPerfume(!showAddPerfume)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#9f8e7d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {showAddPerfume ? 'Cancelar' : '+ Agregar Perfume'}
              </button>
            </div>

            {showAddPerfume && (
              <div style={{ background: 'white', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Nuevo Perfume</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={newPerfume.name}
                    onChange={(e) => setNewPerfume({ ...newPerfume, name: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                  <input
                    type="number"
                    placeholder="Precio"
                    value={newPerfume.price}
                    onChange={(e) => setNewPerfume({ ...newPerfume, price: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                  <input
                    type="text"
                    placeholder="URL de imagen"
                    value={newPerfume.image}
                    onChange={(e) => setNewPerfume({ ...newPerfume, image: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>
                <textarea
                  placeholder="Descripción"
                  value={newPerfume.description}
                  onChange={(e) => setNewPerfume({ ...newPerfume, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem', minHeight: '80px', marginBottom: '1rem' }}
                />
                <button
                  onClick={handleAddPerfume}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#1a1a1a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Guardar
                </button>
              </div>
            )}

            <div style={{ display: 'grid', gap: '1rem' }}>
              {perfumes.map((perfume) => (
                <div
                  key={perfume.id}
                  style={{
                    background: 'white',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'flex-start'
                  }}
                >
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                  <div style={{ flex: 1 }}>
                    {editingPerfume?.id === perfume.id ? (
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <input
                          type="text"
                          value={editingPerfume.name}
                          onChange={(e) => setEditingPerfume({ ...editingPerfume, name: e.target.value })}
                          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        <textarea
                          value={editingPerfume.description}
                          onChange={(e) => setEditingPerfume({ ...editingPerfume, description: e.target.value })}
                          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', minHeight: '60px' }}
                        />
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <input
                            type="number"
                            value={editingPerfume.price}
                            onChange={(e) => setEditingPerfume({ ...editingPerfume, price: parseFloat(e.target.value) })}
                            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', width: '120px' }}
                          />
                          <input
                            type="text"
                            value={editingPerfume.image}
                            onChange={(e) => setEditingPerfume({ ...editingPerfume, image: e.target.value })}
                            placeholder="URL imagen"
                            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', flex: 1 }}
                          />
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={handleSavePerfume}
                            style={{ padding: '0.5rem 1rem', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setEditingPerfume(null)}
                            style={{ padding: '0.5rem 1rem', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{perfume.name}</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{perfume.description}</p>
                        <p style={{ fontWeight: 600, color: '#9f8e7d' }}>${perfume.price.toLocaleString()}</p>
                      </>
                    )}
                  </div>
                  {editingPerfume?.id !== perfume.id && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEditPerfume(perfume)}
                        style={{ padding: '0.5rem 1rem', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePerfume(perfume.id)}
                        style={{ padding: '0.5rem 1rem', background: '#c62828', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Control de Gastos</h2>

            <div style={{ background: 'white', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Agregar Registro</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={newExpense.name}
                  onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                  style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                />
                <input
                  type="text"
                  placeholder="Marca"
                  value={newExpense.brand}
                  onChange={(e) => setNewExpense({ ...newExpense, brand: e.target.value })}
                  style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                />
                <input
                  type="number"
                  placeholder="ML"
                  value={newExpense.ml}
                  onChange={(e) => setNewExpense({ ...newExpense, ml: e.target.value })}
                  style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                />
                <input
                  type="number"
                  placeholder="Precio Compra"
                  value={newExpense.purchase_price}
                  onChange={(e) => setNewExpense({ ...newExpense, purchase_price: e.target.value })}
                  style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                />
                <input
                  type="number"
                  placeholder="Precio Venta"
                  value={newExpense.sale_price}
                  onChange={(e) => setNewExpense({ ...newExpense, sale_price: e.target.value })}
                  style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                />
              </div>
              <button
                onClick={handleAddExpense}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Agregar
              </button>
            </div>

            <div style={{ display: 'grid', gridAutoFlow: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#e8f5e9', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <p style={{ color: '#2e7d32', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Total Compras</p>
                <p style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1b5e20' }}>${totalPurchase.toLocaleString()}</p>
              </div>
              <div style={{ background: '#e3f2fd', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <p style={{ color: '#1565c0', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Total Ventas</p>
                <p style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0d47a1' }}>${totalSale.toLocaleString()}</p>
              </div>
              <div style={{ background: profit >= 0 ? '#fff3e0' : '#ffebee', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <p style={{ color: profit >= 0 ? '#e65100' : '#c62828', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Ganancia</p>
                <p style={{ fontWeight: 700, fontSize: '1.25rem', color: profit >= 0 ? '#bf360c' : '#b71c1c' }}>${profit.toLocaleString()}</p>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', color: '#666' }}>Nombre</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', color: '#666' }}>Marca</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem', color: '#666' }}>ML</th>
                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, fontSize: '0.85rem', color: '#666' }}>Compra</th>
                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, fontSize: '0.85rem', color: '#666' }}>Venta</th>
                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, fontSize: '0.85rem', color: '#666' }}>Ganancia</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem', color: '#666' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id} style={{ borderTop: '1px solid #eee' }}>
                      <td style={{ padding: '1rem', fontWeight: 500 }}>{expense.name}</td>
                      <td style={{ padding: '1rem', color: '#666' }}>{expense.brand}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>{expense.ml}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>${expense.purchase_price.toLocaleString()}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>${expense.sale_price.toLocaleString()}</td>
                      <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: expense.sale_price - expense.purchase_price >= 0 ? '#2e7d32' : '#c62828' }}>
                        ${(expense.sale_price - expense.purchase_price).toLocaleString()}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          style={{ background: 'none', border: 'none', color: '#c62828', cursor: 'pointer', fontSize: '0.85rem' }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {expenses.length === 0 && (
                <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No hay registros</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
