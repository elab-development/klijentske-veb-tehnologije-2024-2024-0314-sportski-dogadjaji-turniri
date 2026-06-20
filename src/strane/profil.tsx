import React, { useState } from 'react';

export const Profil: React.FC = () => {
  const [filter, setFilter] = useState<'Svi' | 'Predstojeći' | 'Završeni'>('Svi');

  const turniri = [
    { id: 1, naziv: "Letnji Fudbalski Turnir 2026", sport: "Fudbal", datum: "15-20 Jun 2026", status: "Predstojeće" },
    { id: 2, naziv: "Košarkaška Liga - Zimska Sezona", sport: "Košarka", datum: "10-15 Apr 2026", rez: "2. mesto", status: "Završeno" },
    { id: 3, naziv: "Prolećni Teniski Turnir", sport: "Tenis", datum: "20-25 Mar 2026", rez: "1. mesto", status: "Završeno" }
  ];

  const filtrirani = turniri.filter(t =>
    filter === 'Svi' ||
    (filter === 'Predstojeći' && t.status === 'Predstojeće') ||
    (filter === 'Završeni' && t.status === 'Završeno')
  );

  return (
    // Spoljašnji kontejner koji se širi 100% preko celog ekrana (isto kao turniri i kreiraj)
    <div style={{ width: '100%', backgroundColor: '#ffffff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', boxSizing: 'border-box', textAlign: 'left' }}>

      {/* Unutrašnji kontejner koji ograničava širinu i centrira sadržaj */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>

        {/* Profil Kartica */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#ffffff', marginBottom: '25px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ height: '120px', background: 'linear-gradient(to right, #1d4ed8, #3b82f6)' }}></div>
          <div style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center', marginTop: '-50px', flexWrap: 'wrap' }}>
            {/* Facebook-like default profile placeholder */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" 
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                border: '4px solid #ffffff', 
                objectFit: 'cover', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                backgroundColor: '#f1f5f9'
              }} 
              alt="Marko Marković" 
            />
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h2 style={{ margin: '40px 0 5px 0', fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Marko Marković</h2>
              <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>📧 marko.markovic@email.com | 📍 Beograd | 📅 Januar 2025</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#334155', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Podešavanja</button>
              <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#fee2e2', color: '#ef4444', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Odjavi se</button>
            </div>
          </div>
        </div>

        {/* Statistika */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
          {[
            { l: 'Turniri', v: 12, i: '🏆' },
            { l: 'Pobede', v: 8, i: '🎖️' },
            { l: 'Organizovano', v: 3, i: '📅' }
          ].map((s, idx) => (
            <div key={idx} style={{ flex: 1, minWidth: '150px', padding: '15px', border: '1px solid #cbd5e1', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div>
                <span style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>{s.l}</span>
                <h3 style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>{s.v}</h3>
              </div>
              <span style={{ fontSize: '24px' }}>{s.i}</span>
            </div>
          ))}
        </div>

        {/* Moji turniri */}
        <div style={{ border: '1px solid #cbd5e1', borderRadius: '16px', padding: '20px', backgroundColor: '#ffffff', marginBottom: '25px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Moji turniri</h3>
            <div style={{ display: 'flex', gap: '5px', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '6px' }}>
              {(['Svi', 'Predstojeći', 'Završeni'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    border: 'none',
                    padding: '5px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    backgroundColor: filter === f ? '#2563eb' : 'transparent',
                    color: filter === f ? '#ffffff' : '#64748b',
                    transition: 'all 0.2s'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtrirani.map(t => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', border: '1px solid #f1f5f9', borderRadius: '8px', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>{t.naziv}</h4>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>
                    <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 6px', borderRadius: '4px', marginRight: '8px', fontWeight: '600', fontSize: '11px' }}>{t.sport}</span>
                    📅 {t.datum}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {t.rez && <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>🏅 {t.rez}</span>}
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', backgroundColor: t.status === 'Predstojeće' ? '#f1f5f9' : '#e6f4ea', color: t.status === 'Predstojeće' ? '#475569' : '#137333' }}>{t.status}</span>
                </div>
              </div>
            ))}
            {filtrirani.length === 0 && (
              <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '14px' }}>Nema turnira za prikaz.</div>
            )}
          </div>
        </div>

        {/* Dostignuća */}
        <div>
          <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Dostignuća</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
            {[
              { t: 'Prvi turnir', d: 'Jan 2025', i: '🏆', b: '#fef08a', bg: '#fffdf5', c: '#854d0e' },
              { t: '10 turnira', d: 'Apr 2026', i: '🎖️', b: '#bfdbfe', bg: '#eff6ff', c: '#1e40af' },
              { t: 'Prva pobeda', d: 'Mar 2026', i: '🌱', b: '#bbf7d0', bg: '#f0fdf4', c: '#166534' },
              { t: '50 turnira', d: 'Zaključano', i: '🔒', b: '#e2e8f0', bg: '#f8fafc', c: '#64748b', l: true }
            ].map((d, i) => (
              <div key={i} style={{ border: `2px solid ${d.b}`, backgroundColor: d.bg, padding: '15px', borderRadius: '12px', textAlign: 'center', opacity: d.l ? 0.6 : 1, boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                <span style={{ fontSize: '24px' }}>{d.i}</span>
                <h4 style={{ margin: '8px 0 2px 0', fontSize: '14px', fontWeight: '600', color: d.c }}>{d.t}</h4>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{d.d}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};