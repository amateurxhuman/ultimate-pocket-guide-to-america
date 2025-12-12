import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useReadingHistory } from '@/contexts/ReadingHistoryContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getItemRoute } from '@/utils/findItemById';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

/**
 * Recently Viewed List Component
 * Displays a horizontal scrollable list of recently viewed items
 */
export default function RecentlyViewedList() {
  const { colors, shadows } = useTheme();
  const { recentlyViewed } = useReadingHistory();
  const router = useRouter();

  if (recentlyViewed.length === 0) {
    return null;
  }

  const handleItemPress = (id: string) => {
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
      const route = getItemRoute(id);
      router.push(route as any);
    } catch (error) {
      if (__DEV__) {
        console.log('Error navigating to item:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.highlight },
            ]}
          >
            <MaterialIcons
              name="history"
              size={18}
              color={colors.primary}
            />
          </View>
          <Text style={[styles.headerText, { color: colors.text }]}>
            Recently Viewed
          </Text>
        </View>
      </View>

      {/* Horizontal scroll list */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={212} // card width (200) + gap (12)
        decelerationRate="fast"
      >
        {recentlyViewed.map((item, index) => (
          <RecentlyViewedCard
            key={`recent-${index}`}
            item={item}
            index={index}
            colors={colors}
            shadows={shadows}
            onPress={() => handleItemPress(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

/**
 * Individual Recently Viewed Card Component
 */
interface RecentlyViewedCardProps {
  item: any;
  index: number;
  colors: any;
  shadows: any;
  onPress: () => void;
}

function RecentlyViewedCard({ item, index, colors, shadows, onPress }: RecentlyViewedCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 12, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      accessibilityLabel={`View ${item.title}`}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            ...shadows.small,
          },
          animatedStyle,
        ]}
      >
        {/* Left accent bar */}
        <LinearGradient
          colors={[
            colors.primary,
            colors.goldGradientEnd,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.cardAccent}
        />

        <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.cardSection, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.section}
        </Text>

        {/* Arrow indicator */}
        <View style={styles.arrowContainer}>
          <MaterialIcons
            name="arrow-forward"
            size={16}
            color={colors.primary}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 12,
    paddingRight: 16,
  },
  card: {
    width: 200,
    padding: 16,
    borderRadius: 14,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 110,
  },
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 21,
  },
  cardSection: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});