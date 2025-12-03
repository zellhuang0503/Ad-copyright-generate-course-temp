import React, { useState } from 'react';
import { AdCard } from './AdCard';
import type { AIResponseCard } from '../../types';

interface AdGridProps {
    cards: AIResponseCard[];
    onSave: (card: AIResponseCard) => void;
    isSaving: boolean;
    searchKeyword: string;
    isGenerating: boolean;
}

export const AdGrid: React.FC<AdGridProps> = ({ cards, onSave, isSaving, searchKeyword, isGenerating }) => {
    const [sortBy, setSortBy] = useState<'highest' | 'lowest'>('highest');

    const sortedCards = [...cards].sort((a, b) => {
        if (sortBy === 'highest') {
            return b.predicted_ctr - a.predicted_ctr;
        }
        return a.predicted_ctr - b.predicted_ctr;
    });

    if (cards.length === 0 && !isGenerating) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <p className="text-gray-500 text-lg">Enter product details and generate ad copy to see results</p>
                </div>
            </div>
        );
    }

    if (isGenerating) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
                    <p className="text-gray-400">Generating ad copies...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-[#0f1117] p-8">
            {/* Header with search info and sort */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <p className="text-gray-400">
                        Showing <span className="text-white font-semibold">{cards.length}</span> results for{' '}
                        <span className="text-cyan-400 italic">'{searchKeyword}'</span>
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'highest' | 'lowest')}
                        className="px-3 py-1.5 bg-[#1a1d29] border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="highest">Highest CTR</option>
                        <option value="lowest">Lowest CTR</option>
                    </select>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                {sortedCards.map((card) => (
                    <AdCard key={card.id} card={card} onSave={onSave} isSaving={isSaving} />
                ))}
            </div>
        </div>
    );
};
