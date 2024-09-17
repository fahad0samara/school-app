import React, { useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  I18nManager,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  setIsRTL,
  setLoading,
} from "../../redux/Language/languageSlice";
import { RootState } from "../../redux/store";
import * as Updates from "expo-updates";
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import useLanguage from "../../Hooks/language/useLanguage";
import { useDarkMode } from "../../Hooks/darkmode/useDarkMode";
import { COLORS, SIZES } from "../../constants/theme";
import { t } from "i18next";

const LanguageSwitchButton = () => {
  const dispatch = useDispatch();
   const { language, isRTL } = useLanguage();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const loading = useSelector((state: RootState) => state.language.loading);
  const refRBSheet = useRef(null);
  const { colors, isDarkMode } = useDarkMode();
  const newLanguage = currentLanguage === "en" ? "ar" : "en";

  const handleLanguageChange = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setLanguage(newLanguage));
      dispatch(setIsRTL(isRTL));
      I18nManager.forceRTL(isRTL);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Alert.alert(
        "Restart Required",
        "The app will restart to apply the language and layout direction changes.",
        [
          {
            text: "OK",
            onPress: async () => {
              await Updates.reloadAsync();
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error switching language:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" color={COLORS.primary} />}

      <TouchableOpacity
        onPress={() => refRBSheet.current?.open()}
        style={[
          styles.settingsItemContainer,
          { backgroundColor: colors.background},
        ]}
      >
        <View style={styles.leftContainer}>
          <MaterialIcons
            name="language"
            size={24}
            color={isDarkMode ? COLORS.white : COLORS.greyscale900}
          />
          <Text
            style={[
              styles.settingsName,
              { color: isDarkMode ? COLORS.white : COLORS.greyscale900 },
            ]}
          >
            {t("languageRegion")}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text
            style={[
              styles.rightLanguage,
              { color: isDarkMode ? COLORS.white : COLORS.greyscale900 },
            ]}
          >
            {newLanguage === "en" ? "العربية" : "English"}
          </Text>
        </View>
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        height={200}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: colors.background,
          },
        }}
      >
        <TouchableOpacity
          onPress={handleLanguageChange}
          style={{ marginBottom: 10 }}
        >
          <Text style={[styles.sheetOption, { color: COLORS.primary }]}>
            {newLanguage === "en" ? "Switch to Arabic" : "Switch to English"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
          <Text style={[styles.sheetOption, { color: COLORS.grayscale700 }]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsItemContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

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
    fontFamily: "semiBold", // Ensure the correct font is loaded
    marginLeft: 8,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightLanguage: {
    fontSize: 18,
    marginRight: 8,
  },
  sheetOption: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});

export default LanguageSwitchButton;
