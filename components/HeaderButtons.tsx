import React from "react";
import { Pressable, StyleSheet, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";

export function HeaderRightButton() {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() =>
        Alert.alert("Not Implemented", "This feature is not implemented yet")
      }
      hitSlop={8}
      style={[styles.headerButtonContainer, styles.rightMargin]}
      accessibilityRole="button"
      accessibilityLabel="Header action"
    >
      <IconSymbol
        ios_icon_name="plus"
        android_material_icon_name="add"
        color={theme.colors.primary}
        size={20}
      />
    </Pressable>
  );
}

export function HeaderLeftButton() {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() =>
        Alert.alert("Not Implemented", "This feature is not implemented yet")
      }
      hitSlop={8}
      style={[styles.headerButtonContainer, styles.leftMargin]}
      accessibilityRole="button"
      accessibilityLabel="Open menu"
    >
      <IconSymbol
        ios_icon_name="gear"
        android_material_icon_name="settings"
        color={theme.colors.primary}
        size={20}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,          // perfect circle
    alignItems: "center",      // center icon horizontally
    justifyContent: "center",  // center icon vertically
    // no padding, no marginTop here
  },
  leftMargin: {
    marginLeft: 8,
  },
  rightMargin: {
    marginRight: 8,
  },
});
