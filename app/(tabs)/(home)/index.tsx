
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { contentData } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";
import { AppFooter } from "@/components/AppFooter";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const HERO_FLAG_URL =
  "https://i0.wp.com/thehumanconservative.com/wp-content/uploads/2025/10/image.png?w=1024&ssl=1";

// 100+ Random American Facts
const americanFacts = [
  "The United States has no official language at the federal level.",
  "Alaska has more coastline than all other U.S. states combined.",
  "The Library of Congress is the largest library in the world.",
  "The U.S. Interstate Highway System was inspired by Germany's Autobahn.",
  "The American flag has been redesigned 27 times.",
  "The Statue of Liberty was a gift from France in 1886.",
  "The U.S. has the world's largest economy by nominal GDP.",
  "Mount Rushmore took 14 years to complete.",
  "The first American newspaper was published in 1690.",
  "The U.S. Postal Service delivers to every address in the country.",
  "The bald eagle was chosen as the national bird in 1782.",
  "The U.S. has more than 400 areas in the National Park System.",
  "The first U.S. census was conducted in 1790.",
  "The Pentagon is the world's largest office building.",
  "The U.S. has the third-largest population in the world.",
  "The first American cookbook was published in 1796.",
  "The U.S. produces about 18% of the world's electricity.",
  "The Golden Gate Bridge was once the longest suspension bridge.",
  "The U.S. has more than 45,000 airports.",
  "The first American satellite was launched in 1958.",
  "The U.S. dollar is the world's primary reserve currency.",
  "The Mississippi River is the second-longest river in North America.",
  "The U.S. has won more Olympic medals than any other country.",
  "The first American university was Harvard, founded in 1636.",
  "The U.S. has the world's largest air force.",
  "The Great Lakes contain 21% of the world's surface fresh water.",
  "The U.S. invented the internet.",
  "The first American woman in space was Sally Ride in 1983.",
  "The U.S. has more than 100,000 public schools.",
  "The first American novel was published in 1789.",
  "The U.S. has the world's largest railway network.",
  "The first American zoo opened in Philadelphia in 1874.",
  "The U.S. has more than 5,000 colleges and universities.",
  "The first American patent was issued in 1790.",
  "The U.S. has the world's largest number of Nobel Prize winners.",
  "The first American lighthouse was built in 1716.",
  "The U.S. has more than 300 million registered vehicles.",
  "The first American public library opened in 1833.",
  "The U.S. has the world's largest music industry.",
  "The first American subway system opened in Boston in 1897.",
  "The U.S. has more than 1,000 military bases worldwide.",
  "The first American skyscraper was built in Chicago in 1885.",
  "The U.S. has the world's largest film industry.",
  "The first American radio broadcast was in 1920.",
  "The U.S. has more than 200,000 miles of coastline.",
  "The first American television broadcast was in 1928.",
  "The U.S. has the world's largest number of billionaires.",
  "The first American credit card was issued in 1950.",
  "The U.S. has more than 100 million acres of wilderness.",
  "The first American computer was built in 1946.",
  "The U.S. has the world's largest consumer market.",
  "The first American jet airliner flew in 1958.",
  "The U.S. has more than 50,000 community water systems.",
  "The first American heart transplant was performed in 1968.",
  "The U.S. has the world's largest number of airports.",
  "The first American space shuttle launched in 1981.",
  "The U.S. has more than 20,000 incorporated cities and towns.",
  "The first American ATM was installed in 1969.",
  "The U.S. has the world's largest gold reserves.",
  "The first American cell phone call was made in 1973.",
  "The U.S. has more than 600,000 bridges.",
  "The first American GPS satellite was launched in 1978.",
  "The U.S. has the world's largest number of immigrants.",
  "The first American test-tube baby was born in 1981.",
  "The U.S. has more than 4 million miles of roads.",
  "The first American website went online in 1991.",
  "The U.S. has the world's largest pharmaceutical industry.",
  "The first American cloned mammal was a sheep in 1996.",
  "The U.S. has more than 100,000 gas stations.",
  "The first American hybrid car was sold in 1999.",
  "The U.S. has the world's largest number of patents filed annually.",
  "The first American social media site launched in 1997.",
  "The U.S. has more than 15,000 museums.",
  "The first American electric car was built in 1890.",
  "The U.S. has the world's largest number of research universities.",
  "The first American transcontinental railroad was completed in 1869.",
  "The U.S. has more than 200,000 restaurants.",
  "The first American woman to vote did so in 1920.",
  "The U.S. has the world's largest number of shopping malls.",
  "The first American minimum wage was set in 1938.",
  "The U.S. has more than 50,000 public libraries.",
  "The first American Social Security check was issued in 1940.",
  "The U.S. has the world's largest number of theme parks.",
  "The first American credit bureau was established in 1899.",
  "The U.S. has more than 100,000 farms.",
  "The first American national park was Yellowstone in 1872.",
  "The U.S. has the world's largest number of golf courses.",
  "The first American blood bank opened in 1937.",
  "The U.S. has more than 300,000 churches.",
  "The first American supermarket opened in 1930.",
  "The U.S. has the world's largest number of lawyers.",
  "The first American parking meter was installed in 1935.",
  "The U.S. has more than 5,000 hospitals.",
  "The first American drive-in movie theater opened in 1933.",
  "The U.S. has the world's largest number of fast-food restaurants.",
  "The first American shopping cart was invented in 1937.",
  "The U.S. has more than 1 million nonprofit organizations.",
  "The first American frozen food was sold in 1930.",
  "The U.S. has the world's largest number of swimming pools.",
  "The first American instant coffee was invented in 1901.",
  "The U.S. has more than 10,000 radio stations.",
  "The first American zipper was patented in 1893.",
  "The U.S. has the world's largest number of television stations.",
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  // Select a random fact
  const [randomFact] = React.useState(() => 
    americanFacts[Math.floor(Math.random() * americanFacts.length)]
  );

  const getIconName = (icon: string) => {
    const iconMap: { [key: string]: { ios: string; android: string } } = {
      book: { ios: "book.fill", android: "book" },
      school: { ios: "graduationcap.fill", android: "school" },
      flag: { ios: "flag.fill", android: "flag" },
      "balance-scale": { ios: "scale.3d", android: "balance" },
      globe: { ios: "globe.americas.fill", android: "public" },
    };
    return iconMap[icon] || { ios: "circle.fill", android: "circle" };
  };

  const navigateToSection = (sectionId: string) => {
    router.push(`/(tabs)/${sectionId}` as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO CARD */}
        <View style={styles.header}>
          <ImageBackground
            source={{ uri: HERO_FLAG_URL }}
            style={styles.heroCard}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay}>
              <Text
                style={[styles.title, { color: "#FFFFFF" }]}
                accessibilityLabel="Ultimate Pocket Guide to America"
                accessibilityRole="header"
              >
                Ultimate Pocket Guide to America
              </Text>
              <Text style={[styles.subtitle, { color: "#E5E7EB" }]}>
                Your pocket guide to the principles, foundations, and story of
                the American Republic.
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* RANDOM AMERICAN FACT */}
        <View style={[styles.factCard, { backgroundColor: colors.card, borderColor: colors.primary + "30" }]}>
          <View style={styles.factHeader}>
            <IconSymbol
              ios_icon_name="lightbulb.fill"
              android_material_icon_name="lightbulb"
              size={24}
              color={colors.primary}
            />
            <Text style={[styles.factTitle, { color: colors.primary }]}>
              Random American Fact
            </Text>
          </View>
          <Text style={[styles.factText, { color: colors.text }]}>
            {randomFact}
          </Text>
        </View>

        {/* SECTIONS HEADER */}
        <View style={styles.sectionsHeaderRow}>
          <Text style={[styles.sectionsHeaderText, { color: colors.textSecondary }]}>
            Explore the guide
          </Text>
        </View>

        {/* SECTIONS LIST */}
        <View style={styles.sectionsContainer}>
          {contentData.map((section, index) => {
            const icons = getIconName(section.icon);
            return (
              <SectionCard
                key={index}
                section={section}
                icons={icons}
                colors={colors}
                onPress={() => navigateToSection(section.id)}
              />
            );
          })}
        </View>

        {/* FOOTER */}
        <AppFooter />
      </ScrollView>
    </View>
  );
}

