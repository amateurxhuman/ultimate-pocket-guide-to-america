import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { mapData, State } from "@/data/mapData";

/**
 * State detail screen for the American Map Explorer.
 * - Looks up the state by its two-letter code (e.g., "NY", "TX").
 * - Uses `state.content` if present; falls back to `state.blurb` otherwise.
 * - Splits the long text on "\n\n" and renders each as a separate paragraph.
 */
export default function StateDetailScreen() {
  const params = useLocalSearchParams();
  const rawCode = params.code as string | string[] | undefined;

  // Handle param variations safely
  const stateCode = (Array.isArray(rawCode) ? rawCode[0] : rawCode || "")
    .toUpperCase();

  // Find the matching state in any region
  let foundState: State | undefined;
  for (const region of mapData) {
    const match = region.states.find((s) => s.code === stateCode);
    if (match) {
      foundState = match;
      break;
    }
  }

  if (!foundState) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "State" }} />
        <View style={styles.inner}>
          <Text style={styles.errorTitle}>State not found</Text>
          <Text style={styles.errorText}>
            The state you tried to open could not be located. Please go back to
            the map and try again.
          </Text>
        </View>
      </View>
    );
  }

  const longText =
    (foundState.content && foundState.content.trim().length > 0
      ? foundState.content
      : foundState.blurb) || "";

  const paragraphs = longText.split("\n\n");

  return (
    <View style={styles.container}>
      <Stack.Screen
  options={{
    title: foundState.name,
    headerShown: true,
    headerBackVisible: true,
  }}
/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{foundState.name}</Text>
        <Text style={styles.subtitle}>{foundState.code}</Text>

        {paragraphs.map((para, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.paragraph}>{para}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050509", // dark background to match the rest of the app
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  scrollContent: {
  paddingHorizontal: 20,
  paddingTop: 24,
  paddingBottom: 120,
},
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f5f5f5",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#a1a1aa",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#18181b",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: "#e4e4e7",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#f97373",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#e4e4e7",
  },
});
