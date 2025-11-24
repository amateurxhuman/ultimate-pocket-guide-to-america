
// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "@/components/IconSymbol";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.highlight,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      {/* HOME (group route: app/(tabs)/(home)/index.tsx) */}
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="home"
              ios_icon_name="house.fill"
              size={size ?? 24}
            />
          ),
        }}
      />

      {/* Section pages - hidden from tab bar but still accessible via navigation */}
      <Tabs.Screen
        name="foundations"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="civic-literacy"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="political-landscape"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="principles-practice"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="land-life"
        options={{
          href: null,
        }}
      />

      {/* MAP (app/(tabs)/map/index.tsx) */}
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="map"
              ios_icon_name="map.fill"
              size={size ?? 24}
            />
          ),
        }}
      />

      {/* QUIZ (app/(tabs)/quiz/index.tsx) */}
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="help"
              ios_icon_name="questionmark.circle.fill"
              size={size ?? 24}
            />
          ),
        }}
      />

      {/* SEARCH (app/(tabs)/search/index.tsx) */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="search"
              ios_icon_name="magnifyingglass"
              size={size ?? 24}
            />
          ),
        }}
      />

      {/* GLOSSARY (app/(tabs)/glossary/index.tsx) */}
      <Tabs.Screen
        name="glossary"
        options={{
          title: "Glossary",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="menu_book"
              ios_icon_name="book.fill"
              size={size ?? 24}
            />
          ),
        }}
      />

      {/* FAVORITES (app/(tabs)/favorites/index.tsx) */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="star"
              ios_icon_name="star.fill"
              size={size ?? 24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
