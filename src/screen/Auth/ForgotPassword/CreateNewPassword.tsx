import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableWithoutFeedback, Modal } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTranslation } from 'react-i18next';
import { validateInput } from '../../../utils/actions/formActions';
import useLanguage from '../../../Hooks/language/useLanguage';
import useActions from '../../../Hooks/language/useActions';
import { useDarkMode } from '../../../Hooks/darkmode/useDarkMode';
import { COLORS, SIZES } from '../../../constants/theme';
import illustrations from '../../../constants/illustrations';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { icons } from '../../../constants';
import Checkbox from 'expo-checkbox';
import Header from '../../../components/Header';

const isTestMode = true;

const initialState = {
  inputValues: {
    newPassword: isTestMode ? '**********' : '',
    confirmNewPassword: isTestMode ? '**********' : '',
  },
  inputValidities: {
    newPassword: false,
    confirmNewPassword: false,
  },
  formIsValid: false,
}

const CreateNewPassword = ({ navigation }) => {
  const { t } = useTranslation();
  const [formState, dispatchFormState] = useState( initialState);
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { language, isRTL } = useLanguage();
  const { setLanguage, setIsRTL } = useActions();
  const { colors, isDarkMode } = useDarkMode();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
    },
    [dispatchFormState]
  )



  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error)
    }
  }, [error])

  // Render modal
  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)}>
          <View style={[styles.modalContainer]}>
            <View style={[styles.modalSubContainer, {
              backgroundColor: isDarkMode ? COLORS.dark2 : COLORS.secondaryWhite,
              
            }]}>
           
              <Text style={styles.modalTitle}>{t('CreateNewPassword.Congratulations')}</Text>
              <Text style={styles.modalSubtitle}>{t('CreateNewPassword.Your')}</Text>
              <Button
                title={t('CreateNewPassword.Continue')}
                filled
                onPress={() => {
                  setModalVisible(false)
                  navigation.navigate("loginScreen")
                }}
                style={{
                  width: "100%",
                  marginTop: 12
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={ illustrations.ForgotPasswordsu }
              resizeMode='contain'
              style={styles.success} 
            />
          </View>
          <Text style={[styles.title, {
            color: isDarkMode ? COLORS.white : COLORS.black
          }]}>{t('CreateNewPassword.CreateYour')}</Text>
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['newPassword']}
            autoCapitalize="none"
            id="newPassword"
            placeholder={t('CreateNewPassword.NewPassword')}
            placeholderTextColor={isDarkMode ? COLORS.grayTie : COLORS.black}
              iconType="icon"
            icon="lock"
            secureTextEntry={true}
          />
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['confirmNewPassword']}
            autoCapitalize="none"
            id="confirmNewPassword"
            placeholder={t('CreateNewPassword.ConfirmPassword')}
            placeholderTextColor={isDarkMode ? COLORS.grayTie : COLORS.black}
              iconType="icon"
            icon="lock"
            secureTextEntry={true}
          />
          <View style={styles.checkBoxContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                color={isChecked ? COLORS.accent : isDarkMode ? COLORS.primary : "gray"}
                onValueChange={setChecked}
              />
              <View style={{ flex: 1 }}>
                <Text style={[styles.privacy, {
                  color: isDarkMode ? COLORS.white : COLORS.black
                }]}>{t('CreateNewPassword.Rememberme')}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <Button
          title={t('CreateNewPassword.Continue')}
          filled
          onPress={() => setModalVisible(true)}
          style={styles.button}
        />
        {renderModal()}
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
  success: {
    width: SIZES.width * 0.9,
    height: 290
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 52
  },
  title: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.black,
    marginVertical: 12
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
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  privacy: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.black,
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
    color: COLORS.primary
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
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 12
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: "regular",
    color: COLORS.greyscale600,
    textAlign: "center",
    marginVertical: 12
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalSubContainer: {
    height: 300,
    width: SIZES.width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  modalIllustration: {
    height: 180,
    width: 180,
    marginVertical: 22
  }
})

export default CreateNewPassword
