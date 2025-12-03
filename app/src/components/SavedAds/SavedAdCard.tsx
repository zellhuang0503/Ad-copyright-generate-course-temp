import React from 'react';
import { Copy, Trash2, Calendar } from 'lucide-react';
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

    // Determine CTR color based on value
    const getCTRColor = (ctr: number) => {
        if (ctr >= 4.0) return 'text-emerald-400';
        if (ctr >= 3.0) return 'text-green-400';
        if (ctr >= 2.5) return 'text-yellow-400';
        return 'text-orange-400';
    };

    return (
        <div className="bg-[#1a1d29] rounded-xl border border-gray-800 overflow-hidden flex flex-col h-full hover:border-gray-700 transition-all relative">
            <div className="p-6 flex-1">
                {/* Header: Title */}
                <h3 className="text-lg font-bold text-white mb-4 leading-tight">{ad.content.headline}</h3>

                {/* Body Text */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 whitespace-pre-wrap">{ad.content.body}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {ad.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Created Date */}
                {ad.createdAt && (
                    <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(ad.createdAt)}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center">
                {/* CTR */}
                <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">預測 CTR</span>
                    <span className={`text-lg font-bold ${getCTRColor(ad.metrics.predictedCtr)}`}>
                        {ad.metrics.predictedCtr}%
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors group"
                        title="複製到剪貼簿"
                    >
                        <Copy className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </button>
                    <button
                        onClick={() => onDelete(ad.id)}
                        disabled={isDeleting}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors group disabled:opacity-50"
                        title="刪除"
                    >
                        <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
                    </button>
                </div>
            </div>

            {copied && (
                <div className="absolute top-2 right-2 bg-cyan-500 text-white px-3 py-1 rounded-lg text-xs font-medium">
                    已複製！
                </div>
            )}
        </div>
    );
};
