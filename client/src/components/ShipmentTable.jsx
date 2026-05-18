import StatusBadge from './StatusBadge';

function ShipmentTable({ shipments, onStatusChange }) {
  if (shipments.length === 0) {
    return (
      <div style={styles.empty}>
        No shipments found.
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Tracking ID</th>
            <th style={styles.th}>Sender</th>
            <th style={styles.th}>Receiver</th>
            <th style={styles.th}>Route</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Created</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s, i) => (
            <tr
              key={s.id}
              style={{
                ...styles.row,
                backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9fafb',
              }}
            >
              <td style={styles.td}>
                <span style={styles.trackingId}>{s.trackingId}</span>
              </td>
              <td style={styles.td}>{s.sender}</td>
              <td style={styles.td}>{s.receiver}</td>
              <td style={styles.td}>
                <span style={styles.route}>
                  {s.origin} → {s.destination}
                </span>
              </td>
              <td style={styles.td}>
                <StatusBadge status={s.status} />
              </td>
              <td style={styles.td}>
                {new Date(s.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td style={styles.td}>
                <StatusDropdown
                  shipment={s}
                  onStatusChange={onStatusChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TRANSITIONS = {
  'Pending':    ['Picked Up', 'Cancelled'],
  'Picked Up':  ['In Transit', 'Cancelled'],
  'In Transit': ['Delivered', 'Cancelled'],
  'Delivered':  [],
  'Cancelled':  [],
};

function StatusDropdown({ shipment, onStatusChange }) {
  const options = TRANSITIONS[shipment.status] || [];

  if (options.length === 0) {
    return <span style={styles.noAction}>—</span>;
  }

  return (
    <select
      style={styles.select}
      defaultValue=""
      onChange={(e) => {
        if (e.target.value) {
          onStatusChange(shipment.id, e.target.value);
          e.target.value = '';
        }
      }}
    >
      <option value="" disabled>Update</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

const styles = {
  wrapper: {
    overflowX: 'auto',
    borderRadius: '10px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  headerRow: {
    backgroundColor: '#1a1a2e',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '13px',
    whiteSpace: 'nowrap',
  },
  row: {
    borderBottom: '1px solid #e2e8f0',
    transition: 'background 0.15s',
  },
  td: {
    padding: '12px 16px',
    verticalAlign: 'middle',
  },
  trackingId: {
    fontWeight: '700',
    color: '#1a1a2e',
    fontFamily: 'monospace',
    fontSize: '13px',
  },
  route: {
    color: '#4a5568',
    fontWeight: '500',
  },
  select: {
    padding: '5px 8px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    fontSize: '13px',
    backgroundColor: '#fff',
    color: '#1a1a2e',
    cursor: 'pointer',
  },
  noAction: {
    color: '#a0aec0',
    fontSize: '18px',
  },
  empty: {
    padding: '40px',
    textAlign: 'center',
    color: '#718096',
    fontSize: '15px',
  },
};

export default ShipmentTable;