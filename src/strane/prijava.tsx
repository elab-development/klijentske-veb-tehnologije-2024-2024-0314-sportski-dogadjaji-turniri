import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PoljeZaUnos } from '../komponente/poljeZaUnos';
import { Dugme } from '../komponente/dugme';

export const Prijava: React.FC = () => {
    const [email, setEmail] = useState('');
    const [lozinka, setLozinka] = useState('');
    const [zapamtiMe, setZapamtiMe] = useState(false);
    const [greska, setGreska] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Preuzimanje svih registrovanih korisnika
        const sviKorisnici = JSON.parse(localStorage.getItem('korisnici') || '[]');
        
        // Provera da li se podaci podudaraju
        const pronadjeniKorisnik = sviKorisnici.find(
            (k: any) => k.email === email && k.lozinka === lozinka
        );

        if (!pronadjeniKorisnik) {
            setGreska('Pogrešan email ili lozinka!');
            return;
        }

        // Čuvanje ulogovanog korisnika u sesiju (localStorage)
        localStorage.setItem('ulogovaniKorisnik', JSON.stringify(pronadjeniKorisnik));
        
        setGreska('');
        alert('Uspešno ste se prijavili!');
        navigate('/profil');
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

            {/* Glavna kartica za prijavu */}
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

                {/* Okrugli bedž sa trofejom */}
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

                {/* Naslovna sekcija */}
                <h2 style={{ margin: '0 0 8px 0', fontSize: '26px', fontWeight: '700', color: '#0f172a' }}>
                    Dobrodošli nazad
                </h2>
                <p style={{ margin: '0 0 30px 0', fontSize: '14px', color: '#64748b' }}>
                    Prijavite se na svoj nalog
                </p>

                {/* Forma */}
                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>

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

                    {/* Zapamti me i Zaboravljena lozinka */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '25px',
                        fontSize: '13px'
                    }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#475569', fontWeight: '500' }}>
                            <input
                                type="checkbox"
                                checked={zapamtiMe}
                                onChange={(e) => setZapamtiMe(e.target.checked)}
                                style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
                            />
                            Zapamti me
                        </label>
                        <a href="#" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
                            Zaboravili ste lozinku?
                        </a>
                    </div>

                    {greska && (
                        <p style={{ color: '#ef4444', fontSize: '13px', margin: '-15px 0 15px 0', fontWeight: '500' }}>
                            {greska}
                        </p>
                    )}

                    {/* Dugme za prijavu */}
                    <Dugme
                        labela="Prijavite se"
                        tip="submit"
                        vrsta="primarno"
                        stil={{ width: '100%', padding: '12px' }}
                    />

                </form>

                {/* Razdelnik */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '25px 0',
                    color: '#cbd5e1',
                    fontSize: '12px'
                }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                    <span style={{ padding: '0 10px', color: '#94a3b8', fontWeight: '500' }}>ili</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                </div>

                {/* Link za registraciju */}
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    Nemate nalog?{' '}
                    <Link to="/registracija" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
                        Registrujte se
                    </Link>
                </p>

            </div>
        </div>
    );
};
