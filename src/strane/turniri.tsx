import React, {useState, useEffect} from 'react';
import type {TurnirInterface} from '../modeli/turniri';
import { TurnirMenadzer } from '../modeli/turniri';

export const Turniri: React.FC = () => {
    const [turniri, setTurniri] = useState<TurnirInterface[]>([]);
    const [ucitavanje, setUcitavanje] = useState<boolean>(true);
    
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

        const tajmer = setTimeout(() => {
            setTurniri(testPodaci);
            setUcitavanje(false);
        }, 1000);
        
        return () => 
            clearTimeout(tajmer);
        }, []);


        if(ucitavanje) {
            return <div style={{padding: '20px', textAlign: 'center'}}>Učitavanje...</div>;
        }

        return (
            <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Svi turniri</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {turniri.map((turnir) => {
                const menadzer = new TurnirMenadzer(turnir);
                
                return (
                    <div key={turnir.id} style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', padding: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <img src={menadzer.urlSlike()} alt={menadzer.naziv()} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
                    <h3 style={{ margin: '10px 0' }}>{menadzer.naziv()}</h3>
                    <p><strong>Sport:</strong> {menadzer.sport()}</p>
                    <p><strong>Lokacija:</strong> {menadzer.lokacija()}</p>
                    <p><strong>Slobodna mesta:</strong> {menadzer.slobodnaMesta()}</p>
                    <p><strong>Nagradni fond:</strong> {menadzer.nagradniFond().toLocaleString('sr-RS')} RSD</p>
                    <span style={{
                        display: 'inline-block',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        backgroundColor: menadzer.status() === 'Otvorene prijave' ? '#e6f4ea' : '#feeed0',
                        color: menadzer.status() === 'Otvorene prijave' ? '#137333' : '#b06000',
                        fontWeight: 'bold',
                        marginTop: '10px'
                    }}>
                        {menadzer.status()}
                    </span>
                 </div>
                );
                })}
             </div>
         </div>
    ); 
}

    

