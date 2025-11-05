import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey });
};

const languageMap: { [key: string]: string } = {
    en: 'English',
    hi: 'Hindi',
    ta: 'Tamil',
    te: 'Telugu',
};

export const getBotResponse = async (history: string, message: string, language: string = 'en'): Promise<string> => {
  try {
    const ai = getAiClient();
    const languageName = languageMap[language] || 'English';
    const systemInstruction = `You are a helpful and friendly AI assistant for a student wellness app. Your goal is to provide supportive, safe, and informative advice on topics related to student life, mental health, physical fitness, and nutrition.
    - You MUST respond in ${languageName}.
    - Keep responses concise and easy to understand.
    - Use a positive and encouraging tone.
    - If a user expresses serious distress, signs of self-harm, or a crisis, you MUST immediately provide a disclaimer and direct them to emergency resources. For example: "If you are in immediate danger, please contact a crisis hotline or emergency services. Here are some resources: Crisis Text Line (text HOME to 741741), The National Suicide Prevention Lifeline (988)."
    - Do not give medical diagnoses. You can provide general health information but must state you are not a medical professional.
    - Previous conversation: ${history}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    const errorMessage = language === 'en' 
        ? "I'm sorry, I'm having trouble connecting right now. Please try again later."
        : "मुझे क्षमा करें, मुझे अभी कनेक्ट होने में समस्या आ रही है। कृपया बाद में दोबारा प्रयास करें।";
    return errorMessage;
  }
};
