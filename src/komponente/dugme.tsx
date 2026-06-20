import React from 'react';

interface DugmeProps {
    labela: string;
    akcija?: () => void;
    tip?: 'button' | 'submit';
    vrsta?: 'primarno' | 'secondary';
    stil?: React.CSSProperties;
}

export const Dugme: React.FC<DugmeProps> = ({
    labela,
    akcija,
    tip = 'button',
    vrsta = 'primarno',
    stil
}) => {
    // Definisanje stilova na osnovu vrste dugmeta (izgled sa slike)
    const jePrimarno = vrsta === 'primarno';

    const bazniStil: React.CSSProperties = {
        width: '100%',
        padding: '14px 24px',
        borderRadius: '10px', // Lepo zaobljene ivice kao na slici
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxSizing: 'border-box',
        // Različite boje za plavo i sivo dugme:
        border: jePrimarno ? 'none' : '1px solid #e2e8f0',
        backgroundColor: jePrimarno ? '#1d4ed8' : '#f1f5f9', // Jarko plava i svetlo siva/bela
        color: jePrimarno ? '#ffffff' : '#334155',          // Beli tekst za plavo dugme, tamniji za sivo
    };

    return (
        <button type={tip} onClick={akcija} className={`dugme dugme-${vrsta}`} style={{ ...bazniStil, ...stil }}
        >
            {labela}
        </button>
    );
}

