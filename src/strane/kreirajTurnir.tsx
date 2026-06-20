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

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2>Kreiraj Novi Turnir</h2>
      
      {porukaUspeha && <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '15px' }}>{porukaUspeha}</div>}

      <form onSubmit={handleSubmit}>
        <PoljeZaUnos labela="Naziv turnira" tip="text" vrednost={forma.naziv} promena={(e) => handleInputChange('naziv', e.target.value)} obavezno />
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Izaberi sport</label>
          <select value={forma.sport} onChange={(e) => handleInputChange('sport', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="Fudbal">Fudbal</option>
            <option value="Košarka">Košarka</option>
            <option value="Tenis">Tenis</option>
          </select>
        </div>

        <PoljeZaUnos labela="Lokacija" tip="text" vrednost={forma.lokacija} promena={(e) => handleInputChange('lokacija', e.target.value)} obavezno />
        
        <PoljeZaUnos labela="Datum početka" tip="date" vrednost={forma.datumPocetka} promena={(e) => handleInputChange('datumPocetka', e.target.value)} obavezno />
        <PoljeZaUnos labela="Datum završetka" tip="date" vrednost={forma.datumZavrsetka} promena={(e) => handleInputChange('datumZavrsetka', e.target.value)} obavezno />
        
        {greskaDatuma && <p style={{ color: 'red', fontSize: '14px', marginTop: '-10px', marginBottom: '15px' }}>{greskaDatuma}</p>}

        <PoljeZaUnos labela="Kotizacija (RSD)" tip="number" vrednost={forma.kotizacija} promena={(e) => handleInputChange('kotizacija', Number(e.target.value))} obavezno />
        
        <div style={{ padding: '10px', backgroundColor: '#ecc', borderRadius: '4px', marginBottom: '15px', fontSize: '14px' }}>
          <strong>Ukupno slobodnih mesta za timove:</strong> {menadzer.slobodnaMesta()} <br />
          <strong>Automatski predložen nagradni fond (80%):</strong> {forma.nagradniFond.toLocaleString('sr-RS')} RSD
        </div>

        <PoljeZaUnos labela="URL Slike" tip="text" vrednost={forma.urlSlike} promena={(e) => handleInputChange('urlSlike', e.target.value)} />

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Opis turnira</label>
          <textarea value={forma.opis} onChange={(e) => handleInputChange('opis', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height: '80px' }} />
        </div>

        <Dugme labela="Objavi Turnir" tip="submit" vrsta="primarno" />
      </form>
    </div>
  );
};