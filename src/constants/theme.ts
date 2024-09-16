import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

// Dummy values for missing constants
export const SIZES = {
    width: 360, 
    height: 640, 
};
export const colors = {
    background: '#F8F8F8', 
};
export const darkModeColors = {
    white: '#FFFFFF',
    greyscale900: '#000',
    secondaryWhite: '#F0F0F0',
    primary: '#007BFF',
    greyScale800: '#4D4D4D',
    dark2: '#1A1A1A',
    dark3: '#2D2D2D',
    transparentPrimary: '#007BFF20',
    grayscale200: '#E0E0E0',
    black: '#000000',
};
 export const lightModeColors = {
    white: '#FFf',
    greyscale900: '#000',
    secondaryWhite: '#F0F0F0',
    primary: '#007BFF',
    greyScale800: '#4D4D4D',
    transparentPrimary: '#007BFF20',
    grayscale200: '#E0E0E0',
    black: '#000000',
};