import React from 'react';
import { Sparkles, Bookmark } from 'lucide-react';
import { LoginButton } from './Auth/LoginButton';
import type { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
    user: FirebaseUser | null;
    currentPage: 'generate' | 'saved';
    onNavigate: (page: 'generate' | 'saved') => void;
}

export const Header: React.FC<HeaderProps> = ({ user, currentPage, onNavigate }) => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('generate')}>
                            <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">AdCopy.ai</h1>
                                <p className="text-xs text-gray-500">Inspiration Library</p>
                            </div>
                        </div>

                        <nav className="hidden md:flex items-center gap-1">
                            <button
                                onClick={() => onNavigate('generate')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    currentPage === 'generate'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                生成廣告
                            </button>
                            <button
                                onClick={() => onNavigate('saved')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                    currentPage === 'saved'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                <Bookmark className="w-4 h-4" />
                                已儲存
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <LoginButton user={user} />
                    </div>
                </div>
            </div>
        </header>
    );
};
