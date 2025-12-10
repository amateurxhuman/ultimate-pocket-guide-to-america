import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

export function AppFooter() {
  const { colors, isDark, shadows } = useTheme();

  const handleLinkPress = async () => {
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    Linking.openURL("https://thehumanconservative.com");
  };

  return (
    <View style={styles.container}>
      {/* Subtle gradient divider */}
      <LinearGradient
        colors={[
          colors.primary + '00',
          colors.primary + '20',
          colors.primary + '00',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.divider}
      />

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          © 2025 AmateurHuman
        </Text>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Ultimate Pocket Guide to America • v1.0.0
        </Text>
        <TouchableOpacity
          onPress={handleLinkPress}
          accessibilityRole="link"
          accessibilityLabel="Open The Human Conservative website in your browser"
          style={[
            styles.linkButton,
            {
              backgroundColor: colors.card,
              borderColor: colors.primary + '40',
              ...shadows.small,
            },
          ]}
          activeOpacity={0.8}
        >
          <Text style={[styles.footerLink, { color: colors.primary }]}>
            Visit thehumanconservative.com
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: '100%',
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 24,
  },
  footer: {
    paddingBottom: 24,
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 18,
  },
  linkButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  footerLink: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "700",
    lineHeight: 18,
    letterSpacing: 0.3,
  },
});