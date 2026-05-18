const STATUS_STYLES = {
  Pending: {
    background: 'rgba(251, 191, 36, 0.1)',
    color: '#FBBF24',
  },
  'Picked Up': {
    background: 'rgba(96, 165, 250, 0.1)',
    color: '#60A5FA',
  },
  'In Transit': {
    background: 'rgba(52, 211, 153, 0.1)',
    color: '#34D399',
  },
  Delivered: {
    background: 'rgba(45, 212, 191, 0.1)',
    color: '#2DD4BF',
  },
  Cancelled: {
    background: 'rgba(248, 113, 113, 0.1)',
    color: '#F87171',
  },
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || {
    background: 'rgba(156, 163, 175, 0.1)',
    color: '#9CA3AF',
  };

  return <span style={{ ...styles.badge, ...style }}>{status}</span>;
}

const styles = {
  badge: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    whiteSpace: 'nowrap',
  },
};

export default StatusBadge;