
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "@/components/IconSymbol";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface QuickButton {
  id: string;
  label: string;
  iosIcon: string;
  androidIcon: string;
  route?: string;
  action?: () => void;
}

export default function QuickAccessGrid() {
  const { colors, shadows } = useTheme();
  const router = useRouter();

  const buttons: QuickButton[] = [
    { id: "map", label: "Map", iosIcon: "map.fill", androidIcon: "map", route: "/(tabs)/map" },
    { id: "quiz", label: "Quiz", iosIcon: "brain", androidIcon: "quiz", route: "/(tabs)/quiz" },
    { id: "search", label: "Search", iosIcon: "magnifyingglass", androidIcon: "search", route: "/(tabs)/search" },
    { id: "glossary", label: "Glossary", iosIcon: "book.fill", androidIcon: "menu_book", route: "/(tabs)/glossary" },
    { id: "favorites", label: "Favorites", iosIcon: "star.fill", androidIcon: "star", route: "/(tabs)/favorites" },
    { id: "settings", label: "Settings", iosIcon: "gearshape.fill", androidIcon: "settings", route: "/(tabs)/settings" },
  ];

  const handlePress = (button: QuickButton) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    if (button.route) {
      router.push(button.route);
    } else if (button.action) {
      button.action();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {buttons.map((button) => (
          <QuickButtonItem
            key={button.id}
            button={button}
            colors={colors}
            shadows={shadows}
            onPress={() => handlePress(button)}
          />
        ))}
      </View>
    </View>
  );
}

function QuickButtonItem({
  button,
  colors,
  shadows,
  onPress,
}: {
  button: QuickButton;
  colors: any;
  shadows: any;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleIn = () => {
    scale.value = withSpring(0.94, { damping: 14, stiffness: 300 });
  };
  const handleOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handleIn}
      onPressOut={handleOut}
      activeOpacity={1}
      style={styles.touchable}
      accessibilityLabel={button.label}
      accessibilityRole="button"
    >
      <Animated.View 
        style={[
          styles.button, 
          {
            backgroundColor: colors.card,
            borderColor: colors.primary + "30",
            ...shadows.medium,
          },
          animatedStyle
        ]}
      >
        <IconSymbol
          ios_icon_name={button.iosIcon}
          android_material_icon_name={button.androidIcon}
          size={36}
          color={colors.primary}
          animated
        />
        <Text style={[styles.label, { color: colors.text }]}>
          {button.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  touchable: {
    width: "31%",
  },
  button: {
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
    textAlign: "center",
    lineHeight: 16,
  },
});
