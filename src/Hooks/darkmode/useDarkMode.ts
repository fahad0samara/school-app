import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getThemeColors } from "./themeColors";



// Hook to get dark mode state and theme colors
export const useDarkMode = () => {
  const isDarkMode = useSelector((state: RootState) => state.darkmode.darkmode);
  const colors = getThemeColors(isDarkMode);
  return { isDarkMode, colors };
};