import React from 'react';
import { Copy, Bookmark } from 'lucide-react';
import type { AIResponseCard } from '../../types';

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

    // Determine CTR color based on value
    const getCTRColor = (ctr: number) => {
        if (ctr >= 4.0) return 'text-emerald-400'; // Green for high CTR
        if (ctr >= 3.0) return 'text-green-400';
        if (ctr >= 2.5) return 'text-yellow-400'; // Yellow for medium
        return 'text-orange-400'; // Orange for lower CTR
    };

    return (
        <div className="bg-[#1a1d29] rounded-xl border border-gray-800 overflow-hidden flex flex-col h-full hover:border-gray-700 transition-all">
            <div className="p-6 flex-1">
                {/* Header: Title */}
                <h3 className="text-lg font-bold text-white mb-4 leading-tight">{card.headline}</h3>

                {/* Body Text */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 whitespace-pre-wrap">{card.body}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {card.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center">
                {/* CTR */}
                <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">Predicted CTR</span>
                    <span className={`text-lg font-bold ${getCTRColor(card.predicted_ctr)}`}>
                        {card.predicted_ctr}%
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors group"
                        title="Copy to clipboard"
                    >
                        <Copy className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </button>
                    <button
                        onClick={() => onSave(card)}
                        disabled={isSaving}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors group disabled:opacity-50"
                        title="Save to library"
                    >
                        <Bookmark className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </button>
                </div>
            </div>

            {copied && (
                <div className="absolute top-2 right-2 bg-cyan-500 text-white px-3 py-1 rounded-lg text-xs font-medium">
                    Copied!
                </div>
            )}
        </div>
    );
};
