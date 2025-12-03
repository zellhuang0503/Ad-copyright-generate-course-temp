import React from 'react';
import { Copy, Trash2, BarChart2, Calendar } from 'lucide-react';
import type { SavedAd } from '../../types';

interface SavedAdCardProps {
    ad: SavedAd;
    onDelete: (adId: string) => void;
    isDeleting: boolean;
}

export const SavedAdCard: React.FC<SavedAdCardProps> = ({ ad, onDelete, isDeleting }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${ad.content.headline}\n\n${ad.content.body}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2">
                        {ad.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
                        <BarChart2 className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-xs font-bold text-green-700">{ad.metrics.predictedCtr}% CTR</span>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">{ad.content.headline}</h3>
                <p className="text-gray-600 whitespace-pre-wrap text-sm leading-relaxed mb-4">{ad.content.body}</p>

                {ad.content.rationale && (
                    <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500 italic border border-gray-100">
                        💡 AI Insight: {ad.content.rationale}
                    </div>
                )}

                {ad.createdAt && (
                    <div className="mt-4 flex items-center text-xs text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(ad.createdAt)}
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
                    onClick={() => onDelete(ad.id)}
                    disabled={isDeleting}
                    className="text-gray-500 hover:text-red-600 flex items-center text-sm font-medium transition-colors disabled:opacity-50"
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </button>
            </div>
        </div>
    );
};
