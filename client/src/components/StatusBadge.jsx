const STATUS_STYLES = {
  'Pending':    { background: '#fff3cd', color: '#856404' },
  'Picked Up':  { background: '#cce5ff', color: '#004085' },
  'In Transit': { background: '#d4edda', color: '#155724' },
  'Delivered':  { background: '#d1ecf1', color: '#0c5460' },
  'Cancelled':  { background: '#f8d7da', color: '#721c24' },
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || { background: '#eee', color: '#333' };

  return (
    <span style={{ ...styles.badge, ...style }}>
      {status}
    </span>
  );
}

const styles = {
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
};

export default StatusBadge;