export interface TurnirInterface{
    id: number;
    naziv: string;
    sport: string;
    format: string;
    lokacija: string;
    datumPocetka: Date;
    datumZavrsetka: Date;
    maxTimova: number;
    prijavljenoTimova: number;
    kotizacija: number;
    nagradniFond: number;
    status: 'Zatvorene prijave' | 'Zavrsen' | 'Otvorene prijave';
    urlSlike: string;
    opis: string;
}
