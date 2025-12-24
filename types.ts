
export interface MusicAnalysis {
  genre: string;
  subGenre: string;
  mood: string;
  tempo: string;
  keyInstruments: string[];
  era: string;
  characteristics: string[];
  matchConfidence: number;
  sesameComment: string; // The pet's personality comment
}

export enum InputMethod {
  UPLOAD = 'UPLOAD',
  SEARCH = 'SEARCH',
  LINK = 'LINK'
}

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  result: MusicAnalysis;
}
