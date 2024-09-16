import React, { useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, I18nManager, LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, setIsRTL, setLoading } from '../../redux/Language/languageSlice';
import { RootState } from '../../redux/store';
import * as Updates from 'expo-updates';
import RBSheet from 'react-native-raw-bottom-sheet';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { darkModeColors, lightModeColors } from '../../constants/theme';
import { t } from 'i18next';

const LanguageSwitchButton = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.language);
  const loading = useSelector((state: RootState) => state.language.loading);
  const refRBSheet = useRef<RBSheet>(null);
    const dark = useSelector((state: RootState) => state.darkmode.darkmode);

  const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  const isRTL = newLanguage === 'ar';

  const handleLanguageChange = async () => {
    try {
      // Set loading state to true
      dispatch(setLoading(true));

      // Set language and RTL direction
      dispatch(setLanguage(newLanguage));
      dispatch(setIsRTL(isRTL));

      // Apply RTL changes
      I18nManager.forceRTL(isRTL);

      // Trigger a layout update
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      // Show a message before the reload
      Alert.alert(
        "Restart Required",
        "The app will restart to apply the language and layout direction changes.",
        [
          {
            text: "OK",
            onPress: async () => {
              // Reload the app
              await Updates.reloadAsync();
            }
          }
        ]
      );
    } catch (error) {
      console.error("Error switching language:", error);
    } finally {
      // Set loading state to false
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      <TouchableOpacity onPress={() => refRBSheet.current?.open()} style={styles.settingsItemContainer}>
        <View style={styles.leftContainer}>
          <MaterialIcons
            name="language"
            size={24}
            color="#000" // Adjust color based on your theme
          />
           <Text style={[styles.settingsName, {
                        color: dark ? darkModeColors.white : lightModeColors.greyscale900
                    }]}>{t('languageRegion')}</Text>
        </View>
         <View style={styles.rightContainer}>
                    <Text style={[styles.rightLanguage, {
                        color: dark ? darkModeColors.white : lightModeColors.greyscale900
                    }]}>{t('englishUS')}</Text>
                <FontAwesome
                        name="chevron-right"
                        size={24}
                        color={dark ? '#fff' : '#1F1F1F'}
                    />
                </View>
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        height={200}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }
        }}
      >
    
        <TouchableOpacity onPress={handleLanguageChange} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16, color: '#007BFF' }}>
            Switch to {newLanguage === 'en' ? 'Arabic' : 'English'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
          <Text style={{ fontSize: 16, color: 'gray' }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

const styles = {
    settingsItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsName: {
    fontSize: 16,
    marginLeft: 8,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightLanguage: {
    fontSize: 16,
    marginRight: 8,
  },
};

export default LanguageSwitchButton;
