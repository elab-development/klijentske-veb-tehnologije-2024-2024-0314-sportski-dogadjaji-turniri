import React, { useState, useEffect } from 'react';
import type { TurnirInterface } from '../modeli/turniri';
import { TurnirMenadzer } from '../modeli/turniri';

export const Turniri: React.FC = () => {
    const [turniri, setTurniri] = useState<TurnirInterface[]>([]);
    const [ucitavanje, setUcitavanje] = useState<boolean>(true);
    const [pretraga, setPretraga] = useState<string>('');
    const [izabraniSport, setIzabraniSport] = useState<string>('Svi');
    const [statusFilter, setStatusFilter] = useState<string>('Svi');
    const prikazaniTurniri = turniri.filter((turnir) => {
        const poklapaNaziv = turnir.naziv.toLowerCase().includes(pretraga.toLowerCase());
        const poklapaSport = izabraniSport === 'Svi' || turnir.sport === izabraniSport;
        const poklapaStatus = statusFilter === 'Svi' || turnir.status === statusFilter;

        return poklapaNaziv && poklapaSport && poklapaStatus;
    });


    useEffect(() => {
        const testPodaci: TurnirInterface[] = [
            {
                id: 1,
                naziv: "Letnji turnir 2026",
                sport: "Fudbal",
                format: "Grupna faza",
                lokacija: "Stadion FK Partizan, Beograd",
                datumPocetka: new Date('2026-06-01'),
                datumZavrsetka: new Date('2026-06-05'),
                maxTimova: 16,
                prijavljenoTimova: 16,
                kotizacija: 5000,
                nagradniFond: 50000,
                status: "Zatvorene prijave",
                urlSlike: "https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FAssociation_football&ved=0CBYQjRxqFwoTCKiNoa6qlJUDFQAAAAAdAAAAABAF&opi=89978449",
                opis: "Pridružite se najvećem letnjem turniru."
            },
            {
                id: 2,
                naziv: 'Košarkaška Liga - Prolećna Sezona',
                sport: 'Košarka',
                format: '8/12 timova',
                lokacija: 'Novi Sad, Srbija',
                datumPocetka: new Date('2026-06-01'),
                datumZavrsetka: new Date('2026-06-30'),
                maxTimova: 12,
                prijavljenoTimova: 8,
                kotizacija: 4000,
                nagradniFond: 45000,
                status: 'Otvorene prijave',
                urlSlike: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500',
                opis: 'Tradicionalni turnir u basketu.'
            }
        ];
        const mnogoTurnira: TurnirInterface[] = Array.from({ length: 40 }, (_, index) => {
            const sablon = testPodaci[index % testPodaci.length];
            return {
                ...sablon,
                id: index + 1,
                naziv: `${sablon.naziv} #${index + 1}`
            };
        });
        const tajmer = setTimeout(() => {
            setTurniri(mnogoTurnira);
            setUcitavanje(false);
        }, 1000);

        return () =>
            clearTimeout(tajmer);
    }, []);


    if (ucitavanje) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Učitavanje...</div>;
    }

    return (
        // Glavni kontejner: svetla pozadina i puno prostora oko sadržaja
        <div style={{ padding: '40px 20px', backgroundColor: '#ffffff', minHeight: '100vh', width: '100%', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
            <div style={{ width: '100%' }}>

                {/* Naslov: postavlja osnovni tekst i marginu za bolju čitljivost */}
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Svi turniri</h1>
                <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '30px' }}>Pronađite savršen turnir za vas</p>

                {/* Filteri: flex layout omogućava da se polja lepo ređaju u redu, a flexWrap osigurava da pređu u novi red ako je ekran uzak */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '30px',
                    flexWrap: 'wrap'
                }}>
                    <input placeholder="Pretrazi turnire..." value={pretraga} onChange={(e) => setPretraga(e.target.value)} style={{ flex: 2, minWidth: '250px', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#0f172a', fontSize: '15px', outline: 'none' }} />
                    <select value={izabraniSport} onChange={(e) => setIzabraniSport(e.target.value)} style={{ flex: 1, minWidth: '150px', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#475569', fontSize: '15px' }}>

                        <option value="Svi">Svi sportovi</option>
                        <option value="Fudbal">Fudbal</option>
                        <option value="Košarka">Košarka</option>
                    </select>

                    {/* Filter za status */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ flex: 1, minWidth: '150px', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#475569', fontSize: '15px' }}
                    >
                        <option value="Svi">Svi statusi</option>
                        <option value="Otvorene prijave">Otvorene prijave</option>
                        <option value="Zatvorene prijave">Zatvorene prijave</option>
                    </select>
                </div>

                {/* Grid Mreža*/}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
                    {prikazaniTurniri.map((turnir) => {
                        const menadzer = new TurnirMenadzer(turnir);

                        return (
                            <div key={turnir.id} style={{
                                backgroundColor: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '16px', overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column'
                            }}>
                                {/* Slika: position: relative omogućava da "Sport bedž" bude pozicioniran apsolutno unutar nje */}
                                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                                    <img src={menadzer.urlSlike()} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    {/* Sport bedž: apsolutno pozicioniran u donji levi ugao slike */}
                                    <span style={{ position: 'absolute', bottom: '12px', left: '12px', backgroundColor: '#2563eb', color: '#ffffff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                                        {menadzer.sport()}
                                    </span>
                                </div>

                                {/* Sadržaj kartice: flexGrow: 1 gura sve elemente na ravnomernu raspodelu unutar kartice */}
                                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>{menadzer.naziv()}</h3>
                                        <div style={{ fontSize: '14px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <p style={{ margin: 0 }}>📍 {menadzer.lokacija()}</p>
                                            <p style={{ margin: 0 }}>👥 {turnir.prijavljenoTimova}/{menadzer.maxTimova()} timova</p>
                                        </div>
                                    </div>

                                    {/* Status i strelica: justifyContent: space-between razdvaja status na levo, a strelicu na desno */}
                                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '13px', backgroundColor: '#e6f4ea', color: '#137333', fontWeight: '600' }}>
                                            {menadzer.status()}
                                        </span>
                                        <span style={{ color: '#2563eb', fontSize: '18px', fontWeight: 'bold' }}>➔</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}



