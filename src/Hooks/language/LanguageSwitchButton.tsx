import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Platform
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  setIsRTL,
  setLoading,
} from "../../redux/Language/languageSlice";
import { RootState } from "../../redux/store";
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useDarkMode } from "../../Hooks/darkmode/useDarkMode";
import { COLORS, SIZES } from "../../constants/theme";
import { t } from "i18next";
import Checkbox from 'expo-checkbox';
import * as Updates from 'expo-updates';  // Make sure to import Updates

const LanguageSwitchButton = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.language);
  const loading = useSelector((state: RootState) => state.language.loading);
  const refRBSheet = useRef(null);
  const { colors, isDarkMode } = useDarkMode();

  const [selectedLanguage, setSelectedLanguage] = useState<string>(currentLanguage);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
   
  ];

 const handleLanguageChange = async () => {
  try {
    if (!selectedLanguage) {
      Alert.alert("No Language Selected", "Please select a language.");
      return;
    }
    const isRTL = selectedLanguage === 'ar';

    dispatch(setLoading(true));
    dispatch(setLanguage(selectedLanguage));
    dispatch(setIsRTL(isRTL));

    if (Platform.OS === 'android') {
      // Show alert and reload the app
      Alert.alert(
        "Language Changed",
        "The language has been changed. The app will now restart to apply the changes.",
        [
          { 
            text: "OK",
            onPress: async () => {
              await Updates.reloadAsync(); 
            }
          }
        ]
      );
    } else {
      // Close the sheet directly on iOS
      refRBSheet.current?.close();
    }
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
          { backgroundColor: colors.background },
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
            {languages.find(lang => lang.code === selectedLanguage)?.name || t("selectLanguage")}
          </Text>
        </View>
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        height={220}
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
        <ScrollView style={styles.scrollContainer}>
          {languages.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={styles.checkboxContainer}
              onPress={() => setSelectedLanguage(lang.code)}
            >
              <Checkbox
                value={selectedLanguage === lang.code}
                onValueChange={() => setSelectedLanguage(lang.code)}
                color={isDarkMode ? COLORS.white : COLORS.greyscale900}
                style={styles.checkbox}
              />
              <Text style={[
                styles.languageText,
                { color: isDarkMode ? COLORS.white : COLORS.greyscale900 },
              ]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={handleLanguageChange}
            style={styles.applyButton}
          >
            <Text style={styles.buttonText}>{t("apply")}</Text>
          </TouchableOpacity>
        </ScrollView>
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
    fontFamily: "semiBold",
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyscale300,
  },
  checkbox: {
    marginRight: 10,
  },
  languageText: {
    fontSize: 16,
    flex: 1,  // Allows the text to take up remaining space
  },
  scrollContainer: {
    width: '100%',
  },
  applyButton: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
  },
  sheetOption: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});

export default LanguageSwitchButton;
