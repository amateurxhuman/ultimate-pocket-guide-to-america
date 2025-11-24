
import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="detail/[id]" 
            options={{ 
              headerShown: true,
              presentation: "card",
            }} 
          />
          <Stack.Screen 
            name="document/[id]" 
            options={{ 
              headerShown: true,
              presentation: "card",
            }} 
          />
        </Stack>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
