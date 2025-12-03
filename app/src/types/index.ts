import { Timestamp } from 'firebase/firestore';

// 1. User Profile
export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    credits: {
        totalGenerated: number;
        remainingBalance: number;
        subscriptionTier: 'free' | 'pro';
    };
    createdAt: Timestamp;
}

// 2. The Ad Card (Stored in Firestore)
export interface SavedAd {
    id: string;
    userId: string;
    content: {
        headline: string;
        body: string;
        rationale?: string;
    };
    metrics: {
        predictedCtr: number;
        userRating?: number;
    };
    generationContext: {
        keyword: string;
        industry: string;
        emotion: string;
        platform: string;
        length: string;
    };
    tags: string[];
    createdAt: Timestamp;
}

// 3. Transient AI Response (API Response Shape)
// 前端接收 API 串流時的暫存結構，尚未存入 DB
export interface AIResponseCard {
    id: string; // Temporary ID from LLM
    headline: string;
    body: string;
    tags: string[];
    predicted_ctr: number;
    rationale: string;
}
