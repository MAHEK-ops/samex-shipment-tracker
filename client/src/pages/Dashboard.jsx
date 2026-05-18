import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import ShipmentTable from '../components/ShipmentTable';
import CreateShipmentForm from '../components/CreateShipmentForm';
import FilterBar from '../components/FilterBar';
import StatsStrip from '../components/StatsStrip';

function Dashboard() {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatus] = useState('All');
    const [sort, setSort] = useState('Newest');
    const [toast, setToast] = useState(null)

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

    const handleStatusChange = async (
        id,
        newStatus
    ) => {

        try {

            await api.patch(
                `/shipments/${id}/status`,
                {
                    status: newStatus
                }
            );

            setToast(
                `Shipment updated to ${newStatus}`
            );

            await fetchShipments();

        } catch (err) {

            setToast(
                err.response?.data?.error
                || "Failed to update"
            );
        }

        setTimeout(() => {
            setToast(null)
        }, 3000);

    };

    const handleCreated = async () => {
        await fetchShipments();
        setShowForm(false);
    };

    const handleClear = () => {

        setSearch('');
        setStatus('All');
        setSort('Newest');

    };

    const filtered = useMemo(() => {

        let result = [...shipments];

        result = result.filter(s => {

            const matchesSearch =
                search.trim() === '' ||

                s.destination
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesStatus =
                statusFilter === "All" ||
                s.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );

        });

        result.sort((a, b) => {

            if (sort === "Newest") {

                return new Date(b.createdAt)
                    -
                    new Date(a.createdAt);

            }

            return new Date(a.createdAt)
                -
                new Date(b.createdAt);

        });

        return result;

    },
        [
            shipments,
            search,
            statusFilter,
            sort
        ]);

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
                {error}
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
                sort={sort}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onSortChange={setSort}
                onClear={handleClear}
            />

            {/* Table */}
            <ShipmentTable
                shipments={filtered}
                onStatusChange={handleStatusChange}
            />

            {/* Toast */}
            {toast && (
                <div style={styles.toast}>
                    {toast}
                </div>
            )}

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
        color: '#efeff4',
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
    toast: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#1a1a2e',
        color: '#ffffff',
        padding: '12px 18px',
        borderRadius: '8px',
        fontSize: '14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 1000,
    },
};

export default Dashboard;