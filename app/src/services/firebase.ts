import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// TEMPORARY: Firebase config with placeholder values
// To enable Firebase features, follow firebase_setup_guide.md to get your own config
const firebaseConfig = {
    apiKey: "AIzaSyBKaqhR-Br708B6WdxCTyPw8gphiN_yD10",
    authDomain: "ad-copyright-generate.firebaseapp.com",
    projectId: "ad-copyright-generate",
    storageBucket: "ad-copyright-generate.firebasestorage.app",
    messagingSenderId: "648008326528",
    appId: "1:648008326528:web:db76fdfb95409b6ee5b565",
    measurementId: "G-29JCW3QD5T"
};

// Check if we have a valid API key (not a placeholder)
const hasValidConfig = firebaseConfig.apiKey !== "PLACEHOLDER" &&
    firebaseConfig.apiKey.length > 10;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (hasValidConfig) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.warn('Firebase initialization failed:', error);
        console.warn('App will run in demo mode. Follow firebase_setup_guide.md to enable full features.');
    }
} else {
    console.warn('Firebase not configured. Running in demo mode.');
    console.warn('To enable authentication & saving, follow firebase_setup_guide.md');
}

export { auth, db };
export const googleProvider = auth ? new GoogleAuthProvider() : null;

