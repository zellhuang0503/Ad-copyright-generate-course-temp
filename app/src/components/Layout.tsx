import React from 'react';
import { Header } from './Header';
import type { User as FirebaseUser } from 'firebase/auth';

interface LayoutProps {
    children: React.ReactNode;
    user: FirebaseUser | null;
    currentPage: 'generate' | 'saved' | 'analytics';
    onNavigate: (page: 'generate' | 'saved' | 'analytics') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, currentPage, onNavigate }) => {
    return (
        <div className="min-h-screen bg-[#0f1117] font-sans text-gray-100">
            <Header user={user} currentPage={currentPage} onNavigate={onNavigate} />
            <main className="h-[calc(100vh-64px)]">
                {children}
            </main>
        </div>
    );
};
