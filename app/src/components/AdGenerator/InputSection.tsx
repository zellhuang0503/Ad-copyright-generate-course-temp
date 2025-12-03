import React from 'react';
import { Search, Sparkles } from 'lucide-react';

interface InputSectionProps {
    onGenerate: (data: any) => void;
    isGenerating: boolean;
}

const INDUSTRIES = ['美妝', '3C', '服飾', '食品', '金融', '其他'];
const EMOTIONS = ['幽默', '恐懼(痛點)', '溫馨', '專業', '緊迫'];
const PLATFORMS = ['Facebook', 'Instagram', 'Google Ads'];
const LENGTHS = ['短文案(<50字)', '中長文案', '長故事'];

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Search Bar */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="輸入產品名稱或核心關鍵字 (例如：防脫髮洗髮精)"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        required
                    />
                </div>

                {/* Filters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Industry */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">行業類別</label>
                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {INDUSTRIES.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Emotion */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">情感基調</label>
                        <select
                            value={emotion}
                            onChange={(e) => setEmotion(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {EMOTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Platform */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">發布平台</label>
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {PLATFORMS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Length */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">長度限制</label>
                        <select
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {LENGTHS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Generate Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isGenerating || !keyword.trim()}
                        className={`flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 ${(isGenerating || !keyword.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isGenerating ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 mr-2" />
                                Generate Ad Copy
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
