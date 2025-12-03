import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBYv434wUGRs_oouyGJuS8i7eEvSESA9-0";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
    console.log("Testing gemini-2.5-flash...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        console.log("✅ SUCCESS:", response.text());
    } catch (error) {
        console.log("❌ ERROR with gemini-2.5-flash");
        console.log("Message:", error.message);
        console.log("Status:", error.status);
        
        // Try gemini-pro as fallback
        console.log("\nTrying gemini-1.5-flash...");
        try {
            const model2 = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result2 = await model2.generateContent("Say hello");
            const response2 = await result2.response;
            console.log("✅ SUCCESS with gemini-1.5-flash:", response2.text());
            console.log("\n💡 Use model: gemini-1.5-flash");
        } catch (error2) {
            console.log("❌ Also failed with gemini-1.5-flash:", error2.message);
        }
    }
}

test();
