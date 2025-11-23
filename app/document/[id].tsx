
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { contentData } from "@/data/contentData";
import { useTheme } from "@/contexts/ThemeContext";
import { IconSymbol } from "@/components/IconSymbol";

// Define which subsections are founding documents
const FOUNDING_DOCUMENTS = [
  "declaration",
  "articles",
  "constitution",
  "bill-of-rights",
  "federalist-papers",
];

export default function DocumentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();

  // Find the document in contentData
  let foundDocument: any = null;
  let foundSection: string = "";
  let foundMainSection: string = "";

  for (const mainSection of contentData) {
    for (const section of mainSection.sections) {
      for (const subsection of section.subsections) {
        if (subsection.id === id && FOUNDING_DOCUMENTS.includes(subsection.id)) {
          foundDocument = subsection;
          foundSection = section.title;
          foundMainSection = mainSection.title;
          break;
        }
      }
      if (foundDocument) break;
    }
    if (foundDocument) break;
  }

  if (!foundDocument) {
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
              Document not found
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

  // Special handling for Constitution to show Articles and Amendments structure
  const isConstitution = id === "constitution";

  return (
    <>
      <Stack.Screen
        options={{
          title: foundDocument.title,
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
          <View style={[styles.badge, { backgroundColor: colors.primary + "20" }]}>
            <IconSymbol
              ios_icon_name="doc.text.fill"
              android_material_icon_name="description"
              size={16}
              color={colors.primary}
            />
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              Founding Document
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            {foundDocument.title}
          </Text>
          <Text style={[styles.breadcrumb, { color: colors.textSecondary }]}>
            {foundMainSection} › {foundSection}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Overview
          </Text>
          <Text style={[styles.description, { color: colors.text }]}>
            {foundDocument.content}
          </Text>
        </View>

        {isConstitution && (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
              Document Structure
            </Text>
            <View style={styles.structureSection}>
              <Text style={[styles.structureTitle, { color: colors.text }]}>
                Articles
              </Text>
              <Text style={[styles.structureText, { color: colors.textSecondary }]}>
                • Article I - Legislative Branch{"\n"}
                • Article II - Executive Branch{"\n"}
                • Article III - Judicial Branch{"\n"}
                • Article IV - States' Relations{"\n"}
                • Article V - Amendment Process{"\n"}
                • Article VI - Federal Power{"\n"}
                • Article VII - Ratification
              </Text>
            </View>
            <View style={styles.structureSection}>
              <Text style={[styles.structureTitle, { color: colors.text }]}>
                Amendments
              </Text>
              <Text style={[styles.structureText, { color: colors.textSecondary }]}>
                • Amendments 1-10: Bill of Rights{"\n"}
                • Amendments 11-27: Additional Amendments
              </Text>
            </View>
          </View>
        )}

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Full Document Text
          </Text>
          <Text style={[styles.documentText, { color: colors.text }]}>
            [Placeholder for full document text]
            {"\n\n"}
            This section will contain the complete, original text of {foundDocument.title}.
            {"\n\n"}
            The full document will be formatted for easy reading, with proper sections, paragraphs, and annotations to help modern readers understand the historical language and context.
            {"\n\n"}
            Key passages will be highlighted, and important terms will be explained to make these foundational documents accessible to all Americans.
            {"\n\n"}
            Future updates will include the complete, authentic text along with helpful commentary and historical notes.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Historical Context
          </Text>
          <Text style={[styles.bodyText, { color: colors.text }]}>
            This section will provide historical background about when and why {foundDocument.title} was created, the key figures involved in its drafting, and its lasting impact on American government and society.
            {"\n\n"}
            Understanding the historical context helps readers appreciate the significance of these documents and their continued relevance to American civic life.
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
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
    marginBottom: 8,
  },
  breadcrumb: {
    fontSize: 14,
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
  structureSection: {
    marginBottom: 16,
  },
  structureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  structureText: {
    fontSize: 14,
    lineHeight: 22,
  },
  documentText: {
    fontSize: 15,
    lineHeight: 26,
    fontFamily: "SpaceMono",
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
