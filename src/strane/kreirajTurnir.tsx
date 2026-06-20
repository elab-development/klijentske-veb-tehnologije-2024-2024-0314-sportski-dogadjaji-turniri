import React, { useState, useRef } from 'react';
import { PoljeZaUnos } from '../komponente/poljeZaUnos';
import { Dugme } from '../komponente/dugme';
import type { TurnirInterface } from '../modeli/turniri';
import { TurnirMenadzer } from '../modeli/turniri';

const kreirajDatumSaFallbackom = (datumStr: string): Date => {
  return new Date(datumStr || Date.now());
};

const SPORTOVI: { [key: string]: { formati: string[]; maxTimova: number; slike: string } } = {
  'Fudbal': {
    formati: ['Grupna faza + Eliminacije', 'Ligaški sistem', 'Kup sistem', 'Turnirski format'],
    maxTimova: 16,
    slike: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500'
  },
  'Košarka': {
    formati: ['Ligaški sistem', 'Kup sistem', 'Grupna faza + Nokaut', '3x3 turnir'],
    maxTimova: 12,
    slike: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500'
  },
  'Tenis': {
    formati: ['Kup sistem (jedna eliminacija)', 'Dvostrani kup', 'Grupna faza + Nokaut', 'Rober turnir'],
    maxTimova: 32,
    slike: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500'
  },
  'Odbojka': {
    formati: ['Grupna faza + Eliminacije', 'Ligaški sistem', 'Kup sistem', 'Beach turnir'],
    maxTimova: 8,
    slike: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500'
  },
  'Rukomet': {
    formati: ['Grupna faza + Eliminacije', 'Ligaški sistem', 'Kup sistem'],
    maxTimova: 8,
    slike: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=500'
  },
  'Stoni tenis': {
    formati: ['Kup sistem', 'Rober turnir', 'Grupna faza + Nokaut'],
    maxTimova: 16,
    slike: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500'
  },
  'Badminton': {
    formati: ['Kup sistem', 'Grupna faza + Nokaut', 'Rober turnir'],
    maxTimova: 16,
    slike: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500'
  },
  'Šah': {
    formati: ['Švajcarski sistem', 'Rober turnir', 'Nokaut sistem'],
    maxTimova: 32,
    slike: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=500'
  },
};

