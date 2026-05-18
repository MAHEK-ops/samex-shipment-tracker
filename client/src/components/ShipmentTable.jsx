import StatusBadge from './StatusBadge';

function ShipmentTable({ shipments, onStatusChange }) {
  if (shipments.length === 0) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.empty}>
          <span className="material-symbols-outlined" style={styles.emptyIcon}>
            inbox
          </span>
          <p style={styles.emptyText}>No shipments found</p>
          <p style={styles.emptySubtext}>Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Tracking ID</th>
              <th style={styles.th}>Sender</th>
              <th style={styles.th}>Receiver</th>
              <th style={styles.th}>Route</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Created Date</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((s) => (
              <tr key={s.id} style={styles.row}>
                <td style={styles.td}>
                  <span style={styles.trackingId}>{s.trackingId}</span>
                </td>

                <td style={styles.td}>
                  <span style={styles.regularText}>{s.sender}</span>
                </td>

                <td style={styles.td}>
                  <span style={styles.regularText}>{s.receiver}</span>
                </td>

                <td style={styles.td}>
                  <span style={styles.route}>
                    {s.origin} → {s.destination}
                  </span>
                </td>

                <td style={styles.td}>
                  <StatusBadge status={s.status} />
                </td>

                <td style={styles.td}>
                  <span style={styles.dateText}>
                    {new Date(s.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </td>

                <td style={{ ...styles.td, textAlign: 'right' }}>
                  <StatusDropdown shipment={s} onStatusChange={onStatusChange} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TRANSITIONS = {
  Pending: ['Picked Up', 'Cancelled'],
  'Picked Up': ['In Transit', 'Cancelled'],
  'In Transit': ['Delivered', 'Cancelled'],
  Delivered: [],
  Cancelled: [],
};

function StatusDropdown({ shipment, onStatusChange }) {
  const options = TRANSITIONS[shipment.status] || [];

  if (options.length === 0) {
    return <span style={styles.finalState}>Final State</span>;
  }

  return (
    <div style={styles.actionsWrapper}>
      <button
        style={styles.actionButton}
        onClick={(e) => {
          e.currentTarget.nextElementSibling.style.display =
            e.currentTarget.nextElementSibling.style.display === 'block'
              ? 'none'
              : 'block';
        }}
      >
        <span className="material-symbols-outlined" style={styles.moreIcon}>
          more_vert
        </span>
      </button>
      <div style={styles.dropdown}>
        {options.map((opt) => (
          <button
            key={opt}
            style={styles.dropdownItem}
            onClick={() => {
              onStatusChange(shipment.id, opt);
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
  },

  tableContainer: {
    overflowX: 'auto',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },

  headerRow: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },

  th: {
    padding: '20px 24px',
    textAlign: 'left',
    color: '#9CA3AF',
    fontWeight: '600',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  row: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'background 0.2s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.03)',
    },
  },

  td: {
    padding: '20px 24px',
    verticalAlign: 'middle',
  },

  trackingId: {
    fontWeight: '600',
    fontSize: '12px',
    color: '#4F8CFF',
    fontFamily: 'monospace',
    letterSpacing: '0.05em',
  },

  regularText: {
    fontSize: '14px',
    color: '#F3F4F6',
  },

  route: {
    fontSize: '14px',
    color: '#9CA3AF',
    fontWeight: '500',
  },

  dateText: {
    fontSize: '14px',
    color: '#9CA3AF',
  },

  actionsWrapper: {
    position: 'relative',
    display: 'inline-block',
  },

  actionButton: {
    padding: '8px',
    background: 'transparent',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  moreIcon: {
    fontSize: '20px',
    color: '#9CA3AF',
  },

  dropdown: {
    display: 'none',
    position: 'absolute',
    right: 0,
    top: '100%',
    marginTop: '4px',
    background: '#1d1f27',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
    minWidth: '160px',
    zIndex: 10,
    overflow: 'hidden',
  },

  dropdownItem: {
    width: '100%',
    padding: '12px 16px',
    background: 'transparent',
    border: 'none',
    color: '#F3F4F6',
    fontSize: '14px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },

  finalState: {
    padding: '8px 16px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#9CA3AF',
    fontSize: '12px',
    fontWeight: '600',
  },

  empty: {
    padding: '80px 40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },

  emptyIcon: {
    fontSize: '48px',
    color: '#4B5563',
  },

  emptyText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#9CA3AF',
  },

  emptySubtext: {
    fontSize: '14px',
    color: '#6B7280',
  },
};

export default ShipmentTable;