import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = isRegister ? await register(form) : await login(form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>PortfolioPulse</h1>
        <p style={styles.subtitle}>Your Crypto Trading Journal</p>
        <h2 style={styles.formTitle}>{isRegister ? 'Create Account' : 'Login'}</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input style={styles.input} placeholder="Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} required />
          )}
          <input style={styles.input} placeholder="Email" type="email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input style={styles.input} placeholder="Password" type="password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button style={styles.button} type="submit">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p style={styles.toggle}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <span style={styles.link} onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? ' Login' : ' Register'}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f0f' },
  card: { background: '#1a1a1a', padding: '40px', borderRadius: '12px', width: '360px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' },
  title: { color: '#00ff88', margin: 0, fontSize: '28px' },
  subtitle: { color: '#888', marginTop: '4px', marginBottom: '24px' },
  formTitle: { color: '#fff', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', marginBottom: '12px', background: '#2a2a2a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#00ff88', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
  error: { color: '#ff4444', marginBottom: '12px' },
  toggle: { color: '#888', marginTop: '16px', textAlign: 'center' },
  link: { color: '#00ff88', cursor: 'pointer' },
};
