import { db } from './firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import type { AIResponseCard, SavedAd } from '../types/index';

export const saveAd = async (userId: string, card: AIResponseCard, context: any) => {
    if (!db) {
        throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
    }

    try {
        const adData = {
            user_id: userId,
            content: {
                headline: card.headline,
                body: card.body,
                rationale: card.rationale
            },
            metrics: {
                predicted_ctr: card.predicted_ctr
            },
            generation_context: context,
            tags: card.tags,
            created_at: serverTimestamp(),
            is_archived: false
        };

        const docRef = await addDoc(collection(db, 'saved_ads'), adData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};

export const getSavedAds = async (userId: string): Promise<SavedAd[]> => {
    if (!db) {
        throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
    }

    try {
        const q = query(
            collection(db, 'saved_ads'),
            where('user_id', '==', userId),
            where('is_archived', '==', false),
            orderBy('created_at', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const savedAds: SavedAd[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            savedAds.push({
                id: doc.id,
                userId: data.user_id,
                content: data.content,
                metrics: {
                    predictedCtr: data.metrics.predicted_ctr,
                    userRating: data.metrics.user_rating
                },
                generationContext: data.generation_context,
                tags: data.tags,
                createdAt: data.created_at
            });
        });

        return savedAds;
    } catch (error) {
        console.error("Error fetching saved ads: ", error);
        throw error;
    }
};

export const deleteAd = async (adId: string) => {
    if (!db) {
        throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
    }

    try {
        await deleteDoc(doc(db, 'saved_ads', adId));
    } catch (error) {
        console.error("Error deleting ad: ", error);
        throw error;
    }
};
