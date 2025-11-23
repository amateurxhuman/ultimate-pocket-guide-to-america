
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { contentData } from "@/data/contentData";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "@/components/IconSymbol";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();

  // Find the item in contentData
  let foundItem: any = null;
  let foundSection: string = "";
  let foundMainSection: string = "";

  for (const mainSection of contentData) {
    for (const section of mainSection.sections) {
      for (const subsection of section.subsections) {
        if (subsection.id === id) {
          foundItem = subsection;
          foundSection = section.title;
          foundMainSection = mainSection.title;
          break;
        }
      }
      if (foundItem) break;
    }
    if (foundItem) break;
  }

  if (!foundItem) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Not Found",
            headerShown: true,
            headerStyle: { backgroundColor: colors.card },
            headerTintColor: colors.text,
          }}
        />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.errorContainer}>
            <IconSymbol
              ios_icon_name="exclamationmark.triangle.fill"
              android_material_icon_name="error"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.errorText, { color: colors.text }]}>
              Item not found
            </Text>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: colors.primary }]}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: foundItem.title,
          headerShown: true,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerBackTitle: "Back",
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.breadcrumb, { color: colors.textSecondary }]}>
            {foundMainSection} › {foundSection}
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            {foundItem.title}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Description
          </Text>
          <Text style={[styles.description, { color: colors.text }]}>
            {foundItem.content}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Additional Information
          </Text>
          <Text style={[styles.bodyText, { color: colors.text }]}>
            This is placeholder body text that provides additional context and information about {foundItem.title}.
            {"\n\n"}
            In a complete version of this guide, this section would contain detailed explanations, historical context, practical examples, and relevant connections to other topics.
            {"\n\n"}
            The content would be written in clear, accessible language to help readers understand the significance and application of these concepts in American civic life.
            {"\n\n"}
            Future updates will replace this placeholder with comprehensive, well-researched content that serves as a valuable educational resource.
          </Text>
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
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 24,
  },
  breadcrumb: {
    fontSize: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 26,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
