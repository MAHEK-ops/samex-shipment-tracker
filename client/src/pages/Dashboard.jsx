import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import ShipmentTable from '../components/ShipmentTable';
import CreateShipmentForm from '../components/CreateShipmentForm';
import FilterBar from '../components/FilterBar';

function Dashboard() {
  const [shipments, setShipments]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [showForm, setShowForm]     = useState(false);
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatus]   = useState('All');

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

  // Filter entirely on the frontend — no extra API calls needed
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

  if (loading) return <p style={{ padding: '24px' }}>Loading shipments...</p>;
  if (error)   return <p style={{ padding: '24px', color: 'red' }}>{error}</p>;

  return (
    <div>
      {/* Top bar */}
      <div style={styles.topBar}>
        <div>
          <h2 style={styles.pageTitle}>All Shipments</h2>
          <p style={styles.count}>
            {filtered.length} of {shipments.length} shipments
          </p>
        </div>
        <button
          style={styles.toggleButton}
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
    </div>
  );
}

const styles = {
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
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Dashboard;