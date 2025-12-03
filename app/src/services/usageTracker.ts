// Track usage for anonymous and authenticated users
const STORAGE_KEY = 'ad_generator_usage';
const FREE_GENERATION_LIMIT = 10;

interface UsageData {
    count: number;
    lastReset: string;
}

export const getUsageCount = (): number => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return 0;

        const usage: UsageData = JSON.parse(data);
        return usage.count || 0;
    } catch (error) {
        console.error('Error reading usage data:', error);
        return 0;
    }
};

export const incrementUsageCount = (): number => {
    try {
        const currentCount = getUsageCount();
        const newCount = currentCount + 1;

        const usage: UsageData = {
            count: newCount,
            lastReset: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
        return newCount;
    } catch (error) {
        console.error('Error incrementing usage:', error);
        return 0;
    }
};

export const getRemainingGenerations = (): number => {
    const used = getUsageCount();
    return Math.max(0, FREE_GENERATION_LIMIT - used);
};

export const hasReachedLimit = (): boolean => {
    return getUsageCount() >= FREE_GENERATION_LIMIT;
};

export const resetUsageCount = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error resetting usage:', error);
    }
};

export const FREE_LIMIT = FREE_GENERATION_LIMIT;
