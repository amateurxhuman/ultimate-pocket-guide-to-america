
import React from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs
      tabBarOptions={{
        style: {
          backgroundColor: '#000000',
        },
        activeTintColor: '#FBBF24',
        inactiveTintColor: '#FFFFFF',
      }}
    >
      {/* HOME TAB */}
      <NativeTabs.Screen
        name="(home)"
        options={{
          title: 'Home',
        }}
      >
        <Label>Home</Label>
        <Icon name="house.fill" />
      </NativeTabs.Screen>
      
      {/* MAP TAB */}
      <NativeTabs.Screen
        name="map"
        options={{
          title: 'Map',
        }}
      >
        <Label>Map</Label>
        <Icon name="map.fill" />
      </NativeTabs.Screen>
      
      {/* QUIZ TAB */}
      <NativeTabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
        }}
      >
        <Label>Quiz</Label>
        <Icon name="questionmark.circle.fill" />
      </NativeTabs.Screen>
      
      {/* SEARCH TAB */}
      <NativeTabs.Screen
        name="search"
        options={{
          title: 'Search',
        }}
      >
        <Label>Search</Label>
        <Icon name="magnifyingglass" />
      </NativeTabs.Screen>
      
      {/* GLOSSARY TAB */}
      <NativeTabs.Screen
        name="glossary"
        options={{
          title: 'Glossary',
        }}
      >
        <Label>Glossary</Label>
        <Icon name="book.fill" />
      </NativeTabs.Screen>
      
      {/* FAVORITES TAB */}
      <NativeTabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
        }}
      >
        <Label>Favorites</Label>
        <Icon name="star.fill" />
      </NativeTabs.Screen>

      {/* HIDDEN SCREENS - Not shown in tab bar but still accessible via navigation */}
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
    </NativeTabs>
  );
}
