import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * AppFooter Component
 * Provides spacing for content to clear the floating tab bar
 */
export function AppFooter() {
  return <View style={styles.footer} />;
}

const styles = StyleSheet.create({
  footer: {
    height: 100, // Increased to provide clearance for floating tab bar
  },
});