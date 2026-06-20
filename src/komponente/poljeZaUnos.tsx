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
        <div style={{ marginBottom: '20px' }}>
            <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                fontSize: '14px',
                color: '#475569'
            }}>
                {labela}
            </label>
            <input
                type={tip}
                value={vrednost}
                onChange={promena}
                placeholder={pocetniTekst}
                required={obavezno}
                style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                }}
            />
        </div>
    );
}