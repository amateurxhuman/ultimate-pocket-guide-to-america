import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ReadingItem {
  id: string;
  title: string;
  section: string;
  timestamp: number;
}

interface ReadingHistoryContextType {
  lastReadItem: ReadingItem | null;
  recentlyViewed: ReadingItem[];
  addToHistory: (item: Omit<ReadingItem, 'timestamp'>) => Promise<void>;
  clearHistory: () => Promise<void>;
  removeFromHistory: (id: string) => Promise<void>;
  isLoaded: boolean;
}

const ReadingHistoryContext = createContext<ReadingHistoryContextType | undefined>(undefined);

const LAST_READ_KEY = 'app_last_read_item';
const RECENTLY_VIEWED_KEY = 'app_recently_viewed';
const MAX_RECENT_ITEMS = 10; // Increased from 5 for better history

/**
 * Reading History Provider Component
 * Manages user's reading history with persistence
 */
export function ReadingHistoryProvider({ children }: { children: ReactNode }) {
  const [lastReadItem, setLastReadItem] = useState<ReadingItem | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<ReadingItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Load history on mount
   */
  useEffect(() => {
    loadHistory();
  }, []);

  /**
   * Load reading history from AsyncStorage
   */
  const loadHistory = async () => {
    try {
      const [lastReadData, recentlyViewedData] = await Promise.all([
        AsyncStorage.getItem(LAST_READ_KEY),
        AsyncStorage.getItem(RECENTLY_VIEWED_KEY),
      ]);

      if (lastReadData) {
        try {
          const parsed = JSON.parse(lastReadData);
          setLastReadItem(parsed);
        } catch (parseError) {
          if (__DEV__) {
            console.error('Error parsing last read item:', parseError);
          }
        }
      }

      if (recentlyViewedData) {
        try {
          const parsed = JSON.parse(recentlyViewedData);
          // Validate it's an array
          setRecentlyViewed(Array.isArray(parsed) ? parsed : []);
        } catch (parseError) {
          if (__DEV__) {
            console.error('Error parsing recently viewed:', parseError);
          }
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error loading reading history:', error);
      }
    } finally {
      setIsLoaded(true);
    }
  };

  /**
   * Add item to reading history
   */
  const addToHistory = useCallback(async (item: Omit<ReadingItem, 'timestamp'>): Promise<void> => {
    try {
      const newItem: ReadingItem = {
        ...item,
        timestamp: Date.now(),
      };

      // Update last read item
      setLastReadItem(newItem);
      await AsyncStorage.setItem(LAST_READ_KEY, JSON.stringify(newItem));

      // Update recently viewed list
      setRecentlyViewed((prev) => {
        // Remove existing entry if present
        const filtered = prev.filter((i) => i.id !== item.id);
        // Add to front and limit size
        const updated = [newItem, ...filtered].slice(0, MAX_RECENT_ITEMS);
        
        // Save asynchronously
        AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated)).catch((error) => {
          if (__DEV__) {
            console.error('Error saving recently viewed:', error);
          }
        });
        
        return updated;
      });
    } catch (error) {
      if (__DEV__) {
        console.error('Error saving reading history:', error);
      }
      throw error;
    }
  }, []);

  /**
   * Clear all reading history
   */
  const clearHistory = useCallback(async (): Promise<void> => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(LAST_READ_KEY),
        AsyncStorage.removeItem(RECENTLY_VIEWED_KEY),
      ]);
      
      setLastReadItem(null);
      setRecentlyViewed([]);
    } catch (error) {
      if (__DEV__) {
        console.error('Error clearing reading history:', error);
      }
      throw error;
    }
  }, []);

  /**
   * Remove specific item from history
   */
  const removeFromHistory = useCallback(async (id: string): Promise<void> => {
    try {
      setRecentlyViewed((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        
        // Save asynchronously
        AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated)).catch((error) => {
          if (__DEV__) {
            console.error('Error saving recently viewed:', error);
          }
        });
        
        return updated;
      });

      // If removed item was last read, clear it
      if (lastReadItem?.id === id) {
        setLastReadItem(null);
        await AsyncStorage.removeItem(LAST_READ_KEY);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error removing from history:', error);
      }
      throw error;
    }
  }, [lastReadItem]);

  /**
   * Memoize context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({
      lastReadItem,
      recentlyViewed,
      addToHistory,
      clearHistory,
      removeFromHistory,
      isLoaded,
    }),
    [lastReadItem, recentlyViewed, addToHistory, clearHistory, removeFromHistory, isLoaded]
  );

  return (
    <ReadingHistoryContext.Provider value={contextValue}>
      {children}
    </ReadingHistoryContext.Provider>
  );
}

/**
 * Hook to access reading history context
 * @throws Error if used outside ReadingHistoryProvider
 */
export function useReadingHistory(): ReadingHistoryContextType {
  const context = useContext(ReadingHistoryContext);
  
  if (!context) {
    throw new Error('useReadingHistory must be used within ReadingHistoryProvider');
  }
  
  return context;
}

/**
 * Export constants for use elsewhere if needed
 */
export { MAX_RECENT_ITEMS };
export type { ReadingItem };