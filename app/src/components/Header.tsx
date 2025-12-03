import React from 'react';
import { Sparkles } from 'lucide-react';
import { LoginButton } from './Auth/LoginButton';
import { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
    user: FirebaseUser | null;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">AdCopy.ai</h1>
                            <p className="text-xs text-gray-500">Inspiration Library</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">
                            Pricing
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <LoginButton user={user} />
                    </div>
                </div>
            </div>
        </header>
    );
};
