
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useTextSize } from '@/contexts/TextSizeContext';
import { IconSymbol } from '@/components/IconSymbol';
import Constants from 'expo-constants';
import * as Haptics from 'expo-haptics';

type TextSize = 'small' | 'default' | 'large' | 'extra-large';

const TEXT_SIZE_OPTIONS: { value: TextSize; label: string }[] = [
  { value: 'small', label: 'Small' },
  { value: 'default', label: 'Default' },
  { value: 'large', label: 'Large' },
  { value: 'extra-large', label: 'Extra Large' },
];

export default function SettingsScreen() {
  const { colors, isDark, theme, setTheme, shadows } = useTheme();
  const { textSize, setTextSize } = useTextSize();

  const handleThemeToggle = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    await setTheme(newTheme);
  };

  const handleTextSizeChange = async (size: TextSize) => {
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    await setTextSize(size);
  };

  const handleOpenWebsite = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    try {
      await Linking.openURL('https://thehumanconservative.com');
    } catch (error) {
      if (__DEV__) {
        console.log('Error opening URL:', error);
      }
    }
  };

  const handleOpenDeveloperSite = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    try {
      await Linking.openURL('https://stormlightfoundry.com');
    } catch (error) {
      if (__DEV__) {
        console.log('Error opening URL:', error);
      }
    }
  };

  const appVersion = Constants.expoConfig?.version || '1.0.0';

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerShown: true,
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.card },
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        {/* THEME SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            APPEARANCE
          </Text>
          
          <View style={[styles.card, { backgroundColor: colors.card, ...shadows.small }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  ios_icon_name={isDark ? 'moon.fill' : 'sun.max.fill'}
                  android_material_icon_name={isDark ? 'dark_mode' : 'light_mode'}
                  size={24}
                  color={colors.primary}
                />
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Theme
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleThemeToggle}
                style={[
                  styles.themeToggle,
                  {
                    backgroundColor: isDark ? colors.primary : colors.highlight,
                    borderColor: colors.primary,
                  },
                ]}
                activeOpacity={0.8}
                accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.themeToggleText,
                    { color: isDark ? colors.background : colors.primary },
                  ]}
                >
                  {isDark ? 'Dark' : 'Light'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* TEXT SIZE SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            TEXT SIZE
          </Text>
          
          <View style={[styles.card, { backgroundColor: colors.card, ...shadows.small }]}>
            <View style={styles.textSizeContainer}>
              {TEXT_SIZE_OPTIONS.map((option, index) => {
                const isSelected = textSize === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleTextSizeChange(option.value)}
                    style={[
                      styles.textSizeButton,
                      {
                        backgroundColor: isSelected ? colors.primary : colors.highlight,
                        borderColor: isSelected ? colors.primary : colors.primary + '30',
                      },
                      index === 0 && styles.textSizeButtonFirst,
                      index === TEXT_SIZE_OPTIONS.length - 1 && styles.textSizeButtonLast,
                    ]}
                    activeOpacity={0.8}
                    accessibilityLabel={`Set text size to ${option.label}`}
                    accessibilityRole="button"
                  >
                    <Text
                      style={[
                        styles.textSizeButtonText,
                        {
                          color: isSelected ? (isDark ? colors.background : '#FFFFFF') : colors.text,
                        },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* COMPANION SITE SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            RESOURCES
          </Text>
          
          <TouchableOpacity
            onPress={handleOpenWebsite}
            style={[styles.card, { backgroundColor: colors.card, ...shadows.small }]}
            activeOpacity={0.8}
            accessibilityLabel="Open The Human Conservative website"
            accessibilityRole="button"
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  ios_icon_name="globe"
                  android_material_icon_name="public"
                  size={24}
                  color={colors.primary}
                />
                <View>
                  <Text style={[styles.settingLabel, { color: colors.text }]}>
                    Companion Website
                  </Text>
                  <Text style={[styles.settingSubtext, { color: colors.textSecondary }]}>
                    thehumanconservative.com
                  </Text>
                </View>
              </View>
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron_right"
                size={20}
                color={colors.textSecondary}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* ABOUT SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            ABOUT
          </Text>
          
          <View style={[styles.card, { backgroundColor: colors.card, ...shadows.small }]}>
            {/* Blurb */}
            <Text style={[styles.aboutBlurb, { color: colors.text }]}>
              Pocket Guide to America is your civic companion for understanding how the United States works. Explore founding documents, core principles, key eras of history, and practical tools for better citizenship.
            </Text>

            {/* Version Row */}
            <View style={[styles.aboutRow, { borderTopColor: colors.primary + '20' }]}>
              <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>
                Version
              </Text>
              <Text style={[styles.aboutValue, { color: colors.text }]}>
                {appVersion}
              </Text>
            </View>

            {/* Developer Row */}
            <TouchableOpacity
              onPress={handleOpenDeveloperSite}
              style={[styles.aboutRow, { borderTopColor: colors.primary + '20' }]}
              activeOpacity={0.7}
              accessibilityLabel="Open StormLight Foundry website"
              accessibilityRole="button"
            >
              <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>
                Developer
              </Text>
              <View style={styles.developerLink}>
                <Text style={[styles.aboutValue, styles.linkText, { color: colors.primary }]}>
                  StormLight Foundry
                </Text>
                <IconSymbol
                  ios_icon_name="arrow.right"
                  android_material_icon_name="arrow_forward"
                  size={16}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>

            {/* Copyright Row */}
            <View style={[styles.aboutRow, { borderTopColor: colors.primary + '20' }]}>
              <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>
                Copyright
              </Text>
              <Text style={[styles.aboutValue, { color: colors.text }]}>
                © 2025 StormLight Foundry
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 24 : 16,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  settingSubtext: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  themeToggle: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    minWidth: 80,
    alignItems: 'center',
  },
  themeToggleText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textSizeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textSizeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSizeButtonFirst: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  textSizeButtonLast: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  textSizeButtonText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  aboutBlurb: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
  },
  aboutLabel: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  aboutValue: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
  },
  developerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  linkText: {
    fontWeight: '600',
  },
});
