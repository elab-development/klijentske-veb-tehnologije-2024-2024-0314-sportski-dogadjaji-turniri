import React from 'react';

interface DugmeProps {
    labela: string;
    akcija?: () => void;
    tip?: 'button' | 'submit';
    vrsta?: 'primarno' | 'secondary';
}

export const Dugme: React.FC<DugmeProps> = ({ 
    labela, 
    akcija, 
    tip = 'button', 
    vrsta = 'primarno',
}) => {
    return (
        <button type={tip} onClick={akcija} className={`dugme dugme-${vrsta}`}>
            {labela}
        </button>
    );
}

