"use client";

import React, { useEffect, useState } from 'react';

const THEMES = ['default', 'sunset', 'pastel'] as const;
export type ThemeName = (typeof THEMES)[number];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>('default');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('site.theme') as ThemeName | null;
      if (saved && THEMES.includes(saved)) {
        setTheme(saved);
        applyTheme(saved);
      } else {
        applyTheme('default');
      }
    } catch (e) {
      applyTheme('default');
    }
  }, []);

  function applyTheme(t: ThemeName) {
    const html = document.documentElement;
    THEMES.forEach((k) => html.classList.remove(`theme-${k}`));
    html.classList.add(`theme-${t}`);
  }

  function handleChange(t: ThemeName) {
    try {
      localStorage.setItem('site.theme', t);
    } catch (e) {}
    setTheme(t);
    applyTheme(t);
  }

  return (
    <div className="flex items-center gap-2">
      {THEMES.map((t) => (
        <button
          key={t}
          aria-pressed={theme === t}
          onClick={() => handleChange(t)}
          className={`h-7 w-7 rounded-md ring-offset-1 transition-all ${theme === t ? 'ring-2 ring-white/30' : 'opacity-80 hover:opacity-100'}`}
          title={t}
        >
          <span className={`block h-full w-full rounded-sm ${t === 'default' ? 'bg-gradient-to-br from-cyan-300 via-violet-400 to-rose-400' : ''} ${t === 'sunset' ? 'bg-black' : ''} ${t === 'pastel' ? 'bg-white border border-white/20' : ''}`} />
        </button>
      ))}
    </div>
  );
}
