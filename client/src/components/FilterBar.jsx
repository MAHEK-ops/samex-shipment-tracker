const STATUSES = [
  'All',
  'Pending',
  'Picked Up',
  'In Transit',
  'Delivered',
  'Cancelled'
];

const SORTS = [
  'Newest',
  'Oldest',
];

function FilterBar({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onClear
}) {

  const hasActiveFilters =
    search ||
    status !== 'All' ||
    sort !== 'Newest';

  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <div style={styles.searchWrapper}>
          <span>🔍</span>

          <input
            style={styles.searchInput}
            placeholder="Search by destination..."
            value={search}
            onChange={(e)=>
              onSearchChange(e.target.value)
            }
          />
        </div>

        <select
          style={styles.select}
          value={status}
          onChange={(e)=>
            onStatusChange(e.target.value)
          }
        >
          {STATUSES.map(s=>(
            <option key={s}>
              {s==="All"
                ? "All Statuses"
                : s}
            </option>
          ))}
        </select>

        <select
          style={styles.select}
          value={sort}
          onChange={(e)=>
            onSortChange(e.target.value)
          }
        >
          {SORTS.map(s=>(
            <option key={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          style={styles.clearButton}
          onClick={onClear}
        >
          ✕ Clear Filters
        </button>
      )}
    </div>
  );
}

const styles={
  wrapper:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexWrap:'wrap',
    gap:'12px',
    padding:'14px',
    background:'#fff',
    border:'1px solid #e2e8f0',
    borderRadius:'10px',
    marginBottom:'16px'
  },

  left:{
    display:'flex',
    gap:'12px',
    flexWrap:'wrap'
  },

  searchWrapper:{
    display:'flex',
    alignItems:'center',
    gap:'8px',
    border:'1px solid #cbd5e0',
    padding:'8px 12px',
    borderRadius:'8px'
  },

  searchInput:{
    border:'none',
    outline:'none'
  },

  select:{
    padding:'8px 12px',
    borderRadius:'8px'
  },

  clearButton:{
    padding:'8px 14px'
  }
};

export default FilterBar;