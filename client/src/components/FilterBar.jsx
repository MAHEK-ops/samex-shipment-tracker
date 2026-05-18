const STATUSES = [
  'All',
  'Pending',
  'Picked Up',
  'In Transit',
  'Delivered',
  'Cancelled',
];

const SORTS = ['Newest', 'Oldest'];

function FilterBar({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onClear,
}) {
  const hasActiveFilters = search || status !== 'All' || sort !== 'Newest';

  return (
    <div style={styles.wrapper}>
      <div style={styles.grid}>
        <div style={styles.searchWrapper}>
          <span className="material-symbols-outlined" style={styles.searchIcon}>
            search
          </span>
          <input
            style={styles.searchInput}
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
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All Statuses' : s}
            </option>
          ))}
        </select>

        <select
          style={styles.select}
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {SORTS.map((s) => (
            <option key={s} value={s}>
              Sort by: {s}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button style={styles.clearButton} onClick={onClear}>
            Clear Filters
          </button>
        )}
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
    padding: '20px',
    borderRadius: '16px',
    marginBottom: '32px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },

  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

  searchIcon: {
    position: 'absolute',
    left: '16px',
    color: '#9CA3AF',
    fontSize: '20px',
    pointerEvents: 'none',
  },

  searchInput: {
    width: '100%',
    padding: '12px 16px 12px 48px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    fontSize: '14px',
    color: '#F3F4F6',
    outline: 'none',
    transition: 'all 0.2s ease',
  },

  select: {
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    fontSize: '14px',
    color: '#F3F4F6',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: '40px',
  },

  clearButton: {
    padding: '12px 24px',
    background: 'transparent',
    border: 'none',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4F8CFF',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      background: 'rgba(79, 140, 255, 0.1)',
    },
  },
};

export default FilterBar;