import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: {
    background: string;
    surface: string;
    surfaceSecondary: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    primary: string;
    primaryLight: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    border: string;
    borderLight: string;
    shadow: string;
    overlay: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Enhanced color palettes for better contrast and accessibility
const lightColors = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  surfaceSecondary: '#F1F3F4',
  text: '#1A1A1A',
  textSecondary: '#4A5568',
  textTertiary: '#718096',
  primary: '#8B5CF6',
  primaryLight: '#E8D5FF',
  secondary: '#10B981',
  accent: '#F59E0B',
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

const darkColors = {
  background: '#0F0F23',
  surface: '#1A1A2E',
  surfaceSecondary: '#16213E',
  text: '#F7FAFC',
  textSecondary: '#CBD5E0',
  textTertiary: '#A0AEC0',
  primary: '#A78BFA',
  primaryLight: '#6366F1',
  secondary: '#34D399',
  accent: '#FBBF24',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#F87171',
  border: '#2D3748',
  borderLight: '#4A5568',
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    // Initialize from system preference
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}