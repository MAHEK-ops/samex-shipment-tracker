function StatsStrip({ shipments }) {
  const stats = {
    Total: shipments.length,

    Pending:
      shipments.filter(
        s => s.status === 'Pending'
      ).length,

    'Picked Up':
      shipments.filter(
        s => s.status === 'Picked Up'
      ).length,

    'In Transit':
      shipments.filter(
        s => s.status === 'In Transit'
      ).length,

    Delivered:
      shipments.filter(
        s => s.status === 'Delivered'
      ).length,

    Cancelled:
      shipments.filter(
        s => s.status === 'Cancelled'
      ).length,
  };

  const CARD_STYLES = {
    Total: {
      accent: '#1a1a2e',
      icon: '📦',
    },

    Pending: {
      accent: '#856404',
      icon: '🕐',
    },

    'Picked Up': {
      accent: '#004085',
      icon: '📍',
    },

    'In Transit': {
      accent: '#155724',
      icon: '🚚',
    },

    Delivered: {
      accent: '#0c5460',
      icon: '✅',
    },

    Cancelled: {
      accent: '#721c24',
      icon: '❌',
    },
  };

  return (
    <div style={styles.strip}>
      {Object.entries(stats).map(
        ([label, count]) => {
          const { accent, icon } =
            CARD_STYLES[label];

          return (
            <div
              key={label}
              style={styles.card}
            >
              <div style={styles.iconRow}>
                <span>{icon}</span>

                <span
                  style={{
                    ...styles.count,
                    color: accent,
                  }}
                >
                  {count}
                </span>
              </div>

              <div style={styles.label}>
                {label}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

const styles = {
  strip: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(140px,1fr))',
    gap: '14px',
    marginBottom: '24px',
  },

  card: {
    background: '#fff',
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
  },

  iconRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  count: {
    fontSize: '26px',
    fontWeight: '800',
  },

  label: {
    fontSize: '12px',
    color: '#718096',
    textTransform: 'uppercase',
  },
};

export default StatsStrip;