import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    <div>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>📦</span>
            <span style={styles.logoText}>Samex</span>
            <span style={styles.logoSub}>Shipment Tracker</span>
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
    backgroundColor: '#1a1a2e',
    padding: '0 24px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  headerInner: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoIcon: {
    fontSize: '22px',
  },
  logoText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '18px',
    letterSpacing: '0.5px',
  },
  logoSub: {
    color: '#a0aec0',
    fontSize: '13px',
    fontWeight: '400',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
  },
};

export default App;