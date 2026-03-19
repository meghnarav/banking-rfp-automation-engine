import { createClient } from "@google/genai";

// Initialize the client using the Vite env variable
const client = createClient({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const MODEL_ID = "gemini-2.0-flash";

/**
 * Core RAG Engine for Auto-RFP
 * @param {string} prompt - The user's specific request
 * @param {string} context - The extracted text from uploaded PDFs
 */
export const generateRFPContent = async (prompt, context = "") => {
  try {
    const response = await client.models.generateContent({
      model: MODEL_ID,
      config: {
        // System instructions are now passed directly in the config for 2.0
        systemInstruction: "You are an expert Banking Procurement Officer at Indian Bank. Use formal language. If context is provided, prioritize it. If a table is requested, use Markdown.",
        temperature: 0.2, // Low temperature = more professional/less creative
      },
      contents: [
        {
          role: "user",
          parts: [
            { text: `Context from historical RFPs: ${context.slice(0, 30000)}` },
            { text: `Task: ${prompt}` }
          ],
        },
      ],
    });

    return response.value.content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to reach Banking AI Engine.");
  }
};

/**
 * Specialized Service for Corrigendum Tables
 */
export const generateCorrigendum = async (queries) => {
  const tablePrompt = `Transform these vendor queries into a formal Banking Corrigendum Table. 
  Include columns: [S.No, RFP Clause Ref, Vendor Query, Bank's Clarification]. 
  Queries: ${queries}`;
  
  return await generateRFPContent(tablePrompt);
};