import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
  Platform,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type ButtonVariant = "filled" | "outline" | "ghost" | "gradient";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Premium Button Component with theme support and animations
 */
export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "filled",
  size = "md",
  disabled = false,
  loading = false,
  children,
  style,
  textStyle,
}) => {
  const { colors, isDark, shadows } = useTheme();
  const scale = useSharedValue(1);

  const sizeStyles: Record<
    ButtonSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: { height: 40, fontSize: 14, padding: 16 },
    md: { height: 48, fontSize: 16, padding: 20 },
    lg: { height: 56, fontSize: 18, padding: 24 },
  };

  /**
   * Get variant-specific styles
   */
  const getVariantStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    };

    switch (variant) {
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          ...shadows.medium,
        };
      case "gradient":
        return {
          ...baseStyle,
          overflow: 'hidden',
          ...shadows.medium,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.primary,
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: colors.highlight,
        };
      default:
        return baseStyle;
    }
  };

  /**
   * Get text color based on variant
   */
  const getTextColor = (): string => {
    if (disabled) {
      return colors.textSecondary;
    }

    switch (variant) {
      case "filled":
        return isDark ? colors.background : '#FFFFFF';
      case "gradient":
        return '#FFFFFF';
      case "outline":
      case "ghost":
        return colors.primary;
      default:
        return colors.text;
    }
  };

  /**
   * Animated style for press effect
   */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  /**
   * Handle press with haptic feedback
   */
  const handlePressIn = () => {
    scale.value = withSpring(0.96, {
      damping: 15,
      stiffness: 200,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 200,
    });
  };

  const handlePress = () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    onPress?.();
  };

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator 
          color={getTextColor()} 
          size="small"
        />
      ) : (
        <Text
          style={[
            {
              fontSize: sizeStyles[size].fontSize,
              color: getTextColor(),
              textAlign: "center",
              fontWeight: "700",
              letterSpacing: 0.5,
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </>
  );

  if (variant === "gradient") {
    return (
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          style={[
            getVariantStyle(),
            {
              height: sizeStyles[size].height,
              paddingHorizontal: sizeStyles[size].padding,
              opacity: disabled ? 0.5 : 1,
            },
            style,
          ]}
        >
          <LinearGradient
            colors={[
              colors.goldGradientStart,
              colors.primary,
              colors.goldGradientEnd,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          {buttonContent}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          getVariantStyle(),
          {
            height: sizeStyles[size].height,
            paddingHorizontal: sizeStyles[size].padding,
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        {buttonContent}
      </Pressable>
    </Animated.View>
  );
};

export default Button;