import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TextSize = 'small' | 'default' | 'large' | 'extra-large';

interface TextSizeContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => Promise<void>;
  getTextSizeMultiplier: () => number;
  getFontSize: (baseSize: number) => number;
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);
const TEXT_SIZE_STORAGE_KEY = 'app_text_size_preference';

/**
 * Text size multipliers for accessibility
 */
const TEXT_SIZE_MULTIPLIERS: Record<TextSize, number> = {
  'small': 0.85,
  'default': 1.0,
  'large': 1.15,
  'extra-large': 1.3,
};

/**
 * Text Size Provider Component
 * Manages app-wide text size preferences for accessibility
 */
export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSizeState] = useState<TextSize>('default');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load saved text size preference on mount
   */
  useEffect(() => {
    loadTextSizePreference();
  }, []);

  /**
   * Load text size preference from AsyncStorage
   */
  const loadTextSizePreference = async () => {
    try {
      const savedSize = await AsyncStorage.getItem(TEXT_SIZE_STORAGE_KEY);
      
      // Validate saved size
      if (
        savedSize && 
        (savedSize === 'small' || 
         savedSize === 'default' || 
         savedSize === 'large' || 
         savedSize === 'extra-large')
      ) {
        setTextSizeState(savedSize as TextSize);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error loading text size preference:', error);
      }
      // Default to 'default' on error
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update text size and persist to storage
   */
  const setTextSize = async (newSize: TextSize): Promise<void> => {
    try {
      await AsyncStorage.setItem(TEXT_SIZE_STORAGE_KEY, newSize);
      setTextSizeState(newSize);
    } catch (error) {
      if (__DEV__) {
        console.error('Error saving text size preference:', error);
      }
      // Still update UI even if save fails
      setTextSizeState(newSize);
      throw error; // Re-throw so caller knows save failed
    }
  };

  /**
   * Get current text size multiplier
   */
  const getTextSizeMultiplier = useCallback(() => {
    return TEXT_SIZE_MULTIPLIERS[textSize];
  }, [textSize]);

  /**
   * Calculate font size based on base size and current multiplier
   * Utility function for easy font size calculation
   */
  const getFontSize = useCallback((baseSize: number): number => {
    return baseSize * TEXT_SIZE_MULTIPLIERS[textSize];
  }, [textSize]);

  /**
   * Memoize context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({
      textSize,
      setTextSize,
      getTextSizeMultiplier,
      getFontSize,
    }),
    [textSize, getTextSizeMultiplier, getFontSize]
  );

  // Show nothing while loading (prevents flash)
  if (isLoading) {
    return null;
  }

  return (
    <TextSizeContext.Provider value={contextValue}>
      {children}
    </TextSizeContext.Provider>
  );
}

/**
 * Hook to access text size context
 * @throws Error if used outside TextSizeProvider
 */
export function useTextSize(): TextSizeContextType {
  const context = useContext(TextSizeContext);
  
  if (!context) {
    throw new Error('useTextSize must be used within TextSizeProvider');
  }
  
  return context;
}

/**
 * Export multipliers for use in static styles if needed
 */
export { TEXT_SIZE_MULTIPLIERS };