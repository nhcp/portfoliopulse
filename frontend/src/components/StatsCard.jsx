export default function StatsCard({ label, value, color = '#fff' }) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{label}</p>
      <p style={{ ...styles.value, color }}>{value}</p>
    </div>
  );
}

const styles = {
  card: { background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a2a' },
  label: { color: '#888', margin: 0, fontSize: '14px' },
  value: { margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold' },
};
