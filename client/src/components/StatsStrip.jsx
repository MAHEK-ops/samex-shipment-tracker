function StatsStrip({ shipments }) {
  const stats = [
    {
      label: 'Total Shipments',
      value: shipments.length,
      icon: 'package',
      color: '#4F8CFF',
      bgColor: 'rgba(79, 140, 255, 0.1)',
    },
    {
      label: 'Pending',
      value: shipments.filter(s => s.status === 'Pending').length,
      icon: 'schedule',
      color: '#FBBF24',
      bgColor: 'rgba(251, 191, 36, 0.1)',
    },
    {
      label: 'Picked Up',
      value: shipments.filter(s => s.status === 'Picked Up').length,
      icon: 'location_on',
      color: '#60A5FA',
      bgColor: 'rgba(96, 165, 250, 0.1)',
    },
    {
      label: 'In Transit',
      value: shipments.filter(s => s.status === 'In Transit').length,
      icon: 'local_shipping',
      color: '#34D399',
      bgColor: 'rgba(52, 211, 153, 0.1)',
    },
    {
      label: 'Delivered',
      value: shipments.filter(s => s.status === 'Delivered').length,
      icon: 'check_circle',
      color: '#2DD4BF',
      bgColor: 'rgba(45, 212, 191, 0.1)',
    },
    {
      label: 'Cancelled',
      value: shipments.filter(s => s.status === 'Cancelled').length,
      icon: 'cancel',
      color: '#F87171',
      bgColor: 'rgba(248, 113, 113, 0.1)',
    },
  ];

  return (
    <div style={styles.strip}>
      {stats.map((stat) => (
        <div key={stat.label} style={styles.card}>
          <div style={{ ...styles.iconBox, backgroundColor: stat.bgColor }}>
            <span 
              className="material-symbols-outlined" 
              style={{ ...styles.icon, color: stat.color }}
            >
              {stat.icon}
            </span>
          </div>
          <div style={styles.content}>
            <p style={styles.label}>{stat.label}</p>
            <p style={styles.value}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  strip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },

  card: {
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '24px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'default',
  },

  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: '24px',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  label: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  value: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#F3F4F6',
    lineHeight: '1.2',
  },
};

export default StatsStrip;