
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { historyData } from "@/data/historyData";
import { IconSymbol } from "@/components/IconSymbol";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export default function HistoryScreen() {
  const { colors, shadows } = useTheme();
  const router = useRouter();

  const handleSectionPress = (sectionId: string) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    router.push(`/detail/${historyData.id}-${sectionId}` as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={styles.header}
          entering={FadeInDown.delay(100).springify()}
        >
          <LinearGradient
            colors={[colors.primary + '20', colors.primary + '10']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.headerCard, { ...shadows.medium }]}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.highlight },
              ]}
            >
              <IconSymbol
                ios_icon_name="clock.fill"
                android_material_icon_name="history"
                size={32}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              {historyData.title}
            </Text>
            <Text
              style={[styles.headerDescription, { color: colors.textSecondary }]}
            >
              {historyData.description}
            </Text>
          </LinearGradient>
        </Animated.View>

        <View style={styles.sectionsContainer}>
          {historyData.sections.map((section, index) => (
            <Animated.View
              key={section.id}
              entering={FadeInDown.delay(200 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[
                  styles.sectionCard,
                  {
                    backgroundColor: colors.card,
                    ...shadows.medium,
                  },
                ]}
                onPress={() => handleSectionPress(section.id)}
                activeOpacity={0.85}
                accessibilityLabel={`View ${section.title}`}
                accessibilityRole="button"
              >
                <LinearGradient
                  colors={[colors.borderGlow, colors.primary + '00']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradientBorder}
                />
                <View style={styles.sectionContent}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    {section.title}
                  </Text>
                  <Text
                    style={[
                      styles.sectionDescription,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {section.description}
                  </Text>
                  <View style={styles.subsectionCount}>
                    <IconSymbol
                      ios_icon_name="doc.text.fill"
                      android_material_icon_name="description"
                      size={14}
                      color={colors.primary}
                    />
                    <Text
                      style={[styles.countText, { color: colors.textSecondary }]}
                    >
                      {section.subsections.length} topics
                    </Text>
                  </View>
                </View>
                <IconSymbol
                  ios_icon_name="chevron.right"
                  android_material_icon_name="chevron_right"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === "android" ? 48 : 16,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 24,
  },
  headerCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    lineHeight: 40.6,
  },
  headerDescription: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 21.75,
  },
  sectionsContainer: {
    gap: 14,
  },
  sectionCard: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  cardGradientBorder: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 8,
    opacity: 0.85,
  },
  subsectionCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countText: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17.4,
  },
});
