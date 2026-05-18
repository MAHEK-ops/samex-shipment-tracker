const STATUSES = ['All', 'Pending', 'Picked Up', 'In Transit', 'Delivered', 'Cancelled'];

function FilterBar({ search, status, onSearchChange, onStatusChange, onClear }) {
  const hasActiveFilters = search || status !== 'All';

  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search by destination..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select
          style={styles.select}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button style={styles.clearButton} onClick={onClear}>
          ✕ Clear Filters
        </button>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    backgroundColor: '#ffffff',
    padding: '14px 18px',
    borderRadius: '10px',
    marginBottom: '16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
    flexWrap: 'wrap',
  },
  left: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    padding: '7px 12px',
    backgroundColor: '#f9fafb',
  },
  searchIcon: {
    fontSize: '14px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    backgroundColor: 'transparent',
    color: '#1a1a2e',
    width: '220px',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    fontSize: '14px',
    backgroundColor: '#f9fafb',
    color: '#1a1a2e',
    cursor: 'pointer',
  },
  clearButton: {
    padding: '7px 14px',
    backgroundColor: '#fff5f5',
    color: '#c53030',
    border: '1px solid #fed7d7',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default FilterBar;