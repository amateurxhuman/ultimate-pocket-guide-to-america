import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getInsightOfTheDay, getRandomInsight, DailyInsight } from '@/data/insightsData';
import * as Haptics from 'expo-haptics';
import Animated, { 
  FadeIn, 
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Daily Insight Card Component
 * Displays a random American insight with refresh capability
 */
export default function DailyInsightCard() {
  const { colors, shadows } = useTheme();
  const [insight, setInsight] = useState<DailyInsight>(() => getInsightOfTheDay());
  const [key, setKey] = useState(0);
  const rotateValue = useSharedValue(0);

  const handleRefresh = () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }

    // Rotate animation
    rotateValue.value = withSequence(
      withSpring(360, { damping: 15 }),
      withSpring(0, { damping: 15 })
    );

    setInsight(getRandomInsight());
    setKey(prev => prev + 1);
  };

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          ...shadows.medium,
        },
      ]}
    >
      {/* Top gradient accent */}
      <LinearGradient
        colors={[
          colors.primary + '40',
          colors.primary + '20',
          colors.primary + '00',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topGradient}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <LinearGradient
            colors={[
              colors.primary + '25',
              colors.highlight,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Ionicons
              name="bulb"
              size={20}
              color={colors.primary}
            />
          </LinearGradient>
          <Text style={[styles.title, { color: colors.text }]}>
            Daily American Insight
          </Text>
        </View>
        
        <TouchableOpacity
          onPress={handleRefresh}
          style={[
            styles.refreshButton,
            { backgroundColor: colors.highlight },
          ]}
          accessibilityLabel="Get a new insight"
          accessibilityRole="button"
          activeOpacity={0.7}
        >
          <Animated.View style={animatedIconStyle}>
            <MaterialIcons
              name="refresh"
              size={20}
              color={colors.primary}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Insight Text */}
      <Animated.View
        key={key}
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(200)}
      >
        <Text style={[styles.insightText, { color: colors.text }]}>
          {insight.text}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 12,
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightText: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});