
import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Href } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

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

/**
 * Premium Floating Tab Bar with glassmorphism and smooth animations
 */
export default function FloatingTabBar({ tabs }: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, isDark, shadows, animations } = useTheme();
  const animatedValue = useSharedValue(0);

  /**
   * Determine active tab index with improved matching logic
   */
  const activeTabIndex = React.useMemo(() => {
    let bestMatch = -1;
    let bestMatchScore = 0;

    tabs.forEach((tab, index) => {
      let score = 0;
      const tabRoute = String(tab.route);

      // Exact match
      if (pathname === tabRoute) {
        score = 100;
      }
      // Check if pathname starts with the tab route
      else if (pathname.startsWith(tabRoute)) {
        score = 80;
      }
      // Check for home route special case
      else if (tabRoute.includes('(home)') && (pathname === '/' || pathname.includes('(home)'))) {
        score = 90;
      }
      // Check for favorites route
      else if (tabRoute.includes('favorites') && pathname.includes('favorites')) {
        score = 85;
      }
      // Check for search route
      else if (tabRoute.includes('search') && pathname.includes('search')) {
        score = 85;
      }
      // Check for glossary route
      else if (tabRoute.includes('glossary') && pathname.includes('glossary')) {
        score = 85;
      }
      // Check for settings route
      else if (tabRoute.includes('settings') && pathname.includes('settings')) {
        score = 85;
      }
      // Check if the tab name is in the pathname
      else if (pathname.includes(tab.name)) {
        score = 60;
      }

      if (score > bestMatchScore) {
        bestMatchScore = score;
        bestMatch = index;
      }
    });

    return bestMatch >= 0 ? bestMatch : 0;
  }, [pathname, tabs]);

  /**
   * Animate indicator on tab change
   */
  React.useEffect(() => {
    if (activeTabIndex >= 0) {
      animatedValue.value = withSpring(activeTabIndex, {
        damping: 25,
        stiffness: 150,
        mass: 1,
      });
    }
  }, [activeTabIndex, animatedValue]);

  /**
   * Handle tab press with haptic feedback
   */
  const handleTabPress = useCallback((route: Href) => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    try {
      console.log('Navigating to:', route);
      router.push(route);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [router]);

  const tabWidth = 100 / tabs.length;

  /**
   * Animated indicator style
   */
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

  /**
   * Get icon color with smooth animation
   */
  const getIconColor = (isActive: boolean) => {
    return isActive ? colors.primary : colors.textSecondary;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      {/* Glassmorphism container */}
      <BlurView
        intensity={isDark ? 80 : 60}
        tint={isDark ? 'dark' : 'light'}
        style={[styles.blurContainer]}
      >
        <LinearGradient
          colors={
            isDark
              ? ['rgba(26, 26, 26, 0.95)', 'rgba(10, 10, 10, 0.98)']
              : ['rgba(250, 250, 250, 0.95)', 'rgba(255, 255, 255, 0.98)']
          }
          style={styles.gradientContainer}
        >
          {/* Top border with gradient */}
          <LinearGradient
            colors={[
              colors.primary + '00',
              colors.primary + '40',
              colors.primary + '00',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.topBorder}
          />

          {/* Animated indicator - now a pill shape */}
          <Animated.View
            style={[
              styles.indicatorPill,
              indicatorStyle,
              { 
                width: `${tabWidth - 4}%`,
              },
            ]}
          >
            <LinearGradient
              colors={[
                colors.primary + 'E6',
                colors.primary,
                colors.goldGradientEnd,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.pillGradient}
            />
          </Animated.View>

          {/* Tabs container */}
          <View style={styles.tabsContainer}>
            {tabs.map((tab, index) => {
              const isActive = activeTabIndex === index;

              return (
                <TabButton
                  key={`tab-${index}`}
                  tab={tab}
                  isActive={isActive}
                  width={tabWidth}
                  iconColor={getIconColor(isActive)}
                  onPress={() => handleTabPress(tab.route)}
                />
              );
            })}
          </View>
        </LinearGradient>
      </BlurView>
    </SafeAreaView>
  );
}

/**
 * Individual tab button component with micro-interactions
 */
interface TabButtonProps {
  tab: TabBarItem;
  isActive: boolean;
  width: number;
  iconColor: string;
  onPress: () => void;
}

const TabButton = React.memo(({ tab, isActive, width, iconColor, onPress }: TabButtonProps) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.85, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 12,
      stiffness: 200,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.tab, { width: `${width}%` }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      accessibilityLabel={`Navigate to ${tab.label}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
    >
      <Animated.View style={[styles.tabContent, animatedStyle]}>
        <MaterialIcons
          name={tab.icon}
          size={24}
          color={iconColor}
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color: iconColor,
              fontWeight: isActive ? '700' : '500',
            },
          ]}
          numberOfLines={1}
        >
          {tab.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
});

TabButton.displayName = 'TabButton';

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  blurContainer: {
    overflow: 'hidden',
  },
  gradientContainer: {
    width: '100%',
    position: 'relative',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    zIndex: 2,
  },
  indicatorPill: {
    position: 'absolute',
    top: 8,
    left: '2%',
    height: 48,
    borderRadius: 24,
    zIndex: 1,
    overflow: 'hidden',
  },
  pillGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    paddingTop: 0,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minHeight: 64,
    zIndex: 2,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    lineHeight: 14,
    letterSpacing: 0.2,
  },
});
