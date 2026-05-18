import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import ShipmentTable from '../components/ShipmentTable';
import CreateShipmentForm from '../components/CreateShipmentForm';
import FilterBar from '../components/FilterBar';
import StatsStrip from '../components/StatsStrip';

function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [showForm, setShowForm]   = useState(false);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('All');

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/shipments');
      setShipments(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load shipments. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/shipments/${id}/status`, { status: newStatus });
      await fetchShipments();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update status');
    }
  };

  const handleCreated = async () => {
    await fetchShipments();
    setShowForm(false);
  };

  const handleClear = () => {
    setSearch('');
    setStatus('All');
  };

  const filtered = useMemo(() => {
    return shipments.filter(s => {
      const matchesSearch = search.trim() === '' ||
        s.destination.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [shipments, search, statusFilter]);

  useEffect(() => {
    fetchShipments();
  }, []);

  if (loading) return (
    <div style={styles.center}>
      <span style={styles.loadingText}>Loading shipments...</span>
    </div>
  );

  if (error) return (
    <div style={styles.center}>
      <div style={styles.errorBox}>
        ⚠️ {error}
        <button style={styles.retryBtn} onClick={fetchShipments}>
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Stats */}
      <StatsStrip shipments={shipments} />

      {/* Top bar */}
      <div style={styles.topBar}>
        <div>
          <h2 style={styles.pageTitle}>All Shipments</h2>
          <p style={styles.count}>
            {filtered.length === shipments.length
              ? `${shipments.length} shipments`
              : `${filtered.length} of ${shipments.length} shipments`}
          </p>
        </div>
        <button
          style={{
            ...styles.toggleButton,
            backgroundColor: showForm ? '#e53e3e' : '#1a1a2e',
          }}
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? '✕ Cancel' : '➕ New Shipment'}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <CreateShipmentForm onCreated={handleCreated} />
      )}

      {/* Filters */}
      <FilterBar
        search={search}
        status={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onClear={handleClear}
      />

      {/* Table */}
      <ShipmentTable
        shipments={filtered}
        onStatusChange={handleStatusChange}
      />

      {/* Footer */}
      <div style={styles.footer}>
        Samex Shipment Tracker • Built with Node + Express + React
      </div>
    </div>
  );
}

const styles = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px 24px',
  },
  loadingText: {
    fontSize: '15px',
    color: '#718096',
  },
  errorBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#fff5f5',
    border: '1px solid #fed7d7',
    borderRadius: '10px',
    padding: '24px 32px',
    color: '#c53030',
    fontSize: '14px',
  },
  retryBtn: {
    padding: '7px 18px',
    backgroundColor: '#c53030',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  pageTitle: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '4px',
    color: '#1a1a2e',
  },
  count: {
    color: '#718096',
    fontSize: '14px',
  },
  toggleButton: {
    padding: '9px 18px',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  footer: {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#a0aec0',
    paddingBottom: '24px',
  },
};

export default Dashboard;