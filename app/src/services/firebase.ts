import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBKaqhR-Br708B6WdxCTyPw8gphiN_yD10",
    authDomain: "ad-copyright-generate.firebaseapp.com",
    projectId: "ad-copyright-generate",
    storageBucket: "ad-copyright-generate.firebasestorage.app",
    messagingSenderId: "648008326528",
    appId: "1:648008326528:web:db76fdfb95409b6ee5b565",
    measurementId: "G-29JCW3QD5T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
