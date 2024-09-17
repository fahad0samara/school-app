import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { COLORS, SIZES } from '../../constants/theme';
import { validateInput } from '../../utils/actions/formActions';
import Button from '../../components/Button';
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';
import SocialButton from '../../components/SocialButton';
import Input from '../../components/Input';
import OrSeparator from '../../components/OrSeparator';
import Header from '../../components/Header';
import icons from '../../constants/icons';
import { images } from '../../constants';
import { useTranslation } from 'react-i18next';

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? 'fahad@gmail.com' : '',
    password: isTestMode ? '111111' : '',
  },
  inputValidities: {
    email: false,
    password: false
  },
  formIsValid: false,
}

const Login = ({ navigation }) => {
  const { t } = useTranslation();1
  const [formState, dispatchFormState] = useState(initialState);
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const { colors, isDarkMode } = useDarkMode();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert(t('alert.errorTitle'), error);
    }
  }, [error, t]);

  const appleAuthHandler = () => {
    console.log("Apple Authentication");
  };

  const facebookAuthHandler = () => {
    console.log("Facebook Authentication");
  };

  const googleAuthHandler = () => {
    console.log("Google Authentication");
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              // source={images.logo}
              resizeMode='contain'
              style={styles.logo}
            />
          </View>
          <Text style={[styles.title, { color: isDarkMode ? COLORS.white : COLORS.black }]}>
            {t('loginScreen.title')}
          </Text>
             <Text style={[styles.suptitle, { color: isDarkMode ? COLORS.white : COLORS.black }]}>
            {t('loginScreen.suptitle')}
          </Text>
          <Input
            id="email"
            iconType="icon"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['email']}
            placeholder={t('loginScreen.emailPlaceholder')}
            placeholderTextColor={isDarkMode ? COLORS.grayTie : COLORS.black}
            icon="mail"
            keyboardType="email-address"
          />
          <Input
            iconType="icon"
            icon="lock"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['password']}
            autoCapitalize="none"
            id="password"
            placeholder={t('loginScreen.passwordPlaceholder')}
            placeholderTextColor={isDarkMode ? COLORS.grayTie : COLORS.black}
            secureTextEntry={true}
          />
          <View style={styles.checkBoxContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                color={isChecked ? COLORS.primary : isDarkMode ? COLORS.primary : "gray"}
                onValueChange={setChecked}
              />
              <View style={{ flex: 1 }}>
                <Text style={[styles.privacy, { color: isDarkMode ? COLORS.white : COLORS.black }]}>
                  {t('loginScreen.rememberMe')}
                </Text>
              </View>
            </View>
          </View>
          <Button
            title={t('loginScreen.btnLogin')}
            filled
            onPress={() => navigation.navigate("Main")}
            style={styles.button}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPasswordMethods")}>
            <Text style={styles.forgotPasswordBtnText}>{t('loginScreen.forgotPassword')}</Text>
          </TouchableOpacity>
          <View>
            <OrSeparator text={t('loginScreen.orContinueWith')} />
            <View style={styles.socialBtnContainer}>
              {/* <SocialButton
                // icon={icons.appleLogo}
                onPress={appleAuthHandler}
                tintColor={isDarkMode ? COLORS.white : COLORS.black}
              />
              <SocialButton
                // icon={icons.facebook}
                onPress={facebookAuthHandler}
              /> */}
              <SocialButton
                icon={icons.google}
                onPress={googleAuthHandler}
                tintColor
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Text style={[styles.bottomLeft, { color: isDarkMode ? COLORS.white : COLORS.black }]}>
            {t('loginScreen.dontHaveAccount')}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.bottomRight}>{t('loginScreen.signUp')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: COLORS.primary
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32
  },
  title: {
    fontSize: 28,
    fontFamily: "bold",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 10
  },
    suptitle: {
    fontSize: 14,
    fontFamily: "bold",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 10
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 18,
  },
  checkbox: {
    marginRight: 8,
    height: 20,
    width: 20,
    borderRadius: 4,
    borderColor: COLORS.green,
    borderWidth: 2,
  },
  privacy: {
    fontSize: 13,
    fontFamily: "regular",
    color: COLORS.black,
   marginTop:2
  },
  socialTitle: {
    fontSize: 19.25,
    fontFamily: "medium",
    color: COLORS.black,
    textAlign: "center",
    marginVertical: 26
  },
  socialBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 18,
    position: "absolute",
    bottom: 12,
    right: 0,
    left: 0,
  },
  bottomLeft: {
    fontSize: 14,
    fontFamily: "regular",
    color: "black"
  },
  bottomRight: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.primary,
    marginHorizontal: 5
  },
  button: {
    marginVertical: 6,
    width: SIZES.width - 32,
    borderRadius: 30
  },
  forgotPasswordBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 12
  }
})

export default Login;
