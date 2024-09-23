import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
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
import { illustrations, images } from '../../constants';
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
  const { t } = useTranslation();
  const [formState, dispatchFormState] = useState(initialState);
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const { colors, isDarkMode } = useDarkMode();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
    },
    [dispatchFormState]
  )

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
     Alert.alert("Google Authentication");
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>

        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={illustrations.logo}
              resizeMode='contain'
            
            />
          </View>
          <Text style={[styles.title, { color: isDarkMode ? COLORS.white : COLORS.black }]}>
            {t('loginScreen.title')}
          </Text>
          <Text style={[styles.subtitle, { color: isDarkMode ? COLORS.white : COLORS.black }]}>
            {t('loginScreen.subtitle')}
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
          <TouchableOpacity style={styles.checkBoxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              color={isChecked ? COLORS.accent : isDarkMode ? COLORS.primary : "gray"}
              onValueChange={setChecked}
            />
            <Text style={[styles.privacy, { color: isDarkMode ? COLORS.white : COLORS.black }]}>
              {t('loginScreen.rememberMe')}
            </Text>
          </TouchableOpacity>
          <Button
            title={t('loginScreen.btnLogin')}
            filled
            onPress={() => navigation.navigate("BottomTabNavigator")}
            style={styles.button}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPasswordMethods")}>
            <Text style={styles.forgotPasswordBtnText}>{t('loginScreen.forgotPassword')}</Text>
          </TouchableOpacity>
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

            />
          </View>
          <View style={styles.bottomContainer}>
            <Text style={[styles.bottomLeft, { color: isDarkMode ? COLORS.white : COLORS.black }]}>
              {t('loginScreen.dontHaveAccount')}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("registerScreen")}>
              <Text style={styles.bottomRight}>{t('register')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
   
  },
  container: {
    flex: 1,
    padding: 16,
    
  },
  scrollViewContent: {
    paddingBottom: 50, 
    flexGrow: 1, 
  },
  logo: {
    width: 100,
    height: 100,
  
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
  subtitle: {
    fontSize: 14,
    fontFamily: "bold",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 10
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  checkbox: {
    marginRight: 8,
    height: 22,
    width: 22,
  },
  privacy: {
    fontSize: 13,
    fontFamily: "regular",
    color: COLORS.black,
  },
  button: {
    marginVertical: 12,
    width: '100%',
    borderRadius: 30
  },
  forgotPasswordBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 8
  },
  socialBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    position: "absolute",
    bottom: 0,
    width: '100%',
  },
  bottomLeft: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.black
  },
  bottomRight: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.primary,
    marginHorizontal: 5
  }
})

export default Login;
