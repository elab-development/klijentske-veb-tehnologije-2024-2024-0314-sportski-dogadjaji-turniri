import React from 'react';

interface DugmeProps {
    tekst: string;
    akcija?: () => void;
    tip?: 'button' | 'submit';
    vrsta?: 'primarno' | 'secondary';
}

export const Dugme: React.FC<DugmeProps> = ({ 
    tekst, 
    akcija, 
    tip = 'button', 
    vrsta = 'primarno',
}) => {
    return (
        <button type={tip} onClick={akcija} className={`dugme dugme-${vrsta}`}>
            {tekst}
        </button>
    );
}

