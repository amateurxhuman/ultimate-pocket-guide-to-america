import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Header Right Button Component
 * Displays an action button in the header (right side)
 */
export function HeaderRightButton() {
  const { colors } = useTheme();
  
  return (
    <View style={styles.headerButtonContainer}>
      <MaterialIcons
        name="add"
        color={colors.primary}
        size={24}
        onPress={() =>
          Alert.alert(
            "Not Implemented",
            "This feature is not implemented yet"
          )
        }
      />
    </View>
  );
}

/**
 * Header Left Button Component
 * Displays a settings button in the header (left side)
 */
export function HeaderLeftButton() {
  const { colors } = useTheme();
  
  return (
    <View style={styles.headerButtonContainer}>
      <MaterialIcons
        name="settings"
        color={colors.primary}
        size={24}
        onPress={() =>
          Alert.alert(
            "Not Implemented",
            "This feature is not implemented yet"
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});