import React from 'react';
import { AdCard } from './AdCard';
import { AIResponseCard } from '../../types';

interface AdGridProps {
    cards: AIResponseCard[];
    onSave: (card: AIResponseCard) => void;
    isSaving: boolean;
}

export const AdGrid: React.FC<AdGridProps> = ({ cards, onSave, isSaving }) => {
    if (cards.length === 0) return null;

    return (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
                <AdCard key={card.id} card={card} onSave={onSave} isSaving={isSaving} />
            ))}
        </div>
    );
};
