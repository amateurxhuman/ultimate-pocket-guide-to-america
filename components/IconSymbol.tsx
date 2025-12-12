/**
 * IconSymbol Component
 * Uses native vector icons from @expo/vector-icons instead of external URLs
 * Supports both iOS SF Symbols naming and Material Icons naming
 */

import React, { memo } from "react";
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

/**
 * Icon mapping: iOS SF Symbol names -> Material Icons names
 * This allows using iOS naming conventions while rendering Material Icons on Android
 */
const ICON_MAP: Record<string, { material: keyof typeof MaterialIcons.glyphMap; library: 'material' | 'community' | 'ionicons' }> = {
  // Navigation
  'house.fill': { material: 'home', library: 'material' },
  'home': { material: 'home', library: 'material' },
  
  // Stars/Favorites
  'star.fill': { material: 'star', library: 'material' },
  'star': { material: 'star-border', library: 'material' },
  'star_border': { material: 'star-border', library: 'material' },
  
  // Books/Education
  'book.fill': { material: 'book', library: 'material' },
  'book': { material: 'book', library: 'material' },
  'book.closed': { material: 'menu-book', library: 'material' },
  'menu_book': { material: 'menu-book', library: 'material' },
  'graduationcap.fill': { material: 'school', library: 'material' },
  'school': { material: 'school', library: 'material' },
  
  // Government/Politics
  'flag.fill': { material: 'flag', library: 'material' },
  'flag': { material: 'flag', library: 'material' },
  'scale.3d': { material: 'balance', library: 'material' },
  'balance': { material: 'balance', library: 'material' },
  
  // Geography
  'globe.americas.fill': { material: 'public', library: 'material' },
  'public': { material: 'public', library: 'material' },
  'globe': { material: 'public', library: 'material' },
  'map.fill': { material: 'map', library: 'material' },
  'map': { material: 'map', library: 'material' },
  
  // Search
  'magnifyingglass': { material: 'search', library: 'material' },
  'search': { material: 'search', library: 'material' },
  'search_off': { material: 'search-off', library: 'material' },
  
  // Settings/Controls
  'gear': { material: 'settings', library: 'material' },
  'settings': { material: 'settings', library: 'material' },
  
  // Actions
  'xmark': { material: 'close', library: 'material' },
  'close': { material: 'close', library: 'material' },
  'xmark.circle.fill': { material: 'cancel', library: 'material' },
  'cancel': { material: 'cancel', library: 'material' },
  'checkmark.circle.fill': { material: 'check-circle', library: 'material' },
  'check_circle': { material: 'check-circle', library: 'material' },
  'plus': { material: 'add', library: 'material' },
  'add': { material: 'add', library: 'material' },
  
  // Navigation arrows
  'chevron.left': { material: 'chevron-left', library: 'material' },
  'chevron.right': { material: 'chevron-right', library: 'material' },
  'chevron_left': { material: 'chevron-left', library: 'material' },
  'chevron_right': { material: 'chevron-right', library: 'material' },
  'arrow.right': { material: 'arrow-forward', library: 'material' },
  'arrow_forward': { material: 'arrow-forward', library: 'material' },
  'arrow_back': { material: 'arrow-back', library: 'material' },
  'arrow.clockwise': { material: 'refresh', library: 'material' },
  'refresh': { material: 'refresh', library: 'material' },
  
  // Time/History
  'clock.fill': { material: 'history', library: 'material' },
  'clock': { material: 'history', library: 'material' },
  'history': { material: 'history', library: 'material' },
  
  // Documents
  'doc.text.fill': { material: 'description', library: 'material' },
  'description': { material: 'description', library: 'material' },
  
  // Delete/Trash
  'trash.fill': { material: 'delete', library: 'material' },
  'trash': { material: 'delete', library: 'material' },
  'delete': { material: 'delete', library: 'material' },
  
  // Misc
  'questionmark.circle': { material: 'help', library: 'material' },
  'help': { material: 'help', library: 'material' },
  'lightbulb.fill': { material: 'lightbulb', library: 'ionicons' },
  'lightbulb': { material: 'lightbulb-outline', library: 'ionicons' },
  'share': { material: 'share', library: 'material' },
  'ellipsis': { material: 'more-horiz', library: 'material' },
  'phone.fill': { material: 'phone', library: 'material' },
  'phone': { material: 'phone', library: 'material' },
  
  // Theme/Mode
  'light_mode': { material: 'light-mode', library: 'material' },
  'dark_mode': { material: 'dark-mode', library: 'material' },
  
  // Menu
  'line_3_horizontal': { material: 'menu', library: 'material' },
  'menu': { material: 'menu', library: 'material' },
  
  // Media
  'volume_up': { material: 'volume-up', library: 'material' },
  
  // Quiz/Brain (using lightbulb as alternative)
  'quiz': { material: 'quiz', library: 'material' },
  'brain': { material: 'psychology', library: 'material' },
};

interface IconSymbolProps {
  ios_icon_name?: string;
  android_material_icon_name?: string;
  name?: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  accessibilityLabel?: string;
  animated?: boolean;
}

/**
 * IconSymbol Component
 * Renders vector icons using @expo/vector-icons
 */
const IconSymbol = memo(function IconSymbol({
  ios_icon_name,
  android_material_icon_name,
  name,
  size = 28,
  color,
  style,
  onPress,
  accessibilityLabel,
  animated = false,
}: IconSymbolProps) {
  const { colors: themeColors, animations } = useTheme();
  
  // Animation values
  const scale = useSharedValue(1);

  // Determine which icon to use
  const iconKey = ios_icon_name || android_material_icon_name || name || 'help';
  const iconConfig = ICON_MAP[iconKey];
  
  // Fallback if icon not found
  const finalIcon = iconConfig?.material || 'help';
  const iconLibrary = iconConfig?.library || 'material';
  const finalColor = color || themeColors.primary;

  // Animated style for press effects
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Handle press with animation
  const handlePressIn = () => {
    scale.value = withSpring(0.85, {
      damping: animations.spring.damping,
      stiffness: animations.spring.stiffness,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: animations.spring.damping,
      stiffness: animations.spring.stiffness,
    });
  };

  const handlePress = () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.selectionAsync();
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    
    // Pulse animation on press
    if (animated) {
      scale.value = withSequence(
        withSpring(1.15, { damping: 12 }),
        withSpring(1, { damping: 12 })
      );
    }
    
    onPress?.();
  };

  // Select icon library
  let IconComponent;
  if (iconLibrary === 'ionicons') {
    IconComponent = Ionicons;
  } else if (iconLibrary === 'community') {
    IconComponent = MaterialCommunityIcons;
  } else {
    IconComponent = MaterialIcons;
  }

  const icon = animated ? (
    <Animated.View style={[animatedStyle, style]}>
      <IconComponent
        name={finalIcon as any}
        size={size}
        color={finalColor}
      />
    </Animated.View>
  ) : (
    <View style={style}>
      <IconComponent
        name={finalIcon as any}
        size={size}
        color={finalColor}
      />
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || `Icon ${iconKey}`}
      >
        {icon}
      </TouchableOpacity>
    );
  }

  return icon;
});

IconSymbol.displayName = "IconSymbol";

export { IconSymbol };