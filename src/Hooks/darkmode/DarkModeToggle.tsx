import React from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next"; 
import { useDarkMode } from "./useDarkMode";
import { COLORS, SIZES } from "../../constants/theme";

const DarkModeToggleItem = ({ toggleDarkModeSwitch }) => {
  const { isDarkMode, colors } = useDarkMode();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[
        styles.settingsItemContainer,
        { backgroundColor: colors.background1, borderColor: colors.border },
      ]} // Updated styling
      onPress={toggleDarkModeSwitch}
    >
      <View style={styles.leftContainer}>
        <MaterialIcons
          name="dark-mode"
          size={24}
          color={isDarkMode ? COLORS.white : COLORS.greyscale900}
        />
        <Text
          style={[
            styles.settingsName,
            { color: isDarkMode ? COLORS.white : COLORS.greyscale900 },
          ]}
        >
          {t("darkMode")}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkModeSwitch}
      
          thumbColor={isDarkMode ? COLORS.accent : COLORS.accent}
          ios_backgroundColor={COLORS.white}
          style={styles.switch}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingsItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   width: SIZES.width - 32,
       marginVertical: 7,
        padding: 8,
        borderRadius: 8, 
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsName: {
    fontSize: 16,
    marginLeft: 8,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
  },
});

export default DarkModeToggleItem;
