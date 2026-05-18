import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    <div>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.brandSection}>
            <div style={styles.logoRow}>
              <span className="material-symbols-outlined" style={styles.logoIcon}>
                package_2
              </span>
              <span style={styles.logo}>Samex Shipment Tracker</span>
            </div>
            <p style={styles.subtitle}>
              Track and manage shipments in real time
            </p>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <Dashboard />
      </main>
    </div>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(24, 28, 36, 0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '18px 0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },

  headerContent: {
    width: '100%',
    maxWidth: '1400px',
    margin: 'auto',
    padding: '0 32px',
  },

  brandSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  logoIcon: {
    fontSize: '28px',
    color: '#4F8CFF',
    fontVariationSettings: "'FILL' 1",
  },

  logo: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#F3F4F6',
    letterSpacing: '-0.02em',
  },

  subtitle: {
    fontSize: '13px',
    color: '#9CA3AF',
    fontWeight: '400',
    marginLeft: '38px',
  },

  main: {
    maxWidth: '1400px',
    margin: 'auto',
    padding: '40px 32px',
  },
};

export default App;