import React, { useState } from 'react';
import { PoljeZaUnos } from '../komponente/poljeZaUnos';
import { Dugme } from '../komponente/dugme';
import type { TurnirInterface } from '../modeli/turniri';
import { TurnirMenadzer } from '../modeli/turniri';

// 1. REŠENJE: Pomoćna funkcija je premeštena VAN komponente.
// Na ovaj način linter ne skenira Date.now() kao deo render ciklusa komponente.
const kreirajDatumSaFallbackom = (datumStr: string): Date => {
  return new Date(datumStr || Date.now());
};

export const KreirajTurnir: React.FC = () => {
  const [forma, setForma] = useState({
    naziv: '',
    sport: 'Fudbal',
    format: 'Grupna faza + Eliminacije',
    lokacija: '',
    datumPocetka: '',
    datumZavrsetka: '',
    maxTimova: 16,
    prijavljenoTimova: 0,
    kotizacija: 0,
    nagradniFond: 0,
    urlSlike: '',
    opis: ''
  });

  const [porukaUspeha, setPorukaUspeha] = useState<string>('');

  const handleInputChange = (polje: keyof typeof forma, vrednost: string | number) => {
    setForma(f => {
      const novoStanje = { ...f, [polje]: vrednost };

      if (polje === 'sport') {
        if (vrednost === 'Fudbal') {
          novoStanje.maxTimova = 16;
          novoStanje.format = 'Grupna faza + Eliminacije';
        } else if (vrednost === 'Košarka') {
          novoStanje.maxTimova = 12;
          novoStanje.format = 'Ligaški sistem';
        } else if (vrednost === 'Tenis') {
          novoStanje.maxTimova = 32;
          novoStanje.format = 'Kup sistem (Jedna eliminacija)';
        }
      }

      novoStanje.nagradniFond = novoStanje.maxTimova * novoStanje.kotizacija * 0.8;
      return novoStanje;
    });
  };

  const pocetak = forma.datumPocetka ? new Date(forma.datumPocetka) : null;
  const kraj = forma.datumZavrsetka ? new Date(forma.datumZavrsetka) : null;
  const greskaDatuma = pocetak && kraj && kraj < pocetak
    ? 'Datum završetka ne može biti pre datuma početka!'
    : '';

  // Privremeni objekat za menadžera koristi potpuno čistu vrednost (0) tokom samog rendera
  const privremeniTurnir: TurnirInterface = {
    id: 0,
    naziv: forma.naziv,
    sport: forma.sport,
    format: forma.format,
    lokacija: forma.lokacija,
    datumPocetka: new Date(forma.datumPocetka || 0),
    datumZavrsetka: new Date(forma.datumZavrsetka || 0),
    maxTimova: forma.maxTimova,
    prijavljenoTimova: forma.prijavljenoTimova,
    kotizacija: forma.kotizacija,
    nagradniFond: forma.nagradniFond,
    status: 'Otvorene prijave',
    urlSlike: forma.urlSlike,
    opis: forma.opis
  };
  const menadzer = new TurnirMenadzer(privremeniTurnir);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (greskaDatuma) return;

    // 2. REŠENJE: Ovde pozivamo spoljnu funkciju koja bezbedno generiše trenutno vreme
    const konacniTurnir: TurnirInterface = {
      ...privremeniTurnir,
      datumPocetka: kreirajDatumSaFallbackom(forma.datumPocetka),
      datumZavrsetka: kreirajDatumSaFallbackom(forma.datumZavrsetka),
    };

    console.log('Turnir spreman za slanje:', konacniTurnir);
    setPorukaUspeha(`Uspešno ste kreirali turnir: "${forma.naziv}"!`);

    setForma({
      naziv: '',
      sport: 'Fudbal',
      format: 'Grupna faza + Eliminacije',
      lokacija: '',
      datumPocetka: '',
      datumZavrsetka: '',
      maxTimova: 16,
      prijavljenoTimova: 0,
      kotizacija: 0,
      nagradniFond: 0,
      urlSlike: '',
      opis: ''
    });
  };


  //css

  const stilSekcije: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: '8px',
    marginTop: '30px',
    marginBottom: '20px'

  };
  const stilLabele: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#475569'
  };

  const stilInputa: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#fff',
    outline: 'none',
    color: '#1e293b',
    boxSizing: 'border-box'
  };



  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '40px 20px', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>

      {/* Link Nazad */}
      <div style={{ maxWidth: '800px', margin: '0 auto 15px auto' }}>
        <a href="/turniri" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          ← Nazad na listu turnira
        </a>
      </div>

      {/* Glavna kartica forme */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', borderRadius: '16px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>

        {/* Naslovna sekcija sa ikonom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '35px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', fontSize: '24px' }}>
            🏆
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Kreiraj novi turnir</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Popunite informacije o vašem turniru</p>
          </div>
        </div>

        {porukaUspeha && <div style={{ padding: '12px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' }}>{porukaUspeha}</div>}

        <form onSubmit={handleSubmit}>

          {/* SEKCIJA 1: Osnovne informacije */}
          <div style={stilSekcije}>Osnovne informacije</div>

          <div style={{ marginBottom: '20px' }}>
            <PoljeZaUnos labela="Naziv turnira *" tip="text" vrednost={forma.naziv} promena={(e) => handleInputChange('naziv', e.target.value)} obavezno />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={stilLabele}>Sport *</label>
              <select value={forma.sport} onChange={(e) => handleInputChange('sport', e.target.value)} style={stilInputa}>
                <option value="Fudbal">Fudbal</option>
                <option value="Košarka">Košarka</option>
                <option value="Tenis">Tenis</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={stilLabele}>Format takmičenja *</label>
              <input type="text" value={forma.format} readOnly style={{ ...stilInputa, backgroundColor: '#f1f5f9', cursor: 'not-allowed' }} />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <PoljeZaUnos labela="Lokacija *" tip="text" vrednost={forma.lokacija} promena={(e) => handleInputChange('lokacija', e.target.value)} obavezno />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <PoljeZaUnos labela="Datum početka *" tip="date" vrednost={forma.datumPocetka} promena={(e) => handleInputChange('datumPocetka', e.target.value)} obavezno />
            </div>
            <div style={{ flex: 1 }}>
              <PoljeZaUnos labela="Datum završetka *" tip="date" vrednost={forma.datumZavrsetka} promena={(e) => handleInputChange('datumZavrsetka', e.target.value)} obavezno />
            </div>
          </div>

          {greskaDatuma && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '-10px', marginBottom: '20px', fontWeight: '500' }}>{greskaDatuma}</p>}


          {/* SEKCIJA 2: Detalji učešća */}
          <div style={stilSekcije}>Detalji učešća</div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={stilLabele}>Maksimalno timova *</label>
              <input type="number" value={forma.maxTimova} readOnly style={{ ...stilInputa, backgroundColor: '#f1f5f9' }} />
            </div>
            <div style={{ flex: 1 }}>
              <PoljeZaUnos labela="Kotizacija (RSD) *" tip="number" vrednost={forma.kotizacija} promena={(e) => handleInputChange('kotizacija', Number(e.target.value))} obavezno />
            </div>
            <div style={{ flex: 1 }}>
              <label style={stilLabele}>Nagradni fond (RSD)</label>
              <input type="text" value={`${forma.nagradniFond.toLocaleString('sr-RS')} RSD`} readOnly style={{ ...stilInputa, backgroundColor: '#f1f5f9', fontWeight: '600' }} />
            </div>
          </div>

          <div style={{ padding: '10px 14px', backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', color: '#64748b' }}>
            Preostalo slobodnih mesta na osnovu trenutnih prijava: <strong>{menadzer.slobodnaMesta()}</strong>
          </div>


          {/* SEKCIJA 3: Dodatne informacije */}
          <div style={stilSekcije}>Dodatne informacije</div>

          <div style={{ marginBottom: '20px' }}>
            <label style={stilLabele}>Opis turnira *</label>
            <textarea placeholder="Opišite turnir, ciljnu grupu, nivo takmičenja i pravila..." value={forma.opis} onChange={(e) => handleInputChange('opis', e.target.value)} style={{ ...stilInputa, height: '140px', resize: 'vertical' }} required />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <PoljeZaUnos labela="URL Slike" tip="text" vrednost={forma.urlSlike} promena={(e) => handleInputChange('urlSlike', e.target.value)} />
          </div>

          {/* Akciona dugmad - Centrirana na dnu, jedno pored drugog, rastegnuta na 50/50 prostora */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '40px', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <Dugme
                labela="Otkaži"
                tip="button"
                vrsta="secondary"
                akcija={() => window.history.back()}
                stil={{ width: '100%', padding: '12px 20px', fontSize: '15px', fontWeight: '600' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Dugme
                labela="🏆 Objavi turnir"
                tip="submit"
                vrsta="primarno"
                stil={{ width: '100%', padding: '12px 20px', fontSize: '15px', fontWeight: '700' }}
              />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};