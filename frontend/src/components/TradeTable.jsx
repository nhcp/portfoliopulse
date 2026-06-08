export default function TradeTable({ trades, onDelete }) {
  if (trades.length === 0) {
    return <div style={styles.empty}>No trades yet. Click "+ Add Trade" to get started.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Trade History</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            {['Date', 'Coin', 'Type', 'Buy Price', 'Sell Price', 'Amount', 'P&L', 'Notes', ''].map(h => (
              <th key={h} style={styles.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trades.map(trade => (
            <tr key={trade._id} style={styles.tr}>
              <td style={styles.td}>{new Date(trade.date).toLocaleDateString()}</td>
              <td style={styles.td}>{trade.coin}</td>
              <td style={styles.td}>
                <span style={{ ...styles.badge, background: trade.type === 'buy' ? '#1a3a2a' : '#3a1a1a', color: trade.type === 'buy' ? '#00ff88' : '#ff4444' }}>
                  {trade.type.toUpperCase()}
                </span>
              </td>
              <td style={styles.td}>${trade.buyPrice}</td>
              <td style={styles.td}>{trade.sellPrice ? `$${trade.sellPrice}` : '-'}</td>
              <td style={styles.td}>{trade.amount}</td>
              <td style={{ ...styles.td, color: trade.pnl >= 0 ? '#00ff88' : '#ff4444' }}>
                {trade.pnl !== 0 ? `$${trade.pnl.toFixed(2)}` : '-'}
              </td>
              <td style={styles.td}>{trade.notes || '-'}</td>
              <td style={styles.td}>
                <button style={styles.deleteBtn} onClick={() => onDelete(trade._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { background: '#1a1a1a', borderRadius: '12px', padding: '24px', border: '1px solid #2a2a2a' },
  title: { color: '#fff', marginTop: 0 },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { color: '#888', textAlign: 'left', padding: '12px', borderBottom: '1px solid #2a2a2a', fontSize: '13px' },
  tr: { borderBottom: '1px solid #1e1e1e' },
  td: { padding: '12px', color: '#fff', fontSize: '14px' },
  badge: { padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
  deleteBtn: { background: 'none', border: '1px solid #ff4444', color: '#ff4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  empty: { color: '#888', textAlign: 'center', padding: '40px', background: '#1a1a1a', borderRadius: '12px' },
};
