
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Href } from 'expo-router';

export interface TabBarItem {
  name: string;
  route: Href;
  icon: keyof typeof MaterialIcons.glyphMap;
  iosIcon?: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
}

export default function FloatingTabBar({ tabs }: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, isDark } = useTheme();
  const animatedValue = useSharedValue(0);

  const activeTabIndex = React.useMemo(() => {
    let bestMatch = -1;
    let bestMatchScore = 0;

    tabs.forEach((tab, index) => {
      let score = 0;

      if (pathname === tab.route) {
        score = 100;
      } else if (pathname.startsWith(tab.route as string)) {
        score = 80;
      } else if (pathname.includes(tab.name)) {
        score = 60;
      } else if (tab.route.includes('/(tabs)/') && pathname.includes(tab.route.split('/(tabs)/')[1])) {
        score = 40;
      }

      if (score > bestMatchScore) {
        bestMatchScore = score;
        bestMatch = index;
      }
    });

    return bestMatch >= 0 ? bestMatch : 0;
  }, [pathname, tabs]);

  React.useEffect(() => {
    if (activeTabIndex >= 0) {
      animatedValue.value = withSpring(activeTabIndex, {
        damping: 20,
        stiffness: 120,
        mass: 1,
      });
    }
  }, [activeTabIndex, animatedValue]);

  const handleTabPress = (route: Href) => {
    router.push(route);
  };

  const tabWidth = 100 / tabs.length;

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            animatedValue.value,
            [0, tabs.length - 1],
            [0, (tabs.length - 1) * (100 / tabs.length)]
          ),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={[styles.container, { backgroundColor: '#000000' }]}>
        <Animated.View 
          style={[
            styles.indicator, 
            indicatorStyle,
            { 
              width: `${tabWidth}%`,
              backgroundColor: colors.primary + '20',
            }
          ]} 
        />
        <View style={styles.tabsContainer}>
          {tabs.map((tab, index) => {
            const isActive = activeTabIndex === index;

            return (
              <TouchableOpacity
                key={index}
                style={[styles.tab, { width: `${tabWidth}%` }]}
                onPress={() => handleTabPress(tab.route)}
                activeOpacity={0.7}
                accessibilityLabel={`Navigate to ${tab.label}`}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <View style={styles.tabContent}>
                  <IconSymbol
                    android_material_icon_name={tab.icon}
                    ios_icon_name={tab.iosIcon || tab.icon}
                    size={26}
                    color={isActive ? colors.primary : '#888888'}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      { 
                        color: isActive ? colors.primary : '#888888',
                        fontWeight: isActive ? '700' : '500',
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#000000',
  },
  container: {
    width: '100%',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 3,
    borderRadius: 1.5,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minHeight: 44,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15.95,
  },
});
