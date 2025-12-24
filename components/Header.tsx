
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 flex flex-col items-center justify-center text-center">
      <div className="relative mb-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-white overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full p-2">
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
        </div>
        <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full shadow-md">
          <svg className="w-5 h-5 text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.804l8-1.6V11a2 2 0 11-2 2 2 2 0 012-2V3z"></path>
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-zinc-800 tracking-[0.3em] pl-[0.3em]">芝麻糊听音乐</h1>
      <p className="mt-2 text-zinc-500 font-medium">音乐是流动的DNA</p>
    </header>
  );
};

export default Header;
