
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TextSize = 'small' | 'default' | 'large' | 'extra-large';

interface TextSizeContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  getTextSizeMultiplier: () => number;
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);
const TEXT_SIZE_STORAGE_KEY = 'app_text_size_preference';

const TEXT_SIZE_MULTIPLIERS: Record<TextSize, number> = {
  'small': 0.85,
  'default': 1.0,
  'large': 1.15,
  'extra-large': 1.3,
};

export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSizeState] = useState<TextSize>('default');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTextSizePreference();
  }, []);

  const loadTextSizePreference = async () => {
    try {
      const savedSize = await AsyncStorage.getItem(TEXT_SIZE_STORAGE_KEY);
      if (savedSize && (savedSize === 'small' || savedSize === 'default' || savedSize === 'large' || savedSize === 'extra-large')) {
        setTextSizeState(savedSize as TextSize);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Error loading text size preference:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setTextSize = async (newSize: TextSize) => {
    try {
      await AsyncStorage.setItem(TEXT_SIZE_STORAGE_KEY, newSize);
      setTextSizeState(newSize);
    } catch (error) {
      if (__DEV__) {
        console.log('Error saving text size preference:', error);
      }
      setTextSizeState(newSize);
    }
  };

  const getTextSizeMultiplier = () => {
    return TEXT_SIZE_MULTIPLIERS[textSize];
  };

  if (isLoading) {
    return null;
  }

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize, getTextSizeMultiplier }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  const context = useContext(TextSizeContext);
  if (!context) {
    throw new Error('useTextSize must be used within TextSizeProvider');
  }
  return context;
}
