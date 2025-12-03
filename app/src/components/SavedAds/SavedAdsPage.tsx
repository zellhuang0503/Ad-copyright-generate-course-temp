import React, { useEffect, useState } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { getSavedAds, deleteAd } from '../../services/firestore';
import { SavedAdCard } from './SavedAdCard';
import type { SavedAd } from '../../types';
import { Bookmark } from 'lucide-react';

interface SavedAdsPageProps {
    user: FirebaseUser | null;
}

export const SavedAdsPage: React.FC<SavedAdsPageProps> = ({ user }) => {
    const [savedAds, setSavedAds] = useState<SavedAd[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (user) {
            loadSavedAds();
        } else {
            setIsLoading(false);
        }
    }, [user]);

    const loadSavedAds = async () => {
        if (!user) return;

        setIsLoading(true);
        try {
            const ads = await getSavedAds(user.uid);
            setSavedAds(ads);
        } catch (error: any) {
            console.error('Failed to load saved ads:', error);
            const errorMsg = error.message || '無法載入已儲存的廣告';
            alert(`載入失敗: ${errorMsg}\n\n請確認:\n1. Firebase 是否已正確設定\n2. 是否已登入\n3. 檢查瀏覽器控制台的詳細錯誤`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (adId: string) => {
        if (!confirm('確定要刪除這則廣告嗎?')) return;

        setIsDeleting(true);
        try {
            await deleteAd(adId);
            setSavedAds(savedAds.filter(ad => ad.id !== adId));
        } catch (error) {
            console.error('Failed to delete ad:', error);
            alert('刪除失敗，請稍後再試');
        } finally {
            setIsDeleting(false);
        }
    };

    if (!user) {
        return (
            <div className="text-center py-20">
                <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">請先登入</h2>
                <p className="text-gray-500">您需要登入才能查看已儲存的廣告文案</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-500">載入中...</p>
            </div>
        );
    }

    if (savedAds.length === 0) {
        return (
            <div className="text-center py-20">
                <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">還沒有儲存的廣告</h2>
                <p className="text-gray-500">開始生成廣告文案並點擊「Save」來儲存您喜歡的內容</p>
            </div>
        );
    }

    return (
        <div>
            <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    我的已儲存廣告
                </h2>
                <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                    共 {savedAds.length} 則已儲存的廣告文案
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedAds.map((ad) => (
                        <SavedAdCard
                            key={ad.id}
                            ad={ad}
                            onDelete={handleDelete}
                            isDeleting={isDeleting}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
