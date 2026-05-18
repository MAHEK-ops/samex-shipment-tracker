import { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchShipments();
  }, []);

  if (loading) return <p style={{ padding: '24px' }}>Loading shipments...</p>;
  if (error)   return <p style={{ padding: '24px', color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2 style={styles.pageTitle}>All Shipments</h2>
      <p style={styles.count}>{shipments.length} shipments found</p>
      {/* Table, Form, Filters coming in next phases */}
    </div>
  );
}

const styles = {
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