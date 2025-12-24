
import React from 'react';
import { MusicAnalysis } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface AnalysisResultProps {
  result: MusicAnalysis;
  songTitle?: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, songTitle }) => {
  // Mock data for the visualization based on the results
  const chartData = [
    { subject: '节奏感', A: result.tempo.includes('Fast') || result.tempo.includes('高') ? 90 : 60 },
    { subject: '情绪感', A: result.mood.includes('Strong') || result.mood.includes('浓') ? 95 : 70 },
    { subject: '乐器丰富度', A: result.keyInstruments.length * 20 },
    { subject: '风格辨识度', A: result.matchConfidence },
    { subject: '活跃度', A: 85 },
  ];

  const PianoIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1">
      {/* Piano Keyboard Base */}
      <rect x="15" y="25" width="70" height="50" rx="4" fill="#18181b" />
      
      {/* White Keys */}
      <rect x="18" y="28" width="12" height="44" rx="1" fill="white" />
      <rect x="32" y="28" width="12" height="44" rx="1" fill="white" />
      <rect x="46" y="28" width="12" height="44" rx="1" fill="white" />
      <rect x="60" y="28" width="12" height="44" rx="1" fill="white" />
      <rect x="74" y="28" width="8" height="44" rx="1" fill="white" />

      {/* Black Keys */}
      <rect x="27" y="28" width="6" height="26" rx="1" fill="#18181b" />
      <rect x="41" y="28" width="6" height="26" rx="1" fill="#18181b" />
      <rect x="65" y="28" width="6" height="26" rx="1" fill="#18181b" />
    </svg>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Badge */}
        <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#f4f4f5" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10 }} />
                <Radar name="Music" dataKey="A" stroke="#18181b" fill="#18181b" fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-500 rounded-full text-xs font-bold mb-2 tracking-wider uppercase">
                {result.genre}
              </span>
              <h2 className="text-3xl font-bold text-zinc-900">{songTitle || '识别结果'}</h2>
              <p className="text-zinc-500 mt-1">{result.subGenre} • {result.era}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {result.characteristics.slice(0, 4).map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-zinc-50 border border-zinc-100 text-zinc-600 rounded-lg text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Confidence Card */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-lg">
          <div className="text-5xl font-black mb-2">{result.matchConfidence}%</div>
          <div className="text-zinc-400 text-sm font-medium">识别匹配度</div>
          <div className="mt-6 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-white h-full transition-all duration-1000" style={{ width: `${result.matchConfidence}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Details Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 space-y-6">
          <h3 className="text-lg font-bold text-zinc-900 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
            </svg>
            音乐细节
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-50 rounded-2xl">
              <div className="text-xs text-zinc-400 mb-1 uppercase tracking-widest font-bold">情绪氛围</div>
              <div className="text-zinc-800 font-medium">{result.mood}</div>
            </div>
            <div className="p-4 bg-zinc-50 rounded-2xl">
              <div className="text-xs text-zinc-400 mb-1 uppercase tracking-widest font-bold">节奏速度</div>
              <div className="text-zinc-800 font-medium">{result.tempo}</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-400 mb-3 uppercase tracking-widest font-bold">核心乐器</div>
            <div className="flex flex-wrap gap-2">
              {result.keyInstruments.map((inst, i) => (
                <span key={i} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-full text-xs font-medium">
                  {inst}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sesame Comment Card */}
        <div className="bg-yellow-50 rounded-3xl p-8 border border-yellow-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-24 h-24 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
            </svg>
          </div>
          <div className="relative">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm mx-auto overflow-hidden border-2 border-yellow-200">
              <PianoIcon />
            </div>
            <h4 className="font-bold text-yellow-900 mb-2">芝麻糊的小心思</h4>
            <p className="text-yellow-800 text-sm leading-relaxed font-medium italic">
              "{result.sesameComment}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
