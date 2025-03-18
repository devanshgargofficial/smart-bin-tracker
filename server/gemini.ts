import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'; //i have added

dotenv.config();//i have added
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables");
}
console.log(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

export async function classifyWasteImage(imageBase64: string): Promise<"organic" | "recyclable"> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // gemini-pro-vision

    const prompt = "Analyze this image and determine if it shows organic waste (food waste, plant matter, biodegradable items) or recyclable waste (plastic, metal, glass, paper). Only respond with either 'organic' or 'recyclable'.";

    // Remove data URL prefix if present
    const base64Data = imageBase64.includes('base64,') ? 
      imageBase64.split('base64,')[1] : 
      imageBase64;

    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg"
        }
      }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text().toLowerCase().trim();

    if (text.includes("organic")) {
      return "organic";
    } else if (text.includes("recyclable")) {
      return "recyclable";
    }

    // Default to recyclable if response is unclear
    console.log("Classification response:", text);
    return "recyclable";
  } catch (error) {
    console.error("Gemini classification error:", error);
    throw new Error("Failed to classify waste image");
  }
}