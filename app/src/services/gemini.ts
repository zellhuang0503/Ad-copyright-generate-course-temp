import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AIResponseCard } from "../types";

// Default API key for free tier
const DEFAULT_API_KEY = "AIzaSyBYv434wUGRs_oouyGJuS8i7eEvSESA9-0";
const USER_API_KEY_STORAGE = 'user_gemini_api_key';

// Get API key from localStorage or use default
const getApiKey = (): string => {
    const userKey = localStorage.getItem(USER_API_KEY_STORAGE);
    return userKey || DEFAULT_API_KEY;
};

// Save user's API key
export const setUserApiKey = (apiKey: string): void => {
    localStorage.setItem(USER_API_KEY_STORAGE, apiKey);
};

// Check if user has custom API key
export const hasUserApiKey = (): boolean => {
    return !!localStorage.getItem(USER_API_KEY_STORAGE);
};

// Clear user's API key
export const clearUserApiKey = (): void => {
    localStorage.removeItem(USER_API_KEY_STORAGE);
};

const SYSTEM_PROMPT = `
# Role
你是一位擁有 10 年經驗的「資深廣告文案撰寫專家」與「數據分析師」。你精通消費者心理學、各大平台（FB/IG/Google）的演算法偏好，以及廣告法規。

# Task
接收使用者的產品資訊與篩選條件，生成 **3 則** 風格迥異但都符合條件的廣告文案。每則文案必須包含一個由你根據「文案吸引力」模擬預測的點擊率 (CTR)。

# Context & Constraints
1. **行業標準:**
   - **Facebook:** 對話感、痛點共鳴、適量 Emoji。
   - **Instagram:** 視覺感、氛圍營造、豐富 Emoji、Hashtags。
   - **Google Ads:** 精準、關鍵字匹配、無 Emoji、強烈 CTA。

2. **安全與合規:**
   - **絕對禁止**：醫療療效宣稱、誇大不實、歧視仇恨言論。
   - 若輸入違禁內容，回傳空 Array。

3. **數據模擬:**
   - **CTR 範圍:** 1.5% - 5.0%。
   - **評分邏輯:** 具備「情緒鉤子」或「獨特價值」者 CTR 較高。

# Output Format
只輸出一個純 JSON Object，包含 \`generated_cards\` Array。不要 Markdown 標記。

JSON Schema:
{
  "generated_cards": [
    {
      "id": "unique_string_id",
      "headline": "標題",
      "body": "內文",
      "tags": ["情感", "平台", "行業"],
      "predicted_ctr": 3.4,
      "rationale": "解釋"
    }
  ]
}
`;

export const generateAds = async (
    keyword: string,
    industry: string,
    emotion: string,
    platform: string,
    length: string
): Promise<AIResponseCard[]> => {
    try {
        // Get API key (user's custom key or default)
        const apiKey = getApiKey();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const userPrompt = JSON.stringify({
            product_name: keyword,
            industry,
            emotion,
            platform,
            length
        });

        const result = await model.generateContent(SYSTEM_PROMPT + "\n\nUser Input:\n" + userPrompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present (Gemini sometimes adds them despite instructions)
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const data = JSON.parse(jsonString);

        // Add IDs if missing (though prompt asks for them)
        return data.generated_cards.map((card: any, index: number) => ({
            ...card,
            id: card.id || `gen-${Date.now()}-${index}`
        }));

    } catch (error: any) {
        console.error("Gemini Generation Error:", error);
        console.error("Error details:", {
            message: error.message,
            status: error.status,
            statusText: error.statusText
        });

        // Provide more detailed error message
        if (error.status === 429) {
            throw new Error('API 配額已用完，請稍後再試或更換 API key');
        } else if (error.status === 404) {
            throw new Error('模型不存在，請檢查模型名稱');
        } else if (error.message?.includes('JSON')) {
            throw new Error('AI 回應格式錯誤，請重試');
        }

        throw error;
    }
};
