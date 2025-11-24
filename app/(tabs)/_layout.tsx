
import React from "react";
import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#FBBF24',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      {/* HOME TAB */}
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              android_material_icon_name="home"
              ios_icon_name="house.fill"
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* MAP TAB */}
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              android_material_icon_name="map"
              ios_icon_name="map.fill"
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* QUIZ TAB */}
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              android_material_icon_name="help"
              ios_icon_name="questionmark.circle.fill"
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* SEARCH TAB */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              android_material_icon_name="search"
              ios_icon_name="magnifyingglass"
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* GLOSSARY TAB */}
      <Tabs.Screen
        name="glossary"
        options={{
          title: "Glossary",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              android_material_icon_name="menu_book"
              ios_icon_name="book.fill"
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* FAVORITES TAB */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              android_material_icon_name="star"
              ios_icon_name="star.fill"
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* HIDDEN SCREENS - Not shown in tab bar */}
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
    </Tabs>
  );
}
