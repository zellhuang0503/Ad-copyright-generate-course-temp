import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBGfEnE0JUMIgq4yACLKjcRVyH6R53Mg5U";
const genAI = new GoogleGenerativeAI(API_KEY);

async function checkQuota() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("test");
        console.log("API is working");
    } catch (error) {
        console.log("\n❌ API Error Details:");
        console.log("Message:", error.message);
        console.log("\nStatus:", error.status);
        console.log("\nThis API key has exceeded its quota.");
        console.log("\n💡 Solutions:");
        console.log("1. Wait for quota to reset (usually resets daily)");
        console.log("2. Get a new API key from https://aistudio.google.com/apikey");
        console.log("3. Upgrade to a paid plan for higher quotas");
    }
}

checkQuota();
