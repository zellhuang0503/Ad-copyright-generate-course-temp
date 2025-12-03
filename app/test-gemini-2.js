import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBGfEnE0JUMIgq4yACLKjcRVyH6R53Mg5U";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGenerate() {
    try {
        console.log("Testing gemini-2.0-flash-exp...");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const result = await model.generateContent("Say hello in Chinese");
        const response = await result.response;
        const text = response.text();
        console.log("✅ SUCCESS:", text);
    } catch (error) {
        console.error("❌ ERROR:", error.message);
        console.error("Status:", error.status);
    }
}

testGenerate();
