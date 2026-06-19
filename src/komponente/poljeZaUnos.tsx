import React from 'react';

interface PoljeZaUnosProps {
    labela: string;
    tip: string;
    vrednost: string | number;
    promena: (e: React.ChangeEvent<HTMLInputElement>) => void;
    pocetniTekst?: string;
    obavezno?: boolean;
}

export const PoljeZaUnos: React.FC<PoljeZaUnosProps> = ({
    labela, 
    tip,
    vrednost,
    promena,
    pocetniTekst,
    obavezno = false
}) => {
    return (
        <div style={{marginBottom: '15px'}}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                {labela}
            </label>
            <input 
            type={tip} 
            value={vrednost} 
            onChange={promena}
            placeholder={pocetniTekst}
            required={obavezno}
            style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}  
            />
        </div>
    );
}