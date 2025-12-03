import React from 'react';
import { Sparkles, Bell } from 'lucide-react';
import { LoginButton } from './Auth/LoginButton';
import type { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
    user: FirebaseUser | null;
    currentPage: 'generate' | 'saved' | 'analytics';
    onNavigate: (page: 'generate' | 'saved' | 'analytics') => void;
}

export const Header: React.FC<HeaderProps> = ({ user, currentPage, onNavigate }) => {
    return (
        <header className="bg-[#1a1d29] border-b border-gray-800 sticky top-0 z-50 h-16">
            <div className="max-w-full mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('generate')}>
                            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-white">廣告文案 AI</h1>
                        </div>

                        <nav className="flex items-center gap-8">
                            <button
                                onClick={() => onNavigate('generate')}
                                className={`text-sm font-medium transition-colors ${
                                    currentPage === 'generate'
                                        ? 'text-cyan-400'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                生成器
                            </button>
                            <button
                                onClick={() => onNavigate('saved')}
                                className={`text-sm font-medium transition-colors ${
                                    currentPage === 'saved'
                                        ? 'text-cyan-400'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                我的庫存
                            </button>
                            <button
                                onClick={() => onNavigate('analytics')}
                                className={`text-sm font-medium transition-colors ${
                                    currentPage === 'analytics'
                                        ? 'text-cyan-400'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                數據分析
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <Bell className="w-5 h-5 text-gray-400" />
                        </button>
                        <LoginButton user={user} />
                    </div>
                </div>
            </div>
        </header>
    );
};
