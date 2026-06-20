import React from 'react';
import { Link } from 'react-router-dom';

export const Pocetna: React.FC = () => {
  return (
    <div style={{ width: '100%', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <div style={{
        backgroundImage: 'linear-gradient(135deg, #1e40af, #3b82f6, #4f46e5)',
        color: '#ffffff',
        textAlign: 'center',
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <h1 style={{ fontSize: '40px', fontWeight: '800', margin: 0, maxWidth: '800px', lineHeight: '1.2', color: '#ffffff' }}>
          Organizujte i učestvujte u sportskim događajima
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, margin: 0, maxWidth: '600px' }}>
          Pridružite se najvećoj platformi za organizaciju lokalnih i regionalnih turnira
        </p>
        <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
          <Link to="/turniri" style={{ backgroundColor: '#ffffff', color: '#2563eb', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>
            Pregledaj turnire →
          </Link>
          <Link to="/kreiraj-turnir" style={{ backgroundColor: '#2563eb', color: '#ffffff', border: '2px solid #ffffff', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>
            Kreiraj turnir
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          {[
            { ikonica: '🏆', broj: '48', tekst: 'Aktivnih turnira' },
            { ikonica: '👥', broj: '1,234', tekst: 'Učesnika' },
            { ikonica: '🏅', broj: '156', tekst: 'Završenih takmičenja' },
            { ikonica: '⭐', broj: '4.8', tekst: 'Prosečna ocena' }
          ].map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#2563eb', marginBottom: '16px' }}>
                {stat.ikonica}
              </div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>{stat.broj}</div>
              <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>{stat.tekst}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Istaknuti turniri</h2>
              <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '15px' }}>Najbolji nadolazeći sportski događaji</p>
            </div>
            <Link to="/turniri" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>
              Vidi sve →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {[
              {
                id: 1,
                sport: 'Fudbal',
                naziv: 'Letnji Fudbalski Turnir 2026',
                lokacija: 'Beograd, Srbija',
                datum: '15-20 Jun 2026',
                ucesnici: '16/16 timova',
                status: 'Otvorene prijave',
                slika: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500'
              },
              {
                id: 2,
                sport: 'Košarka',
                naziv: 'Košarkaška Liga - Prolećna Sezona',
                lokacija: 'Novi Sad, Srbija',
                datum: '1-30 Jun 2026',
                ucesnici: '8/12 timova',
                status: 'Otvorene prijave',
                slika: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&q=80'
              },
              {
                id: 3,
                sport: 'Tenis',
                naziv: 'Teniski Open Šampionat',
                lokacija: 'Niš, Srbija',
                datum: '10-15 Jul 2026',
                ucesnici: '32/32 timova',
                status: 'Popunjeno',
                slika: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&q=80'
              }
            ].map((turnir) => (
              <div key={turnir.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <img src={turnir.slika} alt={turnir.naziv} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: '12px', left: '12px', backgroundColor: '#2563eb', color: '#ffffff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                    {turnir.sport}
                  </span>
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
                      <Link to={`/turnir/${turnir.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {turnir.naziv}
                      </Link>
                    </h3>
                    <div style={{ fontSize: '14px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <p style={{ margin: 0 }}>📍 {turnir.lokacija}</p>
                      <p style={{ margin: 0 }}>📅 {turnir.datum}</p>
                      <p style={{ margin: 0 }}>👥 {turnir.ucesnici}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '13px', backgroundColor: turnir.status === 'Otvorene prijave' ? '#e6f4ea' : '#f1f5f9', color: turnir.status === 'Otvorene prijave' ? '#137333' : '#64748b', fontWeight: '600' }}>
                      {turnir.status}
                    </span>
                    <Link to={`/turnir/${turnir.id}`} style={{ color: '#2563eb', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none' }}>➔</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Kako funkcioniše?</h2>
            <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '16px' }}>Samo tri koraka do vašeg prvog turnira</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', width: '100%' }}>
            {[
              { broj: '1', naslov: 'Registrujte se', tekst: 'Kreirajte besplatan nalog i pridružite se našoj zajednici' },
              { broj: '2', naslov: 'Pronađite turnir', tekst: 'Pretražite dostupne turnire ili kreirajte svoj' },
              { broj: '3', naslov: 'Učestvujte', tekst: 'Prijavite se i uživajte u takmičenju' }
            ].map((korak, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
                  {korak.broj}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>{korak.naslov}</h3>
                <p style={{ fontSize: '15px', color: '#64748b', margin: 0, maxWidth: '250px', lineHeight: '1.5' }}>{korak.tekst}</p>
              </div>
            ))}
          </div>

          <Link to="/prijava" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '16px', marginTop: '10px' }}>
            Počnite danas →
          </Link>
        </div>
      </div>
    </div>
  );
};