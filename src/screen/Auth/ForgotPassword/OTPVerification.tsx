import { View, Text, StyleSheet, ScrollView,  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OtpInput } from "react-native-otp-entry";
import Checkbox from 'expo-checkbox';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../../constants/theme';
import { useDarkMode } from '../../../Hooks/darkmode/useDarkMode';
import useActions from '../../../Hooks/language/useActions';
import useLanguage from '../../../Hooks/language/useLanguage';
import Button from '../../../components/Button';


const OTPVerification = ({ navigation }) => {
  const [time, setTime] = useState(55);
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { setLanguage, setIsRTL } = useActions();
  const { colors, isDarkMode } = useDarkMode();
  
  // Example dynamic phone number
  const phoneNumber = "+966 999 ******99";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView>
          <Text style={[styles.title, { color: isDarkMode ? COLORS.white : COLORS.black }]}>
            {t('ForgotPassword.codeSentTo', { phoneNumber })}
          </Text>
          <OtpInput
            numberOfDigits={4}
            onTextChange={(text) => console.log(text)}
            focusColor={COLORS.primary}
            focusStickBlinkingDuration={500}
            onFilled={(text) => console.log(`OTP is ${text}`)}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: isDarkMode ? COLORS.dark2 : COLORS.secondaryWhite,
                borderColor: isDarkMode ? COLORS.gray : COLORS.secondaryWhite,
                borderWidth: 0.4,
                borderRadius: 10,
                height: 58,
                width: 58,
              },
              pinCodeTextStyle: {
                color: isDarkMode ? COLORS.white : COLORS.black,
              },
            }}
          />
          <View style={styles.codeContainer}>
            <Text style={[styles.code, { color: isDarkMode ? COLORS.white : COLORS.greyscale900 }]}>
              {t('ForgotPassword.resendCodeIn', { time })}
            </Text>
          </View>
        </ScrollView>
        <Button
          title={t('ForgotPassword.ResetPassword')}
          filled
          style={styles.button}
          onPress={() => {
            navigation.navigate('CreateNewPassword');
          }}
        />
      </View>
    </SafeAreaView>
  );
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
  title: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 54
  },
  OTPStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderRadius: 8,
    height: 58,
    width: 58,
   
    borderBottomColor: "gray",
    borderBottomWidth: .4,
    borderWidth: .4,
   
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    justifyContent: "center"
  },
  code: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.greyscale900,
    textAlign: "center"
  },
  time: {
    fontFamily: "medium",
    fontSize: 18,
    color: COLORS.primary
  },
  button: {
    borderRadius: 32
  }
})

export default OTPVerification