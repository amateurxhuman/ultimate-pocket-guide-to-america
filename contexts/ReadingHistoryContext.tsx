
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
}

const ReadingHistoryContext = createContext<ReadingHistoryContextType | undefined>(undefined);

const LAST_READ_KEY = 'app_last_read_item';
const RECENTLY_VIEWED_KEY = 'app_recently_viewed';
const MAX_RECENT_ITEMS = 5;

export function ReadingHistoryProvider({ children }: { children: ReactNode }) {
  const [lastReadItem, setLastReadItem] = useState<ReadingItem | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<ReadingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const [lastReadData, recentlyViewedData] = await Promise.all([
        AsyncStorage.getItem(LAST_READ_KEY),
        AsyncStorage.getItem(RECENTLY_VIEWED_KEY),
      ]);

      if (lastReadData) {
        setLastReadItem(JSON.parse(lastReadData));
      }

      if (recentlyViewedData) {
        setRecentlyViewed(JSON.parse(recentlyViewedData));
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Error loading reading history:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addToHistory = async (item: Omit<ReadingItem, 'timestamp'>) => {
    try {
      const newItem: ReadingItem = {
        ...item,
        timestamp: Date.now(),
      };

      setLastReadItem(newItem);
      await AsyncStorage.setItem(LAST_READ_KEY, JSON.stringify(newItem));

      setRecentlyViewed((prev) => {
        const filtered = prev.filter((i) => i.id !== item.id);
        const updated = [newItem, ...filtered].slice(0, MAX_RECENT_ITEMS);
        AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      if (__DEV__) {
        console.log('Error saving reading history:', error);
      }
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <ReadingHistoryContext.Provider value={{ lastReadItem, recentlyViewed, addToHistory }}>
      {children}
    </ReadingHistoryContext.Provider>
  );
}

export function useReadingHistory() {
  const context = useContext(ReadingHistoryContext);
  if (!context) {
    throw new Error('useReadingHistory must be used within ReadingHistoryProvider');
  }
  return context;
}
