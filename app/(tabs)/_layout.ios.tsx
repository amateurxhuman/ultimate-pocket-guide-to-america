
import React from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      {/* Home tab */}
      <NativeTabs.Screen
        name="(home)"
        options={{
          title: 'Home',
        }}
      >
        <Label>Home</Label>
        <Icon name="house.fill" />
      </NativeTabs.Screen>
      
      {/* Section pages - hidden from tab bar but still accessible via navigation */}
      <NativeTabs.Screen
        name="foundations"
        options={{
          href: null,
        }}
      />
      <NativeTabs.Screen
        name="civic-literacy"
        options={{
          href: null,
        }}
      />
      <NativeTabs.Screen
        name="political-landscape"
        options={{
          href: null,
        }}
      />
      <NativeTabs.Screen
        name="principles-practice"
        options={{
          href: null,
        }}
      />
      <NativeTabs.Screen
        name="land-life"
        options={{
          href: null,
        }}
      />
      
      {/* Map tab */}
      <NativeTabs.Screen
        name="map"
        options={{
          title: 'Map',
        }}
      >
        <Label>Map</Label>
        <Icon name="map.fill" />
      </NativeTabs.Screen>
      
      {/* Quiz tab */}
      <NativeTabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
        }}
      >
        <Label>Quiz</Label>
        <Icon name="questionmark.circle.fill" />
      </NativeTabs.Screen>
      
      {/* Search tab */}
      <NativeTabs.Screen
        name="search"
        options={{
          title: 'Search',
        }}
      >
        <Label>Search</Label>
        <Icon name="magnifyingglass" />
      </NativeTabs.Screen>
      
      {/* Glossary tab */}
      <NativeTabs.Screen
        name="glossary"
        options={{
          title: 'Glossary',
        }}
      >
        <Label>Glossary</Label>
        <Icon name="book.fill" />
      </NativeTabs.Screen>
      
      {/* Favorites tab */}
      <NativeTabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
        }}
      >
        <Label>Favorites</Label>
        <Icon name="star.fill" />
      </NativeTabs.Screen>
    </NativeTabs>
  );
}
