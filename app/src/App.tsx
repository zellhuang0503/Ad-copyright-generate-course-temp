import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './services/firebase';
import { saveAd } from './services/firestore';
import { generateAds } from './services/gemini';
import { Layout } from './components/Layout';
import { InputSection } from './components/AdGenerator/InputSection';
import { AdGrid } from './components/AdGenerator/AdGrid';
import { AIResponseCard } from './types';

function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<AIResponseCard[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastContext, setLastContext] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGenerate = async (data: any) => {
    setIsGenerating(true);
    setLastContext(data);
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
    } catch (error) {
      console.error("Failed to generate ads:", error);
      alert("Failed to generate ads. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (card: AIResponseCard) => {
    if (!user) {
      alert('Please sign in to save ads.');
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
    <Layout user={user}>
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Generate High-Conversion Ad Copy
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          AI-powered inspiration for your next marketing campaign.
          Enter your product details below to get started.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <InputSection onGenerate={handleGenerate} isGenerating={isGenerating} />
        <AdGrid cards={generatedCards} onSave={handleSave} isSaving={isSaving} />
      </div>
    </Layout>
  );
}

export default App;
