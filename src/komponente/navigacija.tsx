import React from 'react';
import { Link } from 'react-router-dom';

export const Navigacija: React.FC = () => {
  return (
    <nav className="navigacija" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      marginBottom: '20px'
    }}>
      <div className="logo" style={{ fontSize: '20px', fontWeight: 'bold' }}>
        🏆 Sportski Dogadjaji 🏆
      </div>
      <div className="stranice" style={{ display: 'flex', gap: '20px' }}>
        <Link to="/pocetna" style={{ color: '#ffffff', textDecoration: 'none' }}>Početna</Link>
        <Link to="/turniri" style={{ color: '#ffffff', textDecoration: 'none' }}>🏆 Turniri</Link>
        <Link to="/kreiraj-turnir" style={{ color: '#ffffff', textDecoration: 'none' }}>➕ Kreiraj</Link>
        <Link to="/profil" style={{ color: '#ffffff', textDecoration: 'none' }}>👤 Profil</Link>
      </div>
      <div className="autentifikacija">
        <span style={{ cursor: 'pointer' }}>Prijava</span>
      </div>
    </nav>
  );
}