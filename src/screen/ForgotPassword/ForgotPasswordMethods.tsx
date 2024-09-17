import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import useLanguage from '../../Hooks/language/useLanguage';
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';
import useActions from '../../Hooks/language/useActions';
import Header from '../../components/Header';
import { COLORS, SIZES } from '../../constants/theme';
import { icons } from '../../constants';
import Button from '../../components/Button';
import illustrations from '../../constants/illustrations';


const ForgotPasswordMethods = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState('sms');
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { setLanguage, setIsRTL } = useActions();
  const { colors, isDarkMode } = useDarkMode();

  const handleMethodPress = (method) => {
    setSelectedMethod(method);
  };
  
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Forgot Password" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.passwordContainer}>
            <Image
              source={isDarkMode ? illustrations.forgotpassword : illustrations.forgotpassword}
              resizeMode='contain'
              style={styles.password}
            />
          </View>
          <Text style={[styles.title, {
            color: isDarkMode ? COLORS.white : COLORS.greyscale900
          }]}>Select which contact details
            should we use to reset your password</Text>
          <TouchableOpacity
            style={[
              styles.methodContainer,
              selectedMethod === 'sms' && { borderColor: COLORS.primary, borderWidth: 2 }, // Customize the border color for SMS
            ]}
            onPress={() => handleMethodPress('sms')}>
            <View style={styles.iconContainer}>
              <Image
                source={icons.chat}
                resizeMode='contain'
                style={styles.icon} />
            </View>
            <View>
              <Text style={styles.methodTitle}>via SMS:</Text>
              <Text style={[styles.methodSubtitle, {
                color: isDarkMode ? COLORS.white : COLORS.black
              }]}>+1 111 ******99</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodContainer,
              selectedMethod === 'email' && { borderColor: COLORS.primary, borderWidth: 2 }, // Customize the border color for Email
            ]}
            onPress={() => handleMethodPress('email')}>
            <View style={styles.iconContainer}>
              <Image
                source={icons.email}
                resizeMode='contain'
                style={styles.icon} />
            </View>
            <View>
              <Text style={styles.methodTitle}>via Email:</Text>
              <Text style={[styles.methodSubtitle, {
                color: isDarkMode ? COLORS.white : COLORS.black
              }]}>and***ley@yourdomain.com</Text>
            </View>
          </TouchableOpacity>
          <Button
            title="Continue"
            filled
            style={styles.button}
            onPress={() =>
              navigation.navigate(
                selectedMethod === "sms"
                  ? 'ForgotPasswordPhoneNumber'
                  : 'ForgotPasswordEmail'
              )
            }
          />
        </ScrollView>
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
    backgroundColor: COLORS.white,
    padding: 16
  },
  password: {
    width: 276,
    height: 250
  },
  passwordContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32
  },
  title: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.greyscale900
  },
  methodContainer: {
    width: SIZES.width - 32,
    height: 112,
    borderRadius: 32,
    borderColor: "gray",
    borderWidth: .3,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.transparentPrimary,
    marginHorizontal: 16
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: COLORS.primary
  },
  methodTitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.greyscale600
  },
  methodSubtitle: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black,
    marginTop: 12
  },
  button: {
    borderRadius: 32,
    marginVertical: 22
  }
})

export default ForgotPasswordMethods