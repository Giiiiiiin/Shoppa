import { DefaultTheme } from '@react-navigation/native';

export const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000', // Dominant color (60%)
    primary: '#6A0DAD',    // Secondary color (30%)
    accent: '#FF4500',     // Accent color (10%)
    card: '#1C1C1C',       // Dark shade for card backgrounds
    text: '#FFFFFF',       // Light color for text
    border: '#6A0DAD',     // Matching the secondary color
  },
};
