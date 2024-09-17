import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

// Dummy values for missing constants
export const SIZES = {
  // Global SIZES
  base: 8,
  font: 14,
  radius: 30,
  padding: 8,
  padding2: 12,
  padding3: 16,

  // FONTS Sizes
  largeTitle: 50,
  h1: 36,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  // App Dimensions
  width,
  height,
};
export const COLORS = {
  primary: "#335EF7",
  secondary: "#FFD300",
  tertiary: "#6C4DDA",
  accent: "#f39c12",
  success: "#0ABE75",
  black: "#181A20",
  black2: "#1D272F",
  info: "#246BFD",
  warning: "#FACC15",
  error: "#F75555",
  disabled: "#D8D8D8",
  white: "#FFFFFF",
  secondaryWhite: "#F8F8F8",
  tertiaryWhite: "#F7F7F7",
  green: "#0ABE75",
  green1: "#0ABE75",
  red: "#f65554",
  greyscale100: "#f0f0f0",
  gray: "#9E9E9E",
  gray2: "#35383F",
  gray3: "#9E9E9E",
  dark1: "#000000",
  dark2: "#1F222A",
  dark3: "#3533F",
  greyscale900: "#212121",
  greyScale800: "#424242",
  grayscale700: "#616161",
  greyscale600: "#757575",
  greyscale500: "#FAFAFA",
  grayscale400: "#BDBDBD",
  greyscale300: "#E0E0E0",
  grayscale250: "#CFCFCF",
  grayscale200: "#EEEEEE",
  grayscale100: "#F5F5F5",
  tansparentPrimary: "rgba(36, 107, 253, 0.08)",
  transparentSecondary: "rgba(108,77,218, .15)",
  transparentTertiary: "rgba(51, 94, 247, .1)",
  transparentRed: "rgba(255,62,61, .15)",
  transparentWhite: "rgba(255,255,255, .2)",
  transparentWhite2: "rgba(255,255,255, .5)",
  blackTie: "#474747",
  grayTie: "#BCBCBC",
  background: "#000",
  background2: "#000",
};
// theme.ts

export const darkModeColors = {
  white: "#FFFFFF",
  greyscale900: "#000000",
  secondaryWhite: "#F0F0F0",
  primary: "#007BFF",
  greyScale800: "#4D4D4D",
  dark1: "#000000",
  dark2: "#1A1A1A",
  dark3: "#2D2D2D",
  transparentPrimary: "#007BFF20",
  grayscale200: "#E0E0E0",
  grayscale250: "#EEEEEE",
  black: "#000000",
  border: "#4D4D4D",
  accent: "#FF5733",
  shadow: "#000000",
};

export const lightModeColors = {
  white: "#FFFFFF",
  greyscale900: "#000000",
  secondaryWhite: "#F0F0F0",
  primary: "#007BFF",
  greyScale800: "#4D4D4D",
  transparentPrimary: "#007BFF20",
  grayscale200: "#E0E0E0",
  grayscale250: "#EEEEEE",
  black: "#000000",
  border: "#DDDDDD",
  accent: "#FF5733",
  shadow: "#CCCCCC",
};
