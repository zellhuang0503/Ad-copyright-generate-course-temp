import React, { useState } from 'react';
import { X, Key, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (apiKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [apiKey, setApiKey] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (apiKey.trim()) {
            onSubmit(apiKey.trim());
            setApiKey('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[#1a1d29] border border-gray-800 rounded-xl max-w-md w-full mx-4 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-cyan-500/10 p-2 rounded-lg">
                            <Key className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">輸入 Gemini API Key</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <p className="text-gray-400 text-sm mb-4">
                            您已達到免費生成次數上限（10次）。請輸入您的 Gemini API Key 以繼續使用。
                        </p>

                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mb-4">
                            <p className="text-cyan-400 text-sm mb-2 font-medium">如何取得 API Key？</p>
                            <ol className="text-gray-400 text-xs space-y-1 list-decimal list-inside">
                                <li>前往 Google AI Studio</li>
                                <li>登入您的 Google 帳號</li>
                                <li>建立新的 API Key</li>
                                <li>複製並貼上到下方欄位</li>
                            </ol>
                            <a
                                href="https://aistudio.google.com/app/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-3 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                            >
                                前往 Google AI Studio
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>

                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Gemini API Key
                        </label>
                        <input
                            type="text"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIza..."
                            required
                            className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            您的 API Key 僅儲存在本地瀏覽器中，不會上傳到伺服器
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            disabled={!apiKey.trim()}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            確認
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
