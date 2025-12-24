
import React, { useState } from 'react';
import { InputMethod } from '../types';

interface InputSectionProps {
  onAnalyze: (type: 'text' | 'audio', content: string, mimeType?: string, fileName?: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<InputMethod>(InputMethod.UPLOAD);
  const [inputText, setInputText] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAnalyze('text', inputText.trim(), undefined, inputText.trim());
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        onAnalyze('audio', base64String, file.type, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden mb-8">
      <div className="flex border-b border-zinc-100">
        {[
          { id: InputMethod.UPLOAD, label: '上传音频', icon: (
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          )},
          { id: InputMethod.SEARCH, label: '歌名搜索', icon: (
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          )},
          { id: InputMethod.LINK, label: '粘贴链接', icon: (
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.242 9.172a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102 1.101"></path></svg>
          )}
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center py-4 text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-zinc-50 text-zinc-900 border-b-2 border-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-8">
        {activeTab === InputMethod.UPLOAD ? (
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); /* handle drop */ }}
            className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center transition-all ${
              dragActive ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200'
            }`}
          >
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
            <p className="text-zinc-600 font-medium mb-1">点击或拖拽音频文件到这里</p>
            <p className="text-zinc-400 text-xs mb-6">支持 MP3, WAV, AAC, M4A 等格式</p>
            <label className="cursor-pointer bg-zinc-900 text-white px-6 py-2 rounded-full font-medium hover:bg-zinc-800 transition-colors">
              选择文件
              <input type="file" className="hidden" accept="audio/*" onChange={handleFileUpload} disabled={isLoading} />
            </label>
          </div>
        ) : (
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={activeTab === InputMethod.SEARCH ? "输入歌曲名称，例如：告白气球..." : "粘贴音频或视频链接..."}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-4 pr-12 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-900 text-white rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:bg-zinc-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default InputSection;
