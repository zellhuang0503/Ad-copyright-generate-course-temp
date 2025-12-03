import React from 'react';
import { signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth, googleProvider } from '../../services/firebase';
import { User } from 'lucide-react';

interface LoginButtonProps {
    user: FirebaseUser | null;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ user }) => {
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    if (user) {
        return (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full" />
                    ) : (
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 font-bold text-xs">{user.displayName?.[0] || 'U'}</span>
                        </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.displayName}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-xs text-gray-500 hover:text-gray-700"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleLogin}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
            </div>
            <span>Sign In</span>
        </button>
    );
};
