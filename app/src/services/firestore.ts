import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AIResponseCard } from '../types';

export const saveAd = async (userId: string, card: AIResponseCard, context: any) => {
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
