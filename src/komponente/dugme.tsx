import React from 'react';

interface DugmeProps {
    labela: string;
    akcija?: () => void;
    tip?: 'button' | 'submit';
    vrsta?: 'primarno' | 'secondary';
    stil?: React.CSSProperties; // Dodajemo ovaj prop
}

export const Dugme: React.FC<DugmeProps> = ({
    labela,
    akcija,
    tip = 'button',
    vrsta = 'primarno',
    stil
}) => {
    return (
        <button type={tip} onClick={akcija} className={`dugme dugme-${vrsta}`} style={{ ...stil }}
        >
            {labela}
        </button>
    );
}

