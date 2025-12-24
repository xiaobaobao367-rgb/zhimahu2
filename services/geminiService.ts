
import { MusicAnalysis } from "../types";

// 预设的模拟风格库，用于在演示模式下提供丰富的内容
const MOCK_DATA_POOL: Partial<MusicAnalysis>[] = [
  {
    genre: "City Pop",
    subGenre: "80s Japanese Pop",
    mood: "怀旧、清爽、都市感",
    tempo: "115 BPM (中速)",
    keyInstruments: ["合成器", "电贝斯", "萨克斯", "电子鼓"],
    era: "1980s",
    characteristics: ["华丽的编曲", "标志性的贝斯线", "都市夜晚氛围", "爵士融合"],
    sesameComment: "这节奏让我想起了东京夜晚的霓虹灯，虽然我只是只小宠物，但也想喝杯冰可乐！"
  },
  {
    genre: "Lo-fi Hip Hop",
    subGenre: "Chillhop",
    mood: "放松、慵懒、思考",
    tempo: "85 BPM (慢速)",
    keyInstruments: ["采样器", "黑胶唱机", "钢琴", "软音色合成器"],
    era: "Modern / Digital Era",
    characteristics: ["环境采样", "故意留下的底噪", "摇摆的节奏", "重复的旋律"],
    sesameComment: "听着这段音乐，芝麻糊感觉可以在地毯上睡上一个下午，谁也别吵醒我..."
  },
  {
    genre: "Synthwave",
    subGenre: "Retrowave",
    mood: "科技、复古未来、动感",
    tempo: "125 BPM (快速)",
    keyInstruments: ["模拟合成器", "鼓机 (TR-808)", "电吉他"],
    era: "2010s Inspired by 80s",
    characteristics: ["琶音器", "强烈的混响", "赛博朋克色彩", "线性的推进感"],
    sesameComment: "这音乐听起来像是在开一辆飞往月球的跑车，系好安全带，我们要加速了！"
  },
  {
    genre: "Classic Rock",
    subGenre: "Hard Rock",
    mood: "热烈、叛逆、充满力量",
    tempo: "138 BPM (快速)",
    keyInstruments: ["过载电吉他", "爵士鼓", "电贝斯"],
    era: "1970s",
    characteristics: ["强力五和弦", "激昂的独奏", "蓝调根源", "体育场氛围"],
    sesameComment: "这吉他扫弦的声音让芝麻糊的胡须都在跟着抖动，太酷了！"
  },
  {
    genre: "Classical",
    subGenre: "Baroque",
    mood: "优雅、严谨、明亮",
    tempo: "90 BPM (中速)",
    keyInstruments: ["大键琴", "小提琴", "大提琴", "长笛"],
    era: "17th Century",
    characteristics: ["复调对位", "装饰音", "通奏低音", "平衡的结构"],
    sesameComment: "感觉自己突然变成了一只有教养的贵族猫，需要带上领结去参加舞会。"
  }
];

/**
 * 模拟分析函数：现在不再调用 Gemini API，而是返回预设的模拟数据
 */
export const analyzeMusic = async (
  input: { type: 'text' | 'audio', content: string, mimeType?: string }
): Promise<MusicAnalysis> => {
  // 模拟网络延迟，保留辨音动画的仪式感
  await new Promise(resolve => setTimeout(resolve, 1800));

  // 根据输入内容或随机选择一个结果
  const randomIndex = Math.floor(Math.random() * MOCK_DATA_POOL.length);
  const baseData = MOCK_DATA_POOL[randomIndex];

  return {
    genre: baseData.genre!,
    subGenre: baseData.subGenre!,
    mood: baseData.mood!,
    tempo: baseData.tempo!,
    keyInstruments: baseData.keyInstruments!,
    era: baseData.era!,
    characteristics: baseData.characteristics!,
    matchConfidence: Math.floor(Math.random() * 15) + 85, // 85-99 之间的随机匹配度
    sesameComment: baseData.sesameComment!
  };
};
