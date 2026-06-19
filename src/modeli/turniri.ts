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

export class TurnirMenadzer {
    private turnir: TurnirInterface;
    
    constructor(turnir: TurnirInterface) {
        this.turnir = turnir;
    }

    public naziv(): string {
        return this.turnir.naziv;
    }

    public sport(): string {
        return this.turnir.sport;
    }

    public format(): string {
        return this.turnir.format;
    }

    public lokacija(): string {
        return this.turnir.lokacija;
    }

    public datumPocetka(): Date {
        return this.turnir.datumPocetka;
    }

    public datumZavrsetka(): Date {
        return this.turnir.datumZavrsetka;
    }

    public maxTimova(): number {
        return this.turnir.maxTimova;
    }

    public prijavljenoTimova(): number {
        return this.turnir.prijavljenoTimova;
    }

    public slobodnaMesta(): number {
        return this.turnir.maxTimova - this.turnir.prijavljenoTimova;
    }

    public kotizacija(): number {
        return this.turnir.kotizacija;
    }

    public nagradniFond(): number {
        return this.turnir.nagradniFond;
    }

    public status(): string {
        return this.turnir.status;
    }
    
    public urlSlike(): string {
        return this.turnir.urlSlike;
    }
    
    public opis(): string {
        return this.turnir.opis;
    }
}
