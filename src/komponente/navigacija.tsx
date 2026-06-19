import React from 'react';

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
          <a href="/pocetna" style={{ color: '#ffffff', textDecoration: 'none' }}>Početna</a>
          <a href="/turniri" style={{ color: '#ffffff', textDecoration: 'none' }}>🏆 Turniri</a>
          <a href="/kreiraj-turnir" style={{ color: '#ffffff', textDecoration: 'none' }}>➕ Kreiraj</a>
          <a href="/profil" style={{ color: '#ffffff', textDecoration: 'none' }}>👤 Profil</a>
        </div>
        <div className="autentifikacija">
            <span style={{cursor: 'pointer' }}>Prijava</span>
        </div>
      </nav>
    );
}