import { db } from './firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
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
        // Simplified query without compound index requirement
        const q = query(
            collection(db, 'saved_ads'),
            where('user_id', '==', userId)
        );

        const querySnapshot = await getDocs(q);
        const savedAds: SavedAd[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Filter archived ads in memory instead of query
            if (data.is_archived !== true) {
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
            }
        });

        // Sort by creation date in memory
        savedAds.sort((a, b) => {
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
            return timeB - timeA; // Descending order (newest first)
        });

        return savedAds;
    } catch (error: any) {
        console.error("Error fetching saved ads: ", error);
        console.error("Error details:", {
            message: error.message,
            code: error.code
        });
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