function SectionCard({
  section,
  icons,
  colors,
  onPress,
}: {
  section: any;
  icons: any;
  colors: any;
  onPress: () => void;
}) {
  const scale = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
    opacity: withSpring(opacity.value),
  }));

  const handlePressIn = () => {
    scale.value = 0.97;
    opacity.value = 0.8;
  };

  const handlePressOut = () => {
    scale.value = 1;
    opacity.value = 1;
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={`Navigate to ${section.title}`}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.sectionCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.primary + "15",
          },
          animatedStyle,
        ]}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.highlight },
          ]}
        >
          <IconSymbol
            ios_icon_name={icons.ios}
            android_material_icon_name={icons.android}
            size={28}
            color={colors.primary}
          />
        </View>

        <View style={styles.cardContent}>
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
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  /* HERO */
  header: {
    marginBottom: 20,
  },
  heroCard: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  heroImage: {
    resizeMode: "cover",
  },
  heroOverlay: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "rgba(0, 32, 96, 0.75)",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "left",
    lineHeight: 34.8,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20.3,
    textAlign: "left",
    fontWeight: "400",
  },

  /* RANDOM FACT CARD */
  factCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  factHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  factTitle: {
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    lineHeight: 21.75,
  },
  factText: {
    fontSize: 14,
    lineHeight: 20.3,
  },

  /* SECTION HEADERS */
  sectionsHeaderRow: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionsHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    opacity: 0.7,
  },

  /* SECTION CARDS */
  sectionsContainer: {
    gap: 12,
  },
  sectionCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 24.65,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 18.85,
  },
});
