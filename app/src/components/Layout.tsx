import React from 'react';
import { Header } from './Header';
import type { User as FirebaseUser } from 'firebase/auth';

interface LayoutProps {
    children: React.ReactNode;
    user: FirebaseUser | null;
    currentPage: 'generate' | 'saved';
    onNavigate: (page: 'generate' | 'saved') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, currentPage, onNavigate }) => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Header user={user} currentPage={currentPage} onNavigate={onNavigate} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};
