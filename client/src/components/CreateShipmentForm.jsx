import { useState } from 'react';
import api from '../services/api';

const INITIAL_STATE = {
  sender: '',
  receiver: '',
  origin: '',
  destination: '',
};

function CreateShipmentForm({ onCreated }) {
  const [form, setForm]       = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
    setSuccess(false);
  };

  const validate = () => {
    const { sender, receiver, origin, destination } = form;
    if (!sender.trim())      return 'Sender is required';
    if (!receiver.trim())    return 'Receiver is required';
    if (!origin.trim())      return 'Origin is required';
    if (!destination.trim()) return 'Destination is required';
    if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) {
      return 'Origin and destination cannot be the same';
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await api.post('/shipments', form);
      setForm(INITIAL_STATE);
      setSuccess(true);
      onCreated();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>➕ New Shipment</h3>

      <div style={styles.grid}>
        <Field
          label="Sender"
          name="sender"
          value={form.sender}
          onChange={handleChange}
          placeholder="e.g. Ravi Kumar"
        />
        <Field
          label="Receiver"
          name="receiver"
          value={form.receiver}
          onChange={handleChange}
          placeholder="e.g. Priya Sharma"
        />
        <Field
          label="Origin"
          name="origin"
          value={form.origin}
          onChange={handleChange}
          placeholder="e.g. Mumbai"
        />
        <Field
          label="Destination"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="e.g. Delhi"
        />
      </div>

      {error && (
        <div style={styles.error}>
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div style={styles.success}>
          ✅ Shipment created successfully!
        </div>
      )}

      <button
        style={{
          ...styles.button,
          opacity: loading ? 0.7 : 1,
        }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Shipment'}
      </button>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder }) {
  return (
    <div style={styles.fieldWrapper}>
      <label style={styles.label}>{label}</label>
      <input
        style={styles.input}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '24px',
    marginBottom: '28px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
  },
  title: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '16px',
  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#4a5568',
  },
  input: {
    padding: '9px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    fontSize: '14px',
    color: '#1a1a2e',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    marginTop: '8px',
    padding: '10px 24px',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    backgroundColor: '#fff5f5',
    color: '#c53030',
    padding: '10px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    marginBottom: '12px',
    border: '1px solid #fed7d7',
  },
  success: {
    backgroundColor: '#f0fff4',
    color: '#276749',
    padding: '10px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    marginBottom: '12px',
    border: '1px solid #c6f6d5',
  },
};

export default CreateShipmentForm;