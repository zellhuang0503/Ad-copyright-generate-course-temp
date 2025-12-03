import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBGfEnE0JUMIgq4yACLKjcRVyH6R53Mg5U";
const genAI = new GoogleGenerativeAI(API_KEY);

const models = ["gemini-pro", "gemini-1.5-pro", "gemini-1.5-flash-latest"];

async function testModel(modelName) {
    try {
        console.log(`\n🔍 Testing ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        const text = response.text();
        console.log(`✅ ${modelName} WORKS:`, text.substring(0, 50));
        return true;
    } catch (error) {
        console.log(`❌ ${modelName} FAILED:`, error.message.substring(0, 100));
        return false;
    }
}

async function testAll() {
    for (const modelName of models) {
        const success = await testModel(modelName);
        if (success) {
            console.log(`\n✨ Recommended model: ${modelName}`);
            break;
        }
    }
}

testAll();
