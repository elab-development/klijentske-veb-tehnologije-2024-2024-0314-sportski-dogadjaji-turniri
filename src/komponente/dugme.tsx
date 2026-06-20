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

    const jePrimarno = vrsta === 'primarno';
    const bazniStil: React.CSSProperties = {
        width: '100%',
        padding: '14px 24px',
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxSizing: 'border-box',
        border: jePrimarno ? 'none' : '1px solid #e2e8f0',
        backgroundColor: jePrimarno ? '#1d4ed8' : '#f1f5f9',
        color: jePrimarno ? '#ffffff' : '#334155',
    };
    return (
        <button type={tip} onClick={akcija} className={`dugme dugme-${vrsta}`} style={{ ...bazniStil, ...stil }}
        >
            {labela}
        </button>
    );
}

