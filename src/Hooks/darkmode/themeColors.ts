

import { darkModeColors, lightModeColors } from "../../constants/theme";

// Define light and dark colors to match your theme constants
export const lightColors = {
  primary: lightModeColors.primary,
  text: lightModeColors.greyscale900,
  background: lightModeColors.white,
  background1: lightModeColors.grayscale250,
  border: lightModeColors.border,
  accent: lightModeColors.accent,
};

export const darkColors = {
  primary: darkModeColors.primary,
  text: darkModeColors.white,
  background: darkModeColors.dark2,
  background1: darkModeColors.dark3,
  border: darkModeColors.border,
  accent: darkModeColors.accent,
};

// Export a function to choose the theme based on dark mode
export const getThemeColors = (isDarkMode) => {
  return isDarkMode ? darkColors : lightColors;
};
