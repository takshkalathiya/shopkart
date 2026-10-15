import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = [
  {
    id: 'sunset',
    name: 'Sunset Crimson',
    sub: 'Radiant Amber',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e, #f97316)',
  },
  {
    id: 'indigo',
    name: 'Royal Indigo',
    sub: 'Violet Glow',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    id: 'emerald',
    name: 'Luxury Emerald',
    sub: 'Champagne Gold',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #f59e0b)',
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    sub: 'Neon Azure',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
  },
  {
    id: 'obsidian',
    name: 'Obsidian Noir',
    sub: 'Titanium Frost',
    color: '#e2e8f0',
    gradient: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
  },
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('luna_theme');
      return saved && ['sunset', 'indigo', 'emerald', 'cyan', 'obsidian'].includes(saved)
        ? saved
        : 'sunset';
    } catch {
      return 'sunset';
    }
  });

  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('luna_mode') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-mode', mode);
      document.body.setAttribute('data-theme', theme);
      document.body.setAttribute('data-mode', mode);
      localStorage.setItem('luna_theme', theme);
      localStorage.setItem('luna_mode', mode);
    } catch (e) {
      console.error('Failed to set theme attribute:', e);
    }
  }, [theme, mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, setMode, toggleMode, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'sunset',
      setTheme: () => {},
      mode: 'dark',
      setMode: () => {},
      toggleMode: () => {},
      themes: THEMES,
    };
  }
  return context;
};

export default ThemeContext;
