import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrade } from '../services/api';

export default function AddTrade() {
  const [form, setForm] = useState({
    coin: '', type: 'buy', buyPrice: '', sellPrice: '', amount: '', date: '', notes: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createTrade(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add Trade</h2>
          <button style={styles.backBtn} onClick={() => navigate('/')}>← Back</button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} placeholder="Coin (e.g. BTC)" value={form.coin}
            onChange={e => setForm({ ...form, coin: e.target.value })} required />
          <select style={styles.input} value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <input style={styles.input} placeholder="Buy Price ($)" type="number" value={form.buyPrice}
            onChange={e => setForm({ ...form, buyPrice: e.target.value })} required />
          <input style={styles.input} placeholder="Sell Price ($) - optional" type="number" value={form.sellPrice}
            onChange={e => setForm({ ...form, sellPrice: e.target.value })} />
          <input style={styles.input} placeholder="Amount (coins)" type="number" value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })} required />
          <input style={styles.input} type="date" value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })} required />
          <textarea style={styles.input} placeholder="Notes (optional)" value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} />
          <button style={styles.button} type="submit">Save Trade</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: '#1a1a1a', padding: '40px', borderRadius: '12px', width: '420px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { color: '#fff', margin: 0 },
  backBtn: { background: 'none', border: '1px solid #333', color: '#888', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' },
  input: { width: '100%', padding: '12px', marginBottom: '12px', background: '#2a2a2a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#00ff88', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
  error: { color: '#ff4444', marginBottom: '12px' },
};
