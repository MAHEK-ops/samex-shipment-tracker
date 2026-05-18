import { useState, useEffect } from 'react';
import api from '../services/api';
import ShipmentTable from '../components/ShipmentTable';

function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

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

  useEffect(() => {
    fetchShipments();
  }, []);

  if (loading) return <p style={{ padding: '24px' }}>Loading shipments...</p>;
  if (error)   return <p style={{ padding: '24px', color: 'red' }}>{error}</p>;

  return (
    <div>
      <div style={styles.topBar}>
        <div>
          <h2 style={styles.pageTitle}>All Shipments</h2>
          <p style={styles.count}>{shipments.length} shipments found</p>
        </div>
      </div>

      <ShipmentTable
        shipments={shipments}
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
};

export default Dashboard;