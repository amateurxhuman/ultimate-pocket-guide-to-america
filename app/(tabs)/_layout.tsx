// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "@/components/IconSymbol";

export default function TabsLayout() {
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
        },
      }}
    >
      {/* HOME GROUP */}
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="home"
              size={size ?? 24}
            />
          ),
        }}
      />

      {/* MAIN SECTIONS */}
      <Tabs.Screen
        name="foundations"
        options={{
          title: "Foundations",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="book"
              size={size ?? 24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="civic-literacy"
        options={{
          title: "Civic Literacy",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="school"
              size={size ?? 24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="political-landscape"
        options={{
          title: "Political Landscape",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="flag"
              size={size ?? 24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="principles-practice"
        options={{
          title: "Principles in Practice",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="balance"
              size={size ?? 24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="land-life"
        options={{
          title: "Land and Life",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="public"
              size={size ?? 24}
            />
          ),
        }}
      />

      {/* UTILITIES */}
      <Tabs.Screen
        name="glossary"
        options={{
          title: "Glossary",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="menu_book"
              size={size ?? 24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="star"
              size={size ?? 24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="map"
              size={size ?? 24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="help"
              size={size ?? 24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size }) => (
            <IconSymbol
              android_material_icon_name="search"
              size={size ?? 24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
