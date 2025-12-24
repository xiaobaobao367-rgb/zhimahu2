
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import AnalysisResult from './components/AnalysisResult';
import { MusicAnalysis, HistoryItem } from './types';
import { analyzeMusic } from './services/geminiService';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<MusicAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSongTitle, setCurrentSongTitle] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('music_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleAnalyze = async (type: 'text' | 'audio', content: string, mimeType?: string, fileName?: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentSongTitle(fileName || '未知曲目');
    
    try {
      const result = await analyzeMusic({ type, content, mimeType });
      setAnalysis(result);
      
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        title: fileName || result.genre,
        date: new Date().toLocaleString(),
        result
      };
      
      const updatedHistory = [newHistoryItem, ...history.slice(0, 9)];
      setHistory(updatedHistory);
      localStorage.setItem('music_history', JSON.stringify(updatedHistory));
      
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || '芝麻糊迷路了，没能识别出这段音乐。请重试一次吧！');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8">
      <Header />
      
      <main className="max-w-5xl mx-auto">
        <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-pulse">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <svg className="w-8 h-8 text-zinc-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.804l8-1.6V11a2 2 0 11-2 2 2 2 0 012-2V3z"></path>
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="text-zinc-900 font-bold text-xl">芝麻糊正在努力辨音...</p>
              <p className="text-zinc-400 text-sm mt-1">正在通过 AI 深度分析旋律风格</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-3xl text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4">
            <svg className="w-12 h-12 mx-auto mb-3 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p className="font-bold whitespace-pre-wrap">{error}</p>
          </div>
        )}

        {analysis && !isLoading && (
          <AnalysisResult result={analysis} songTitle={currentSongTitle} />
        )}

        {history.length > 0 && !analysis && !isLoading && (
          <section className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-2xl font-bold text-zinc-900 mb-8 px-2 flex items-center justify-between">
              <span>识别记录</span>
              <button 
                onClick={() => { setHistory([]); localStorage.removeItem('music_history'); }}
                className="text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                清除全部
              </button>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setAnalysis(item.result); setCurrentSongTitle(item.title); }}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 text-left hover:shadow-md hover:border-zinc-200 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {item.result.genre}
                    </span>
                    <span className="text-[10px] text-zinc-300 font-medium">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-zinc-900 line-clamp-1 group-hover:text-zinc-600 transition-colors">{item.title}</h4>
                  <p className="text-zinc-400 text-xs mt-1">{item.result.subGenre} • {item.result.mood}</p>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none">
        <div className="max-w-xs mx-auto bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-zinc-200/50 shadow-lg text-center pointer-events-auto">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
            Powered by Gemini 3 Flash
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
