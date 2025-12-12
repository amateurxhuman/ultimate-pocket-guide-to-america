import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { TextSizeProvider } from "@/contexts/TextSizeContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ReadingHistoryProvider } from "@/contexts/ReadingHistoryContext";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 * Inner layout component that consumes theme context
 * Handles the actual navigation stack configuration
 */
function RootLayoutContent() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar 
        style={isDark ? "light" : "dark"} 
        backgroundColor="transparent"
        translucent
      />
      <ReadingHistoryProvider>
        <FavoritesProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
              animation: 'fade', // Smooth transitions between screens
            }}
          >
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false,
              }} 
            />
            <Stack.Screen 
              name="detail/[id]" 
              options={{ 
                headerShown: true,
                presentation: "card",
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: isDark ? '#0A0A0A' : '#FAFAFA',
                },
                headerTintColor: isDark ? '#F5F5F5' : '#2C2C2C',
                headerShadowVisible: false,
              }} 
            />
            <Stack.Screen 
              name="document/[id]" 
              options={{ 
                headerShown: true,
                presentation: "card",
                animation: 'slide_from_right',
                headerStyle: {
                  backgroundColor: isDark ? '#0A0A0A' : '#FAFAFA',
                },
                headerTintColor: isDark ? '#F5F5F5' : '#2C2C2C',
                headerShadowVisible: false,
              }} 
            />
          </Stack>
        </FavoritesProvider>
      </ReadingHistoryProvider>
    </>
  );
}

/**
 * Root layout component - Entry point for the entire application
 * Wraps the app in necessary providers for theme, text size, favorites, and reading history
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <TextSizeProvider>
          <RootLayoutContent />
        </TextSizeProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});