export const KreirajTurnir: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [slikaPreview, setSlikaPreview] = useState<string>('');

  const [forma, setForma] = useState({
    naziv: '',
    sport: 'Fudbal',
    format: SPORTOVI['Fudbal'].formati[0],
    lokacija: '',
    datumPocetka: '',
    datumZavrsetka: '',
    maxTimova: 16,
    prijavljenoTimova: 0,
    kotizacija: 0,
    nagradniFond: 0,
    opis: ''
  });

  const [porukaUspeha, setPorukaUspeha] = useState<string>('');
  const [nagradniFondRucno, setNagradniFondRucno] = useState(false);

  const handleSlikaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSlikaPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (polje: keyof typeof forma, vrednost: string | number) => {
    if (polje === 'nagradniFond') {
      setNagradniFondRucno(true);
      setForma(f => ({ ...f, nagradniFond: Number(vrednost) }));
      return;
    }
    setForma(f => {
      const novoStanje = { ...f, [polje]: vrednost };

      if (polje === 'sport') {
        const sport = vrednost as string;
        novoStanje.format = SPORTOVI[sport]?.formati[0] ?? '';
        novoStanje.maxTimova = SPORTOVI[sport]?.maxTimova ?? 16;
      }

      if (!nagradniFondRucno && (polje === 'maxTimova' || polje === 'kotizacija' || polje === 'sport')) {
        novoStanje.nagradniFond = Math.round(novoStanje.maxTimova * novoStanje.kotizacija * 0.8);
      }

      return novoStanje;
    });
  };

  const pocetak = forma.datumPocetka ? new Date(forma.datumPocetka) : null;
  const kraj = forma.datumZavrsetka ? new Date(forma.datumZavrsetka) : null;
  const greskaDatuma = pocetak && kraj && kraj < pocetak
    ? 'Datum završetka ne može biti pre datuma početka!'
    : '';

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
    urlSlike: slikaPreview || SPORTOVI[forma.sport]?.slike || '',
    opis: forma.opis
  };
  const menadzer = new TurnirMenadzer(privremeniTurnir);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (greskaDatuma) return;

    const stored = localStorage.getItem('turniri');
    let trenutniTurniri: TurnirInterface[] = [];
    if (stored) {
      trenutniTurniri = JSON.parse(stored);
    }
    const noviId = trenutniTurniri.length > 0 ? Math.max(...trenutniTurniri.map(t => t.id)) + 1 : 1;

    const noviTurnir: TurnirInterface = {
      ...privremeniTurnir,
      id: noviId,
      datumPocetka: kreirajDatumSaFallbackom(forma.datumPocetka),
      datumZavrsetka: kreirajDatumSaFallbackom(forma.datumZavrsetka),
    };

    trenutniTurniri.unshift(noviTurnir);
    localStorage.setItem('turniri', JSON.stringify(trenutniTurniri));

    setPorukaUspeha(`Uspešno ste kreirali turnir: "${forma.naziv}"!`);
    setSlikaPreview('');

    setForma({
      naziv: '',
      sport: 'Fudbal',
      format: SPORTOVI['Fudbal'].formati[0],
      lokacija: '',
      datumPocetka: '',
      datumZavrsetka: '',
      maxTimova: 16,
      prijavljenoTimova: 0,
      kotizacija: 0,
      nagradniFond: 0,
      opis: ''
    });
    setNagradniFondRucno(false);
  };

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
    <div style={{ backgroundColor: '#ffffff', padding: '40px 20px', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ maxWidth: '800px', margin: '0 auto 15px auto' }}>
        <a href="/turniri" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          ← Nazad na listu turnira
        </a>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', borderRadius: '16px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>

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

          <div style={stilSekcije}>Osnovne informacije</div>

          <div style={{ marginBottom: '20px' }}>
            <PoljeZaUnos labela="Naziv turnira *" tip="text" vrednost={forma.naziv} promena={(e) => handleInputChange('naziv', e.target.value)} obavezno />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={stilLabele}>Sport *</label>
              <select value={forma.sport} onChange={(e) => handleInputChange('sport', e.target.value)} style={stilInputa}>
                {Object.keys(SPORTOVI).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={stilLabele}>Format takmičenja *</label>
              <select value={forma.format} onChange={(e) => handleInputChange('format', e.target.value)} style={stilInputa}>
                {(SPORTOVI[forma.sport]?.formati ?? []).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
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

          <div style={stilSekcije}>Detalji učešća</div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={stilLabele}>Maksimalno timova *</label>
              <input
                type="number"
                value={forma.maxTimova}
                min={2}
                max={256}
                onChange={(e) => handleInputChange('maxTimova', Number(e.target.value))}
                style={stilInputa}
              />
            </div>
            <div style={{ flex: 1 }}>
              <PoljeZaUnos labela="Kotizacija (RSD) *" tip="number" vrednost={forma.kotizacija} promena={(e) => handleInputChange('kotizacija', Number(e.target.value))} obavezno />
            </div>
            <div style={{ flex: 1 }}>
              <label style={stilLabele}>Nagradni fond (RSD)</label>
              <input
                type="number"
                value={forma.nagradniFond}
                min={0}
                onChange={(e) => handleInputChange('nagradniFond', Number(e.target.value))}
                style={{ ...stilInputa, borderColor: nagradniFondRucno ? '#cbd5e1' : '#93c5fd' }}
              />

            </div>
          </div>

          <div style={{ padding: '10px 14px', backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', color: '#64748b' }}>
            Preostalo slobodnih mesta: <strong>{menadzer.slobodnaMesta()}</strong>
          </div>

          <div style={stilSekcije}>Dodatne informacije</div>

          <div style={{ marginBottom: '20px' }}>
            <label style={stilLabele}>Opis turnira *</label>
            <textarea
              placeholder="Opišite turnir, ciljnu grupu, nivo takmičenja i pravila..."
              value={forma.opis}
              onChange={(e) => handleInputChange('opis', e.target.value)}
              style={{ ...stilInputa, height: '140px', resize: 'vertical' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={stilLabele}>Slika turnira</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleSlikaUpload}
              style={{ display: 'none' }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#f8fafc',
                color: '#64748b',
                fontSize: '14px'
              }}
            >
              {slikaPreview ? (
                <img src={slikaPreview} alt="Preview" style={{ maxHeight: '180px', maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }} />
              ) : (
                <div>📷 Kliknite da otpremite sliku<br /><span style={{ fontSize: '12px', color: '#94a3b8' }}>JPG, PNG, WEBP – maks. 5MB</span></div>
              )}
            </div>
            {slikaPreview && (
              <button type="button" onClick={() => setSlikaPreview('')} style={{ marginTop: '8px', fontSize: '12px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                ✕ Ukloni sliku
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '40px', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <Dugme labela="🏆 Objavi turnir" tip="submit" vrsta="primarno" />
            </div>
            <div style={{ flex: 1 }}>
              <Dugme labela="Otkaži" tip="button" vrsta="secondary" akcija={() => window.history.back()} />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};