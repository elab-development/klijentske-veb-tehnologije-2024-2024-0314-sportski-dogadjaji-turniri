import React from 'react';
import { Link } from 'react-router-dom';

export const Navigacija: React.FC = () => {
  return (
    <nav className="navigacija" style={{
      display: 'flex',
      gridTemplateColumns: '1fr auto 1fr',
      verticalAlign: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      marginBottom: '0px'
    }}>
      <div className="logo" style={{ fontSize: '20px', fontWeight: 'bold', justifySelf: 'start' }}>
        🏆 Sportski Dogadjaji 🏆
      </div>
      <div className="stranice" style={{ display: 'flex', gap: '20px', justifySelf: 'center' }}>
        <Link to="/pocetna" style={{ color: '#ffffff', textDecoration: 'none' }}>Početna</Link>
        <Link to="/turniri" style={{ color: '#ffffff', textDecoration: 'none' }}>🏆 Turniri</Link>
        <Link to="/kreiraj-turnir" style={{ color: '#ffffff', textDecoration: 'none' }}>➕ Kreiraj</Link>
        <Link to="/profil" style={{ color: '#ffffff', textDecoration: 'none' }}>👤 Profil</Link>

      </div>
      <div className="autentifikacija" style={{ justifySelf: 'end' }}>
        <Link to="/prijava" style={{
          color: '#ffffff',
          backgroundColor: '#2563eb',
          padding: '8px 16px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer'
        }}>
          ➡️ Prijava
        </Link>
      </div>
    </nav>
  );
}