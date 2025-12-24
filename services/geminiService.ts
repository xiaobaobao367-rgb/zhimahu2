
import { GoogleGenAI, Type } from "@google/genai";
import { MusicAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    genre: { type: Type.STRING, description: "Primary music genre" },
    subGenre: { type: Type.STRING, description: "Specific sub-genre" },
    mood: { type: Type.STRING, description: "Emotional tone of the music" },
    tempo: { type: Type.STRING, description: "Estimated BPM or tempo description" },
    keyInstruments: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of prominent instruments"
    },
    era: { type: Type.STRING, description: "Likely era or decade of the style" },
    characteristics: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Technical or stylistic features"
    },
    matchConfidence: { type: Type.NUMBER, description: "0-100 confidence score" },
    sesameComment: { type: Type.STRING, description: "A cute, witty comment about the music style from the perspective of a pet named Sesame Paste (芝麻糊)" }
  },
  required: ["genre", "subGenre", "mood", "tempo", "keyInstruments", "era", "characteristics", "matchConfidence", "sesameComment"]
};

export const analyzeMusic = async (
  input: { type: 'text' | 'audio', content: string, mimeType?: string }
): Promise<MusicAnalysis> => {
  const model = 'gemini-3-pro-preview';
  
  let contents: any;
  if (input.type === 'audio') {
    contents = {
      parts: [
        { inlineData: { data: input.content, mimeType: input.mimeType || 'audio/mpeg' } },
        { text: "Identify the music style, genre, mood, and technical characteristics of this audio. Also provide a witty comment as '芝麻糊', a curious and music-loving pet cat/dog." }
      ]
    };
  } else {
    contents = `Analyze the music style for the following song title or link: "${input.content}". Identify its genre, sub-genre, mood, typical tempo, instruments, and era. Also provide a witty comment as '芝麻糊', a curious pet.`;
  }

  const response = await ai.models.generateContent({
    model,
    contents: typeof contents === 'string' ? contents : contents,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.7,
    },
  });

  if (!response.text) {
    throw new Error("Failed to get analysis from AI");
  }

  return JSON.parse(response.text.trim()) as MusicAnalysis;
};
