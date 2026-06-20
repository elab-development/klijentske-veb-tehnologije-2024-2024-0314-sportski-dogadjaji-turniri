import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PoljeZaUnos } from '../komponente/poljeZaUnos';
import { Dugme } from '../komponente/dugme';

export const Registracija: React.FC = () => {
  const [ime, setIme] = useState('');
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');
  const [potvrdaLozinke, setPotvrdaLozinke] = useState('');
  const [greska, setGreska] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lozinka !== potvrdaLozinke) {
      setGreska('Lozinke se ne podudaraju!');
      return;
    }


    const sviKorisnici = JSON.parse(localStorage.getItem('korisnici') || '[]');
    const korisnikPostoji = sviKorisnici.some((k: any) => k.email === email);

    if (korisnikPostoji) {
      setGreska('Korisnik sa ovim email-om već postoji!');
      return;
    }


    const noviKorisnik = { ime, email, lozinka };
    sviKorisnici.push(noviKorisnik);
    localStorage.setItem('korisnici', JSON.stringify(sviKorisnici));

    setGreska('');
    alert('Registracija uspešna! Preusmeravamo vas na prijavu.');
    navigate('/prijava');
  };

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>


      <div style={{
        width: '100%',
        maxWidth: '450px',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '40px 30px',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>


        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#eff6ff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          color: '#2563eb',
          marginBottom: '20px'
        }}>
          🏆
        </div>


        <h2 style={{ margin: '0 0 8px 0', fontSize: '26px', fontWeight: '700', color: '#0f172a' }}>
          Kreirajte nalog
        </h2>
        <p style={{ margin: '0 0 30px 0', fontSize: '14px', color: '#64748b' }}>
          Pridružite se našoj sportskoj zajednici
        </p>


        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>

          <PoljeZaUnos
            labela="Ime i prezime"
            tip="text"
            vrednost={ime}
            promena={(e) => setIme(e.target.value)}
            pocetniTekst="Petar Petrović"
            obavezno
          />

          <PoljeZaUnos
            labela="Email adresa"
            tip="email"
            vrednost={email}
            promena={(e) => setEmail(e.target.value)}
            pocetniTekst="petarpetrovic@email.com"
            obavezno
          />

          <PoljeZaUnos
            labela="Lozinka"
            tip="password"
            vrednost={lozinka}
            promena={(e) => setLozinka(e.target.value)}
            pocetniTekst="••••••••"
            obavezno
          />

          <PoljeZaUnos
            labela="Potvrdite lozinku"
            tip="password"
            vrednost={potvrdaLozinke}
            promena={(e) => setPotvrdaLozinke(e.target.value)}
            pocetniTekst="••••••••"
            obavezno
          />

          {greska && (
            <p style={{ color: '#ef4444', fontSize: '13px', margin: '-10px 0 15px 0', fontWeight: '500' }}>
              {greska}
            </p>
          )}


          <Dugme
            labela="Registrujte se"
            tip="submit"
            vrsta="primarno"
            stil={{ width: '100%', padding: '12px', marginTop: '10px' }}
          />

        </form>


        <p style={{ margin: '25px 0 0 0', fontSize: '13px', color: '#64748b' }}>
          Već imate nalog?{' '}
          <Link to="/prijava" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
            Prijavite se
          </Link>
        </p>

      </div>
    </div>
  );
};
