// components/IconSymbol.tsx
// Cross-platform icon wrapper.
// Native (Android): MaterialIcons
// Web / Natively: text-based fallbacks (no icon fonts, no "?").
//
// iOS still uses IconSymbol.ios.tsx (SF Symbols via expo-symbols).

import React from "react";
import {
  Platform,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  OpaqueColorValue,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { SymbolWeight } from "expo-symbols";

type IconSymbolProps = {
  ios_icon_name?: string; // kept for API compatibility
  android_material_icon_name: keyof typeof MaterialIcons.glyphMap | string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight; // not used here, but kept for the signature
};

// Unified, flat, monochrome glyph set for WEB / NATIVELY.
// Every icon name used in the app is mapped here.
const WEB_FALLBACK_CHARS: Record<string, string> = {
  // Core navigation / actions
  home: "⌂",
  add: "+",
  refresh: "↻",
  search: "⌕",
  search_off: "⊘",
  settings: "⚙",

  // Content / documents
  book: "⧉",
  menu_book: "⧉",
  description: "≣",
  history: "⏲",

  // Status / feedback
  check_circle: "✓",
  error: "!",
  delete: "⌫",
  close: "✕",
  cancel: "✕",

  // Navigation arrows
  arrow_forward: "›",
  chevron_right: "›",
  chevron_left: "‹",

  // Favorites
  star: "✦",
  star_border: "✧",

  // Education / civic sections
  school: "⋆",
  flag: "⚑",
  balance: "⚖",
  "balance-scale": "⚖",
  globe: "◉",
  public: "◉",

  // Quick Access grid
  map: "⌖",
  location_on: "⌖",
  explore: "⤿",

  // Quiz / help
  quiz: "?",
  help: "?",

  // Light / dark toggle
  light_mode: "☼",
  brightness_6: "☼",
  wb_sunny: "☼",
  lightbulb_outline: "☼",
};

export function IconSymbol({
  ios_icon_name,
  android_material_icon_name,
  size = 24,
  color,
  style,
}: IconSymbolProps) {
  // On web / Natively: avoid icon fonts entirely
  if (Platform.OS === "web") {
    const key = String(android_material_icon_name);
    const char =
      WEB_FALLBACK_CHARS[key] ??
      (ios_icon_name && WEB_FALLBACK_CHARS[ios_icon_name]) ??
      "•";

    return (
      <Text
        style={[
          {
            fontSize: size * 1.25,        // slightly larger so icons feel substantial
            color: color as string,
            textAlign: "center",
            includeFontPadding: false,
          },
          style as StyleProp<TextStyle>,
        ]}
      >
        {char}
      </Text>
    );
  }

  // On native Android: keep using MaterialIcons as before
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={android_material_icon_name as any}
      style={style as StyleProp<TextStyle>}
    />
  );
}
