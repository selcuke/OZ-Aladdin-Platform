import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAladdinInsight = async (prompt: string, contextData: string) => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const systemInstruction = `You are "Aladdin", BlackRock's advanced investment management AI. 
    You speak in a professional, concise, and data-driven manner suitable for institutional investors. 
    Your goal is to analyze risks, suggest portfolio optimizations, and explain market trends.
    Do not provide financial advice for retail investors; focus on institutional risk and analytics.
    Use terms like "Alpha", "Beta", "Duration", "Covariance", "Liquidity", "ESG Impact".
    Always base your answer on the provided context data if applicable.`;

    const fullPrompt = `Context Data: ${contextData}\n\nUser Query: ${prompt}`;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Low temperature for consistent, analytical responses
      }
    });

    return response.text || "Aladdin analysis temporarily unavailable.";
  } catch (error) {
    console.error("Aladdin AI Error:", error);
    return "Error generating analysis. Please check system connection.";
  }
};