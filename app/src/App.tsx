import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from './services/firebase';
import { saveAd } from './services/firestore';
import { generateAds } from './services/gemini';
import { Layout } from './components/Layout';
import { InputSection } from './components/AdGenerator/InputSection';
import { AdGrid } from './components/AdGenerator/AdGrid';
import { SavedAdsPage } from './components/SavedAds/SavedAdsPage';
import type { AIResponseCard } from './types/index';

function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [currentPage, setCurrentPage] = useState<'generate' | 'saved' | 'analytics'>('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<AIResponseCard[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastContext, setLastContext] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    if (!auth) {
      console.log('Auth not initialized, running in demo mode');
      setUser(null);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    } catch (error) {
      console.warn('Firebase Auth not configured. Running in demo mode without authentication.');
      setUser(null);
    }
  }, []);

  const handleGenerate = async (data: any) => {
    setIsGenerating(true);
    setLastContext(data);
    setSearchKeyword(data.keyword);
    setGeneratedCards([]); // Clear previous results

    try {
      const cards = await generateAds(
        data.keyword,
        data.industry,
        data.emotion,
        data.platform,
        data.length
      );
      setGeneratedCards(cards);
    } catch (error: any) {
      console.error("Failed to generate ads:", error);
      const errorMessage = error.message || "Failed to generate ads. Please try again later.";
      alert(`生成失敗: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (card: AIResponseCard) => {
    if (!user) {
      alert('Firebase 尚未設定。請參考 firebase_setup_guide.md 設定您的 Firebase 專案以啟用儲存功能。');
      return;
    }
    setIsSaving(true);
    try {
      await saveAd(user.uid, card, lastContext);
      alert(`Saved: ${card.headline}`);
    } catch (error) {
      console.error("Failed to save ad:", error);
      alert("Failed to save ad. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout user={user} currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'generate' ? (
        <div className="flex h-full">
          {/* Left Sidebar - Input Section */}
          <div className="w-[395px] bg-[#1a1d29] border-r border-gray-800 overflow-y-auto">
            <InputSection onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>

          {/* Right Content - Results Grid */}
          <div className="flex-1 overflow-y-auto">
            <AdGrid
              cards={generatedCards}
              onSave={handleSave}
              isSaving={isSaving}
              searchKeyword={searchKeyword}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      ) : currentPage === 'saved' ? (
        <SavedAdsPage user={user} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-300 mb-2">數據分析</h2>
            <p className="text-gray-500">即將推出...</p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
