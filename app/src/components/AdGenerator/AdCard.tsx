import React from 'react';
import { Copy, Bookmark, BarChart2 } from 'lucide-react';
import { AIResponseCard } from '../../types';

interface AdCardProps {
    card: AIResponseCard;
    onSave: (card: AIResponseCard) => void;
    isSaving: boolean;
}

export const AdCard: React.FC<AdCardProps> = ({ card, onSave, isSaving }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${card.headline}\n\n${card.body}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
                        <BarChart2 className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-xs font-bold text-green-700">{card.predicted_ctr}% CTR</span>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">{card.headline}</h3>
                <p className="text-gray-600 whitespace-pre-wrap text-sm leading-relaxed">{card.body}</p>

                {card.rationale && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500 italic border border-gray-100">
                        💡 AI Insight: {card.rationale}
                    </div>
                )}
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                <button
                    onClick={handleCopy}
                    className="text-gray-500 hover:text-indigo-600 flex items-center text-sm font-medium transition-colors"
                >
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                    onClick={() => onSave(card)}
                    disabled={isSaving}
                    className="text-gray-500 hover:text-indigo-600 flex items-center text-sm font-medium transition-colors disabled:opacity-50"
                >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                </button>
            </div>
        </div>
    );
};
