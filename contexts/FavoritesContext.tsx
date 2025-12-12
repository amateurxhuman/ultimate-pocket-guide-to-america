import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
  clearAllFavorites: () => Promise<void>;
  getFavoritesCount: () => number;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * Favorites Provider Component
 * Manages user's favorited items with persistence
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Load favorites on mount
   */
  useEffect(() => {
    loadFavorites();
  }, []);

  /**
   * Load favorites from AsyncStorage
   */
  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      
      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites);
        // Validate it's an array
        setFavorites(Array.isArray(parsed) ? parsed : []);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error loading favorites:', error);
      }
      setFavorites([]);
    } finally {
      setIsLoaded(true);
    }
  };

  /**
   * Save favorites to AsyncStorage
   * Centralized save function to avoid duplication
   */
  const saveFavorites = async (newFavorites: string[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      if (__DEV__) {
        console.error('Error saving favorites:', error);
      }
      throw error;
    }
  };

  /**
   * Add item to favorites
   */
  const addFavorite = useCallback(async (id: string): Promise<void> => {
    setFavorites((current) => {
      // Prevent duplicates
      if (current.includes(id)) {
        return current;
      }
      
      const newFavorites = [...current, id];
      
      // Save asynchronously
      saveFavorites(newFavorites).catch((error) => {
        if (__DEV__) {
          console.error('Error saving favorites:', error);
        }
      });
      
      return newFavorites;
    });
  }, []);

  /**
   * Remove item from favorites
   */
  const removeFavorite = useCallback(async (id: string): Promise<void> => {
    setFavorites((current) => {
      const newFavorites = current.filter((fav) => fav !== id);
      
      // Save asynchronously
      saveFavorites(newFavorites).catch((error) => {
        if (__DEV__) {
          console.error('Error saving favorites:', error);
        }
      });
      
      return newFavorites;
    });
  }, []);

  /**
   * Toggle favorite status
   */
  const toggleFavorite = useCallback(async (id: string): Promise<void> => {
    setFavorites((current) => {
      const newFavorites = current.includes(id)
        ? current.filter((fav) => fav !== id)
        : [...current, id];
      
      // Save asynchronously
      saveFavorites(newFavorites).catch((error) => {
        if (__DEV__) {
          console.error('Error saving favorites:', error);
        }
      });
      
      return newFavorites;
    });
  }, []);

  /**
   * Check if item is favorited
   */
  const isFavorite = useCallback((id: string): boolean => {
    return favorites.includes(id);
  }, [favorites]);

  /**
   * Clear all favorites
   */
  const clearAllFavorites = useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
      setFavorites([]);
    } catch (error) {
      if (__DEV__) {
        console.error('Error clearing favorites:', error);
      }
      throw error;
    }
  }, []);

  /**
   * Get total count of favorites
   */
  const getFavoritesCount = useCallback((): number => {
    return favorites.length;
  }, [favorites]);

  /**
   * Memoize context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      clearAllFavorites,
      getFavoritesCount,
      isLoaded,
    }),
    [favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, clearAllFavorites, getFavoritesCount, isLoaded]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook to access favorites context
 * @throws Error if used outside FavoritesProvider
 */
export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  
  return context;
}