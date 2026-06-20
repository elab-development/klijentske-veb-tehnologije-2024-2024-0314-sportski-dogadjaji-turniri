import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navigacija: React.FC = () => {
  const [otvoren, setOtvoren] = useState(false);

  return (
    <nav style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      padding: '15px 30px',
      borderBottom: '1px solid #333'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        width: '100%'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', justifySelf: 'start' }}>
          🏆 SportEvents
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifySelf: 'center' }} className="desktop-nav">
          <Link to="/pocetna" style={{ color: '#ffffff', textDecoration: 'none' }}>Početna</Link>
          <Link to="/turniri" style={{ color: '#ffffff', textDecoration: 'none' }}>🏆 Turniri</Link>
          <Link to="/kreiraj-turnir" style={{ color: '#ffffff', textDecoration: 'none' }}>➕ Kreiraj</Link>
          <Link to="/profil" style={{ color: '#ffffff', textDecoration: 'none' }}>👤 Profil</Link>
        </div>

        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setOtvoren(!otvoren)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '24px',
              cursor: 'pointer',
              padding: 0,
              outline: 'none'
            }}
            className="hamburger-btn"
          >
            ☰
          </button>
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
            gap: '6px'
          }} className="desktop-nav">
            ➡️ Prijava
          </Link>
        </div>
      </div>

      {otvoren && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginTop: '15px',
          borderTop: '1px solid #333',
          paddingTop: '15px'
        }}>
          <Link to="/pocetna" onClick={() => setOtvoren(false)} style={{ color: '#ffffff', textDecoration: 'none' }}>Početna</Link>
          <Link to="/turniri" onClick={() => setOtvoren(false)} style={{ color: '#ffffff', textDecoration: 'none' }}>🏆 Turniri</Link>
          <Link to="/kreiraj-turnir" onClick={() => setOtvoren(false)} style={{ color: '#ffffff', textDecoration: 'none' }}>➕ Kreiraj</Link>
          <Link to="/profil" onClick={() => setOtvoren(false)} style={{ color: '#ffffff', textDecoration: 'none' }}>👤 Profil</Link>
          <Link to="/prijava" onClick={() => setOtvoren(false)} style={{
            color: '#ffffff',
            backgroundColor: '#2563eb',
            padding: '8px 16px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            textAlign: 'center',
            display: 'block'
          }}>
            ➡️ Prijava
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}