import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBGfEnE0JUMIgq4yACLKjcRVyH6R53Mg5U";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGenerate() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello, test message");
        const response = await result.response;
        const text = response.text();
        console.log("SUCCESS:", text);
    } catch (error) {
        console.error("ERROR:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
    }
}

testGenerate();
