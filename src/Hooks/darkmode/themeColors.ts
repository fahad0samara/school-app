

import { darkModeColors, lightModeColors } from "../../constants/theme";

// Define light and dark colors to match your theme constants
export const lightColors = {
  primary: lightModeColors.primary,
  text: lightModeColors.greyscale900,
  background: lightModeColors.secondaryWhite,
  background1: lightModeColors.grayscale250,
  background2: lightModeColors.grayscale200,
  background3: lightModeColors.grayscale250,
  border: lightModeColors.border,
  accent: lightModeColors.accent,
  card: lightModeColors.white,

};

export const darkColors = {
  primary: darkModeColors.primary,
  text: darkModeColors.white,
  background: darkModeColors.dark2,
  background1: darkModeColors.dark1,
  background2: darkModeColors.dark1,
  background3: darkModeColors.dark1,
  border: darkModeColors.border,
  accent: darkModeColors.accent,
  card: darkModeColors.dark3,
 
};

// Export a function to choose the theme based on dark mode
export const getThemeColors = (isDarkMode) => {
  return isDarkMode ? darkColors : lightColors;
};
