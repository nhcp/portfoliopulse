import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrades, getStats, deleteTrade } from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/StatsCard';
import TradeTable from '../components/TradeTable';

export default function Dashboard() {
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tradesRes, statsRes] = await Promise.all([getTrades(), getStats()]);
      setTrades(tradesRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await deleteTrade(id);
    fetchData();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>PortfolioPulse</h1>
          <p style={styles.welcome}>Welcome, {user?.name}</p>
        </div>
        <div style={styles.headerButtons}>
          <button style={styles.addBtn} onClick={() => navigate('/add')}>+ Add Trade</button>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      {stats && (
        <div style={styles.statsGrid}>
          <StatsCard label="Total Trades" value={stats.totalTrades} />
          <StatsCard label="Total P&L" value={`$${stats.totalPnl.toFixed(2)}`} color={stats.totalPnl >= 0 ? '#00ff88' : '#ff4444'} />
          <StatsCard label="Win Rate" value={`${stats.winRate}%`} />
          <StatsCard label="Best Trade" value={stats.bestTrade ? `$${stats.bestTrade.pnl.toFixed(2)}` : 'N/A'} color="#00ff88" />
        </div>
      )}

      <TradeTable trades={trades} onDelete={handleDelete} />
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0f0f0f', padding: '24px', color: '#fff' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { color: '#00ff88', margin: 0 },
  welcome: { color: '#888', margin: 0 },
  headerButtons: { display: 'flex', gap: '12px' },
  addBtn: { padding: '10px 20px', background: '#00ff88', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
  logoutBtn: { padding: '10px 20px', background: '#2a2a2a', border: '1px solid #333', borderRadius: '8px', color: '#fff', cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
};
