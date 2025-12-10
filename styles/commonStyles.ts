import { StyleSheet } from 'react-native';

// Light Mode Colors - Enhanced with richer palette
export const colors = {
  background: '#FAFAFA',
  text: '#2C2C2C',
  textSecondary: '#8B8B8B',
  primary: '#D4AF37', // Gold
  secondary: '#C0C0C0',
  accent: '#DC2626',
  card: '#FFFFFF',
  highlight: '#FEF3C7',
  
  // NEW: Enhanced visual values
  gradientStart: '#1E3A8A', // Deep blue
  gradientEnd: '#7C2D12', // Deep red
  goldGradientStart: '#FBBF24', // Bright gold
  goldGradientEnd: '#F59E0B', // Deep gold
  cardOverlay: 'rgba(255, 255, 255, 0.85)',
  shadowColor: '#000000',
  glowColor: 'rgba(212, 175, 55, 0.25)', // Gold glow
  borderGlow: 'rgba(212, 175, 55, 0.4)',
  heroOverlay: 'rgba(0, 0, 0, 0.1)',
};

// Dark Mode Colors - Enhanced with richer palette
export const darkColors = {
  background: '#0A0A0A', // Deeper black
  text: '#F5F5F5',
  textSecondary: '#A0A0A0',
  primary: '#F59E0B', // Brighter gold for dark mode
  secondary: '#707070',
  accent: '#EF4444',
  card: '#1A1A1A', // Slightly lighter than background
  highlight: '#2A2520',
  
  // NEW: Enhanced visual values
  gradientStart: '#1E3A8A', // Deep blue
  gradientEnd: '#7C2D12', // Deep red
  goldGradientStart: '#FBBF24', // Bright gold
  goldGradientEnd: '#F59E0B', // Mid gold
  cardOverlay: 'rgba(26, 26, 26, 0.85)',
  shadowColor: '#000000',
  glowColor: 'rgba(245, 158, 11, 0.3)', // Gold glow - stronger in dark
  borderGlow: 'rgba(245, 158, 11, 0.5)',
  heroOverlay: 'rgba(0, 0, 0, 0.3)',
};

// NEW: Animation timing constants
export const animations = {
  fast: 200,
  normal: 300,
  slow: 500,
  spring: {
    damping: 15,
    stiffness: 150,
  },
};

// NEW: Enhanced shadow styles
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
};

// NEW: Glassmorphism style helper
export const glassmorphism = {
  blur: 10,
  opacity: 0.8,
  borderWidth: 1,
  borderOpacity: 0.2,
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    ...shadows.small,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});