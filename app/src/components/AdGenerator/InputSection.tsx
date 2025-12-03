import React from 'react';
import { Sparkles } from 'lucide-react';

interface InputSectionProps {
    onGenerate: (data: any) => void;
    isGenerating: boolean;
}

const INDUSTRIES = ['電商', '科技', '時尚', '食品', '金融', '其他'];
const EMOTIONS = ['樂觀', '急迫', '專業', '幽默', '溫馨'];
const PLATFORMS = ['Facebook', 'Instagram', 'Google Ads', 'LinkedIn'];
const LENGTHS = ['短', '中', '長'];

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isGenerating }) => {
    const [keyword, setKeyword] = React.useState('');
    const [industry, setIndustry] = React.useState(INDUSTRIES[0]);
    const [emotion, setEmotion] = React.useState(EMOTIONS[0]);
    const [platform, setPlatform] = React.useState(PLATFORMS[0]);
    const [length, setLength] = React.useState(LENGTHS[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate({ keyword, industry, emotion, platform, length });
    };

    return (
        <div className="p-6 h-full flex flex-col">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">建立新廣告文案</h2>
                <p className="text-sm text-gray-400">輸入產品詳情，讓 AI 為您完成其餘工作</p>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="flex-1 space-y-6">
                    {/* Product Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            產品描述或關鍵字
                        </label>
                        <textarea
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="例如：由回收材料製成的環保運動鞋"
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Filters */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">篩選條件</h3>
                        <div className="space-y-4">
                            {/* Industry & Tone */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-2">產業</label>
                                    <select
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        {INDUSTRIES.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-2">語調</label>
                                    <select
                                        value={emotion}
                                        onChange={(e) => setEmotion(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        {EMOTIONS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Platform & Length */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-2">平台</label>
                                    <select
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        {PLATFORMS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-2">長度</label>
                                    <select
                                        value={length}
                                        onChange={(e) => setLength(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        {LENGTHS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Generate Button */}
                <button
                    type="submit"
                    disabled={isGenerating || !keyword.trim()}
                    className={`w-full mt-6 flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-all ${
                        isGenerating || !keyword.trim()
                            ? 'bg-gray-700 cursor-not-allowed'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                    }`}
                >
                    {isGenerating ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            生成中...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            生成文案
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};
