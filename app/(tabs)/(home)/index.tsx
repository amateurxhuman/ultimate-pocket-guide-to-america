
import React, { useMemo, useCallback, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { contentData } from "@/data/contentData";
import { IconSymbol } from "@/components/IconSymbol";
import QuickAccessGrid from "@/components/QuickAccessGrid";
import DailyInsightCard from "@/components/DailyInsightCard";
import LastReadCard from "@/components/LastReadCard";
import RecentlyViewedList from "@/components/RecentlyViewedList";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const HERO_FLAG_URL =
  "https://thehumanconservative.com/wp-content/uploads/2025/12/app-logo-2.0.png";

const AMERICAN_FACTS: string[] = [
  "The United States Constitution is the oldest written national constitution still in use.",
  "Yellowstone, established in 1872, is widely considered the first national park in the world.",
  "The Library of Congress is the largest library on Earth, with millions of books, recordings, and maps.",
  "In 1903, the Wright brothers flew the first powered airplane at Kitty Hawk, North Carolina.",
  "The Interstate Highway System spans over 46,000 miles, connecting nearly every major U.S. city.",
  "NASA, founded in 1958, has sent humans to the Moon and robotic probes to every planet in the solar system.",
  "The U.S. has 63 national parks, protecting landscapes from the Everglades to Denali.",
  "Thomas Edison held over 1,000 patents, including the phonograph and a practical electric light bulb.",
  "The U.S. has more than 95,000 miles of shoreline along oceans, gulfs, and the Great Lakes.",
  "American women secured the constitutional right to vote in 1920 with the 19th Amendment.",
  "The Statue of Liberty was a gift from France in 1886, symbolizing freedom and democracy.",
  "The Bill of Rights was ratified in 1791, guaranteeing fundamental freedoms to all Americans.",
  "The U.S. dollar is the world's primary reserve currency, used in international trade.",
  "Mount Rushmore features the carved faces of four presidents: Washington, Jefferson, Roosevelt, and Lincoln.",
  "The Golden Gate Bridge in San Francisco was completed in 1937 and was the longest suspension bridge at the time.",
  "The first American satellite, Explorer 1, was launched in 1958, marking the U.S. entry into the Space Race.",
  "The Smithsonian Institution is the world's largest museum, education, and research complex.",
  "The U.S. has the world's largest economy by nominal GDP.",
  "Benjamin Franklin helped draft the Declaration of Independence and invented bifocal glasses and the lightning rod.",
  "The Grand Canyon is over 277 miles long and up to 18 miles wide, carved by the Colorado River.",
  "The U.S. Postal Service delivers to every address in the nation, over 160 million locations.",
  "The first public library in America was founded in 1731 by Benjamin Franklin in Philadelphia.",
  "The U.S. has more Nobel Prize winners than any other country.",
  "The American flag has had 27 different versions since 1777, with the current 50-star design adopted in 1960.",
  "The Liberty Bell in Philadelphia is an iconic symbol of American independence.",
  "The U.S. military is the most powerful in the world, with bases in over 70 countries.",
  "The first American newspaper was published in Boston in 1690.",
  "The U.S. has the world's third-largest population, after China and India.",
  "The Mississippi River is the second-longest river in North America, flowing 2,340 miles.",
  "The U.S. invented the internet, originally developed as ARPANET in the 1960s.",
  "The first American college, Harvard University, was founded in 1636.",
  "The U.S. has won more Olympic medals than any other country in history.",
  "The Hoover Dam, completed in 1936, provides power to Nevada, Arizona, and California.",
  "The U.S. has the world's largest air force and navy.",
  "The first American astronaut in space was Alan Shepard in 1961.",
  "The U.S. has the most airports in the world, with over 13,000.",
  "The first American zoo opened in Philadelphia in 1874.",
  "The U.S. has the world's largest railway network, spanning over 140,000 miles.",
  "The first American patent was issued in 1790 for a new method of making potash.",
  "The U.S. has the most billionaires of any country in the world.",
  "The first American public school was established in Boston in 1635.",
  "The U.S. has the world's largest coal reserves.",
  "The first American lighthouse was built in Boston Harbor in 1716.",
  "The U.S. has the most universities ranked in the global top 100.",
  "The first American stock exchange was established in Philadelphia in 1790.",
  "The U.S. has the world's largest oil reserves outside the Middle East.",
  "The first American fire department was established in New York City in 1648.",
  "The U.S. has the most diverse geography of any country, from deserts to rainforests.",
  "The first American hospital was founded in Philadelphia in 1751.",
  "The U.S. has the world's largest entertainment industry, centered in Hollywood.",
];

const getIconName = (icon: string) => {
  const iconMap: { [key: string]: { ios: string; android: string } } = {
    book: { ios: "book.fill", android: "book" },
    school: { ios: "graduationcap.fill", android: "school" },
    flag: { ios: "flag.fill", android: "flag" },
    balance: { ios: "scale.3d", android: "balance" },
    globe: { ios: "globe.americas.fill", android: "public" },
    "balance-scale": { ios: "scale.3d", android: "balance" },
  };

  return iconMap[icon] || { ios: "questionmark.circle", android: "help" };
};

export default function HomeScreen() {
  const { colors, shadows, animations } = useTheme();
  const router = useRouter();

  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [glowOpacity]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const [fact, setFact] = React.useState(() => {
    const idx = Math.floor(Math.random() * AMERICAN_FACTS.length);
    return AMERICAN_FACTS[idx];
  });

  const shuffleFact = useCallback(() => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      if (__DEV__) {
        console.log('Haptics error:', error);
      }
    }
    const idx = Math.floor(Math.random() * AMERICAN_FACTS.length);
    setFact(AMERICAN_FACTS[idx]);
  }, []);

  const navigateToSection = useCallback(
    (sectionId: string) => {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (error) {
        if (__DEV__) {
          console.log('Haptics error:', error);
        }
      }
      router.push(`/(tabs)/${sectionId}` as any);
    },
    [router]
  );

  const sectionCards = useMemo(() => {
    return contentData.map((section, index) => {
      const icons = getIconName(section.icon);
      return (
        <Animated.View
          key={section.id}
          entering={FadeInDown.delay(index * 100).springify()}
        >
          <TouchableOpacity
            style={[
              styles.sectionCard,
              {
                backgroundColor: colors.card,
                ...shadows.medium,
              },
            ]}
            onPress={() => navigateToSection(section.id)}
            activeOpacity={0.85}
            accessibilityLabel={`Navigate to ${section.title}`}
            accessibilityRole="button"
          >
            <LinearGradient
              colors={[colors.borderGlow, colors.primary + '00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradientBorder}
            />
            
            <View
              style={[
                styles.iconContainer,
                { 
                  backgroundColor: colors.highlight,
                  ...shadows.small,
                },
              ]}
            >
              <IconSymbol
                ios_icon_name={icons.ios}
                android_material_icon_name={icons.android}
                size={32}
                color={colors.primary}
                animated
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
          </TouchableOpacity>
        </Animated.View>
      );
    });
  }, [colors, shadows, navigateToSection]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={styles.header} entering={FadeIn.duration(800)}>
          <View style={[styles.heroWrapper, { ...shadows.large }]}>
            <Animated.View style={[styles.glowLayer, glowStyle]}>
              <LinearGradient
                colors={[
                  colors.primary + '30',
                  colors.primary + '20',
                  colors.primary + '30',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 24 }]}
              />
            </Animated.View>

            <LinearGradient
              colors={[
                colors.goldGradientStart,
                colors.primary,
                colors.goldGradientEnd,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.flagBorder}
            >
              <ImageBackground
                source={{ uri: HERO_FLAG_URL }}
                style={styles.heroCard}
                imageStyle={styles.heroImage}
                resizeMode="contain"
              >
                <View
                  style={[
                    styles.heroOverlay,
                    { backgroundColor: colors.heroOverlay },
                  ]}
                />
              </ImageBackground>
            </LinearGradient>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <DailyInsightCard />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <LastReadCard />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(175).springify()}>
          <RecentlyViewedList />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <LinearGradient
            colors={[colors.card, colors.highlight + '40']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[
              styles.factCard,
              {
                borderColor: colors.primary + '30',
                ...shadows.medium,
              },
            ]}
          >
            <View style={styles.factHeader}>
              <View style={styles.factLabelContainer}>
                <View
                  style={[
                    styles.factDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
                <Text style={[styles.factLabel, { color: colors.textSecondary }]}>
                  Did you know?
                </Text>
              </View>
              <TouchableOpacity
                onPress={shuffleFact}
                style={[
                  styles.shuffleButton,
                  {
                    backgroundColor: colors.highlight,
                    ...shadows.small,
                  },
                ]}
                accessibilityLabel="Get a new fact"
                accessibilityRole="button"
              >
                <IconSymbol
                  ios_icon_name="arrow.clockwise"
                  android_material_icon_name="refresh"
                  size={18}
                  color={colors.primary}
                  animated
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.factText, { color: colors.text }]}>
              {fact}
            </Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={styles.sectionsHeaderRow}
          entering={FadeInDown.delay(300).springify()}
        >
          <View style={styles.sectionHeaderLine}>
            <LinearGradient
              colors={[
                colors.primary + '00',
                colors.primary + '60',
                colors.primary + '00',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.headerGradient}
            />
          </View>
          <Text
            style={[
              styles.sectionsHeaderText,
              { color: colors.textSecondary },
            ]}
          >
            EXPLORE THE GUIDE
          </Text>
          <View style={styles.sectionHeaderLine}>
            <LinearGradient
              colors={[
                colors.primary + '00',
                colors.primary + '60',
                colors.primary + '00',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.headerGradient}
            />
          </View>
        </Animated.View>

        <View style={styles.sectionsContainer}>{sectionCards}</View>

        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <QuickAccessGrid />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === "android" ? 48 : 32,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 20,
  },
  heroWrapper: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'visible',
  },
  glowLayer: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 24,
    zIndex: -1,
  },
  flagBorder: {
    borderRadius: 20,
    padding: 2.5,
  },
  heroCard: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 17.5,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: '#1A1A1A',
  },
  heroImage: {
    borderRadius: 17.5,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 17.5,
  },
  factCard: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  factHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  factLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  factDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  factLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    lineHeight: 17.4,
  },
  shuffleButton: {
    padding: 8,
    borderRadius: 12,
    minWidth: 36,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  factText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  sectionsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
  },
  headerGradient: {
    width: '100%',
    height: '100%',
  },
  sectionsHeaderText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    lineHeight: 16,
  },
  sectionsContainer: {
    gap: 14,
    marginBottom: 32,
  },
  sectionCard: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    position: 'relative',
    overflow: 'hidden',
  },
  cardGradientBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.85,
  },
});
