
import React, { useState } from 'react';
import { Stack, useRouter, usePathname } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';
import { useColorScheme } from 'react-native';

const menuItems = [
  { label: 'Home', route: '/(tabs)/(home)/index' },
  { label: 'Foundations', route: '/(tabs)/foundations' },
  { label: 'Civic Literacy', route: '/(tabs)/civic-literacy' },
  { label: 'Political Landscape', route: '/(tabs)/political-landscape' },
  { label: 'Principles in Practice', route: '/(tabs)/principles-practice' },
  { label: 'Land and Life', route: '/(tabs)/land-life' },
  { label: 'Map', route: '/(tabs)/map' },
  { label: 'Quiz', route: '/(tabs)/quiz' },
  { label: 'Search', route: '/(tabs)/search' },
  { label: 'Glossary', route: '/(tabs)/glossary' },
  { label: 'Favorites', route: '/(tabs)/favorites' },
];

function HamburgerButton({ onPress }: { onPress: () => void }) {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? darkColors : colors;
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.hamburgerButton}
      activeOpacity={0.7}
    >
      <IconSymbol
        ios_icon_name="line.3.horizontal"
        android_material_icon_name="menu"
        size={24}
        color={themeColors.text}
      />
    </TouchableOpacity>
  );
}

function HamburgerMenu({ 
  visible, 
  onClose, 
  onNavigate 
}: { 
  visible: boolean; 
  onClose: () => void; 
  onNavigate: (route: string) => void;
}) {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? darkColors : colors;
  const pathname = usePathname();

  return (
    <Modal 
      visible={visible} 
      transparent 
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        style={styles.modalOverlay} 
        onPress={onClose}
      >
        <Pressable 
          style={[
            styles.menuContainer,
            { backgroundColor: themeColors.background }
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={[
            styles.menuHeader,
            { borderBottomColor: themeColors.secondary }
          ]}>
            <Text style={[
              styles.menuTitle,
              { color: themeColors.text }
            ]}>
              Menu
            </Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="xmark"
                android_material_icon_name="close"
                size={24}
                color={themeColors.text}
              />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.menuScrollView}
            showsVerticalScrollIndicator={false}
          >
            {menuItems.map((item, index) => {
              const isActive = pathname.includes(item.route.replace('/(tabs)', ''));
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItem,
                    { borderBottomColor: themeColors.secondary + '40' },
                    isActive && { backgroundColor: themeColors.highlight }
                  ]}
                  onPress={() => onNavigate(item.route)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.menuItemText,
                    { color: themeColors.text },
                    isActive && { 
                      color: themeColors.primary,
                      fontWeight: '700'
                    }
                  ]}>
                    {item.label}
                  </Text>
                  {isActive && (
                    <IconSymbol
                      ios_icon_name="chevron.right"
                      android_material_icon_name="chevron_right"
                      size={20}
                      color={themeColors.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function TabLayout() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? darkColors : colors;

  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  const navigateTo = (route: string) => {
    closeMenu();
    // Use setTimeout to ensure menu closes before navigation
    setTimeout(() => {
      router.push(route as any);
    }, 100);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerLeft: () => <HamburgerButton onPress={openMenu} />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: themeColors.background,
          },
          headerTintColor: themeColors.text,
          headerShadowVisible: true,
          headerBlurEffect: colorScheme === 'dark' ? 'dark' : 'light',
        }}
      >
        <Stack.Screen
          name="(home)"
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="foundations"
          options={{
            title: 'Foundations',
          }}
        />
        <Stack.Screen
          name="civic-literacy"
          options={{
            title: 'Civic Literacy',
          }}
        />
        <Stack.Screen
          name="political-landscape"
          options={{
            title: 'Political Landscape',
          }}
        />
        <Stack.Screen
          name="principles-practice"
          options={{
            title: 'Principles in Practice',
          }}
        />
        <Stack.Screen
          name="land-life"
          options={{
            title: 'Land and Life',
          }}
        />
        <Stack.Screen
          name="map"
          options={{
            title: 'Map',
          }}
        />
        <Stack.Screen
          name="quiz"
          options={{
            title: 'Quiz',
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            title: 'Search',
          }}
        />
        <Stack.Screen
          name="glossary"
          options={{
            title: 'Glossary',
          }}
        />
        <Stack.Screen
          name="favorites"
          options={{
            title: 'Favorites',
          }}
        />
      </Stack>

      <HamburgerMenu
        visible={isMenuVisible}
        onClose={closeMenu}
        onNavigate={navigateTo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hamburgerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuContainer: {
    width: 280,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  menuScrollView: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
