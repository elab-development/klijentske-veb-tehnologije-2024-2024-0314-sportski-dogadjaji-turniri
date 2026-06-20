import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LokacijaVreme } from '../komponente/LokacijaVreme';
import type { TurnirInterface } from '../modeli/turniri';

export const TurnirDetalji: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const idNum = parseInt(id || '1', 10);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const stored = localStorage.getItem('turniri');
    const pronadjeni = stored ? (JSON.parse(stored) as TurnirInterface[]).find(t => t.id === idNum) : null;

    const mod = idNum % 3;
    const isTenis = pronadjeni ? pronadjeni.sport === 'Tenis' : mod === 0;
    const isKosarka = pronadjeni ? pronadjeni.sport === 'Košarka' : mod === 2;

    const naziv = pronadjeni ? pronadjeni.naziv : isTenis 
        ? `Teniski Open Šampionat #${idNum}`
        : isKosarka 
        ? `Košarkaška Liga - Prolećna Sezona #${idNum}`
        : `Letnji Fudbalski Turnir 2026 #${idNum}`;

    const sport = pronadjeni ? pronadjeni.sport : isTenis ? 'Tenis' : isKosarka ? 'Košarka' : 'Fudbal';
    const status = pronadjeni ? pronadjeni.status : isTenis ? 'Popunjeno' : 'Otvorene prijave';
    const lokacija = pronadjeni ? pronadjeni.lokacija : isTenis ? 'Niš, Srbija' : isKosarka ? 'Novi Sad, Srbija' : 'Stadion FK Partizan, Beograd, Srbija';
    
    const formatujDatum = (d: Date | string | number | null | undefined) => {
        if (!d) return '';
        const dateObj = new Date(d);
        if (isNaN(dateObj.getTime())) return String(d);
        return dateObj.toLocaleDateString('sr-RS', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const datumPocetka = pronadjeni ? formatujDatum(pronadjeni.datumPocetka) : isTenis ? '10 Jul 2026' : isKosarka ? '01 Jun 2026' : '15 Jun 2026';
    const datumZavrsetka = pronadjeni ? formatujDatum(pronadjeni.datumZavrsetka) : isTenis ? '15 Jul 2026' : isKosarka ? '30 Jun 2026' : '20 Jun 2026';
    const rokPrijava = pronadjeni ? formatujDatum(new Date(new Date(pronadjeni.datumPocetka).getTime() - 5*24*60*60*1000)) : isTenis ? '05 Jul 2026' : isKosarka ? '25 Maj 2026' : '10 Jun 2026';
    const maxTimova = pronadjeni ? pronadjeni.maxTimova : isTenis ? 32 : isKosarka ? 12 : 16;
    const prijavljenoTimova = pronadjeni ? pronadjeni.prijavljenoTimova : isTenis ? 32 : isKosarka ? 8 : 16;
    const kotizacija = pronadjeni ? pronadjeni.kotizacija : isTenis ? 3000 : isKosarka ? 4000 : 5000;
    const nagradniFond = pronadjeni ? pronadjeni.nagradniFond : isTenis ? 60000 : isKosarka ? 45000 : 50000;
    const format = pronadjeni ? pronadjeni.format : isTenis ? 'Kup sistem na ispadanje' : isKosarka ? 'Ligaški sistem' : 'Grupna faza + Nokaut sistem';
    
    const slikaPozadine = pronadjeni ? pronadjeni.urlSlike : isTenis 
        ? 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200'
        : isKosarka 
        ? 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200'
        : 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200';

    const pravila = pronadjeni && pronadjeni.opis ? [pronadjeni.opis] : isTenis ? [
        'Igra se na dva dobijena seta',
        'Standardna teniska pravila i tie-break',
        'U slučaju kiše, mečevi se odlažu za naredni dan',
        'Obezbeđene su nove loptice za svaki meč'
    ] : isKosarka ? [
        'Igra se po standardnim FIBA pravilima 3x3 na jedan koš',
        'Svaki tim se sastoji od 4 igrača (3 na terenu + 1 zamena)',
        'Utakmica traje 10 minuta ili dok jedan tim ne postigne 21 poen',
        'Napad traje 12 sekundi',
        'U slučaju nerešenog rezultata, igra se produžetak dok neko ne postigne 2 poena'
    ] : [
        'Timovi se sastoje od 11 igrača (7 na terenu + 4 rezerve)',
        'Meč traje 2 x 25 minuta',
        'Sve utakmice se igraju po FIFA pravilima',
        'Obavezna sportska oprema i štitnici',
        'Registracija se zatvara 5 dana pre turnira'
    ];

    const timovi = isTenis
        ? ['Novak Đ.', 'Janko T.', 'Viktor T.', 'Dušan L.', 'Laslo Đ.', 'Filip K.']
        : isKosarka 
        ? ['Novi Sad 3x3', 'Liman 3x3', 'Vojvodina', 'Dunavske zvezde', 'Podbara', 'Detelinara', 'Železničar', 'Telep']
        : ['FC Vračar', 'Dorćol United', 'Novi Beograd FC', 'Zvezdara Stars', 'Palilula FC', 'Savski Venac'];

    return (
        <div style={{ width: '100%', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
            
            <div style={{ 
                position: 'relative', 
                height: '320px', 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${slikaPozadine})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                padding: '0 40px',
                color: '#ffffff'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <Link to="/turniri" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                        ← Nazad na listu
                    </Link>
                    
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ backgroundColor: '#2563eb', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                            {sport}
                        </span>
                        <span style={{ backgroundColor: status === 'Otvorene prijave' ? '#10b981' : '#64748b', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                            {status}
                        </span>
                    </div>

                    <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 16px 0', color: '#ffffff', textAlign: 'left' }}>{naziv}</h1>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '14px', opacity: 0.9 }}>
                        <span>📍 {lokacija}</span>
                        <span>📅 {datumPocetka} - {datumZavrsetka}</span>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                
                <div style={{ flex: 2, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ fontSize: '24px' }}>🏆</span>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#1e40af', fontWeight: '600' }}>Nagradni fond</div>
                                    <div style={{ fontSize: '15px', color: '#1e3a8a', fontWeight: '700' }}>{nagradniFond.toLocaleString('sr-RS')} RSD</div>
                                </div>
                            </div>
                            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ fontSize: '24px' }}>👥</span>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600' }}>Učesnici</div>
                                    <div style={{ fontSize: '15px', color: '#14532d', fontWeight: '700' }}>{prijavljenoTimova}/{maxTimova} timova</div>
                                </div>
                            </div>
                            <div style={{ padding: '16px', backgroundColor: '#faf5ff', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ fontSize: '24px' }}>📋</span>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#6b21a8', fontWeight: '600' }}>Format</div>
                                    <div style={{ fontSize: '15px', color: '#581c87', fontWeight: '700' }}>{format}</div>
                                </div>
                            </div>
                            <div style={{ padding: '16px', backgroundColor: '#fffbeb', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ fontSize: '24px' }}>🪙</span>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#92400e', fontWeight: '600' }}>Kotizacija</div>
                                    <div style={{ fontSize: '15px', color: '#78350f', fontWeight: '700' }}>{kotizacija.toLocaleString('sr-RS')} RSD po timu</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>Opis turnira</h2>
                        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: '#475569', fontSize: '15px' }}>
                            {pravila.map((pravilo, idx) => (
                                <li key={idx}>{pravilo}</li>
                            ))}
                        </ul>
                    </div>


                    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>Prijavljeni timovi ({timovi.length})</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                            {timovi.map((tim, idx) => (
                                <div key={idx} style={{ padding: '16px', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff' }}>
                                    <div style={{ width: '40px', height: '40px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', fontSize: '18px' }}>👤</div>
                                    <div>
                                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>{tim}</div>
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>{isKosarka ? '4' : isTenis ? '1' : '11'} igrača</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Brza prijava</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', fontSize: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Rok za prijavu</span>
                                <span style={{ fontWeight: '700', color: '#0f172a' }}>{rokPrijava}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Dostupno mesta</span>
                                <span style={{ fontWeight: '700', color: status === 'Otvorene prijave' ? '#10b981' : '#ef4444' }}>
                                    {maxTimova - prijavljenoTimova}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Kotizacija</span>
                                <span style={{ fontWeight: '700', color: '#0f172a' }}>{kotizacija.toLocaleString('sr-RS')} RSD po timu</span>
                            </div>
                        </div>

                        <button 
                            disabled={status !== 'Otvorene prijave'}
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                backgroundColor: status === 'Otvorene prijave' ? '#2563eb' : '#cbd5e1', 
                                color: '#ffffff', 
                                border: 'none', 
                                borderRadius: '8px', 
                                fontSize: '15px', 
                                fontWeight: '700', 
                                cursor: status === 'Otvorene prijave' ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '12px'
                            }}
                        >
                            👤 Prijavi tim
                        </button>
                        
                        <button style={{ width: '100%', padding: '12px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                            🔗 Podeli
                        </button>
                    </div>

                    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Organizator</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#475569' }}>
                            <div style={{ fontWeight: '700', color: '#0f172a' }}>Sport Events Beograd</div>
                            <div>turniri@sportevents.com</div>
                            <div>+381 11 123 4567</div>
                        </div>
                    </div>

                    <LokacijaVreme lokacija={lokacija} />

                </div>

            </div>

        </div>
    );
};
