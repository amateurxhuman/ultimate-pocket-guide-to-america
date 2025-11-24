
import React from 'react';
import { NativeTabs, Icon } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      {/* Home tab */}
      <NativeTabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Icon name="house.fill" color={color} size={size} />,
        }}
      />
      
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
          tabBarIcon: ({ color, size }) => <Icon name="map.fill" color={color} size={size} />,
        }}
      />
      
      {/* Quiz tab */}
      <NativeTabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color, size }) => <Icon name="questionmark.circle.fill" color={color} size={size} />,
        }}
      />
      
      {/* Search tab */}
      <NativeTabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Icon name="magnifyingglass" color={color} size={size} />,
        }}
      />
      
      {/* Glossary tab */}
      <NativeTabs.Screen
        name="glossary"
        options={{
          title: 'Glossary',
          tabBarIcon: ({ color, size }) => <Icon name="book.fill" color={color} size={size} />,
        }}
      />
      
      {/* Favorites tab */}
      <NativeTabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Icon name="star.fill" color={color} size={size} />,
        }}
      />
    </NativeTabs>
  );
}
