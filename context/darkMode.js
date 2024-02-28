import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme, StatusBar } from 'react-native';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [useDarkMode, setUseDarkMode] = useState('');
  const isDarkMode = useColorScheme() === useDarkMode;

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'dark-content' : 'light-content');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setUseDarkMode((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
      throw new Error('useDarkModeContext must be used within a DarkModeProvider');
    }
    return context;
  };
