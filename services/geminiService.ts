
import { GoogleGenAI, Type } from "@google/genai";
import { MusicAnalysis } from "../types";

const getAI = () => {
  // 在浏览器环境下，尝试从全局或环境变量中获取 API Key
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY 未配置。请在 Vercel 的 Environment Variables 中设置名为 API_KEY 的变量。");
  }
  return new GoogleGenAI({ apiKey });
};

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
  const ai = getAI();
  // 切换到更稳定的 flash 模型
  const modelName = 'gemini-3-flash-preview';
  
  let contents: any;
  if (input.type === 'audio') {
    contents = {
      parts: [
        { inlineData: { data: input.content, mimeType: input.mimeType || 'audio/mpeg' } },
        { text: "请识别这段音频的音乐风格、流派、情绪和技术特点。并以宠物'芝麻糊'的口吻写一段俏皮的评论。" }
      ]
    };
  } else {
    contents = {
      parts: [
        { text: `请分析以下歌曲或描述的音乐风格: "${input.content}"。包括流派、细分流派、情绪、典型节奏、乐器和年代。并以宠物'芝麻糊'的口吻写一段俏皮的评论。` }
      ]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("AI 未返回有效内容，请换一首歌试试。");
    }

    return JSON.parse(text.trim()) as MusicAnalysis;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // 抛出更有意义的错误信息
    if (error.message?.includes("API_KEY")) {
      throw new Error("API Key 无效或未设置，请检查环境变量。");
    }
    if (error.message?.includes("429")) {
      throw new Error("请求太频繁啦，请稍后再试。");
    }
    if (error.message?.includes("404")) {
      throw new Error(`模型 ${modelName} 在当前区域不可用。`);
    }
    throw new Error(error.message || "由于网络或模型原因，识别失败了。");
  }
};
