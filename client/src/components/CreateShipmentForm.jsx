import { useState } from 'react';
import api from '../services/api';

const INITIAL_STATE = {
    sender: '',
    receiver: '',
    origin: '',
    destination: '',
};

function CreateShipmentForm({ onCreated }) {
    const [form, setForm] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError(null);
        setSuccess(false);
    };

    const validate = () => {
        const { sender, receiver, origin, destination } = form;
        if (!sender.trim()) return 'Sender is required';
        if (!receiver.trim()) return 'Receiver is required';
        if (!origin.trim()) return 'Origin is required';
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
            setTimeout(() => setSuccess(false), 5000);
            onCreated();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create shipment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <div style={styles.iconBox}>
                    <span className="material-symbols-outlined" style={styles.headerIcon}>
                        local_shipping
                    </span>
                </div>
                <div>
                    <h2 style={styles.title}>Create New Shipment</h2>
                    <p style={styles.subtitle}>Fill in the details to schedule a new delivery</p>
                </div>
            </div>

            <div style={styles.formGrid}>
                <div style={styles.section}>
                    <label style={styles.sectionLabel}>Sender Information</label>
                    <Field
                        name="sender"
                        value={form.sender}
                        onChange={handleChange}
                        placeholder="Sender Name"
                    />
                    <Field
                        name="origin"
                        value={form.origin}
                        onChange={handleChange}
                        placeholder="Origin City/Country"
                    />
                </div>

                <div style={styles.section}>
                    <label style={styles.sectionLabel}>Receiver Information</label>
                    <Field
                        name="receiver"
                        value={form.receiver}
                        onChange={handleChange}
                        placeholder="Receiver Name"
                    />
                    <Field
                        name="destination"
                        value={form.destination}
                        onChange={handleChange}
                        placeholder="Destination City/Country"
                    />
                </div>
            </div>

            {error && (
                <div style={styles.errorToast}>
                    <span className="material-symbols-outlined" style={styles.errorIcon}>
                        error
                    </span>
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div style={styles.successToast}>
                    <span className="material-symbols-outlined" style={styles.successIcon}>
                        check_circle
                    </span>
                    <span>Shipment created successfully!</span>
                </div>
            )}

            <div style={styles.footer}>
                <button
                    style={styles.discardButton}
                    onClick={() => setForm(INITIAL_STATE)}
                    type="button"
                >
                    Discard
                </button>
                <button
                    style={{
                        ...styles.submitButton,
                        opacity: loading ? 0.6 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    <span className="material-symbols-outlined" style={styles.buttonIcon}>
                        add
                    </span>
                    {loading ? 'Creating...' : 'Create Shipment'}
                </button>
            </div>
        </div>
    );
}

function Field({ name, value, onChange, placeholder }) {
    return (
        <input
            style={styles.input}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

const styles = {
    card: {
        background: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '40px',
        marginBottom: '40px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
        maxWidth: '900px',
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '40px',
    },

    iconBox: {
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'rgba(79, 140, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerIcon: {
        fontSize: '32px',
        color: '#4F8CFF',
    },

    title: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#F3F4F6',
        marginBottom: '4px',
        letterSpacing: '-0.01em',
    },

    subtitle: {
        fontSize: '14px',
        color: '#9CA3AF',
    },

    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        marginBottom: '32px',
    },

    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },

    sectionLabel: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#F3F4F6',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },

    input: {
        padding: '14px 20px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        fontSize: '14px',
        color: '#F3F4F6',
        outline: 'none',
        transition: 'all 0.2s ease',
    },

    errorToast: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        background: 'rgba(248, 113, 113, 0.1)',
        border: '1px solid rgba(248, 113, 113, 0.2)',
        borderRadius: '12px',
        color: '#F87171',
        fontSize: '14px',
        marginBottom: '24px',
    },

    errorIcon: {
        fontSize: '20px',
        fontVariationSettings: "'FILL' 1",
    },

    successToast: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        background: 'rgba(45, 212, 191, 0.1)',
        border: '1px solid rgba(45, 212, 191, 0.2)',
        borderRadius: '12px',
        color: '#2DD4BF',
        fontSize: '14px',
        marginBottom: '24px',
    },

    successIcon: {
        fontSize: '20px',
        fontVariationSettings: "'FILL' 1",
    },

    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '16px',
        paddingTop: '32px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    },

    discardButton: {
        padding: '14px 32px',
        background: 'transparent',
        border: 'none',
        borderRadius: '16px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#9CA3AF',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },

    submitButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 48px',
        background: '#4F8CFF',
        border: 'none',
        borderRadius: '16px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(79, 140, 255, 0.2)',
    },

    buttonIcon: {
        fontSize: '20px',
    },
};

export default CreateShipmentForm;