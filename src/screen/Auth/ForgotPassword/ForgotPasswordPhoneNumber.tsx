import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, TextInput, } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Checkbox from 'expo-checkbox';
import { useTranslation } from 'react-i18next';
import { images } from '../../../constants';
import { SIZES, COLORS } from '../../../constants/theme';
import { useDarkMode } from '../../../Hooks/darkmode/useDarkMode';
import useActions from '../../../Hooks/language/useActions';
import useLanguage from '../../../Hooks/language/useLanguage';
import AppIcon from '../../../utils/AppIcon';
import Button from '../../../components/Button';




const ForgotPasswordPhoneNumber = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { setLanguage, setIsRTL } = useActions();
  const { colors, isDarkMode } = useDarkMode();

  useEffect(() => {
    if (error) {
      Alert.alert(t('error'), error); 
    }
  }, [error]);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then(response => response.json())
      .then(data => {
        let areaData = data.map((item) => {
          return {
            code: item.alpha2Code,
            item: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`
          }
        });

        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultData = areaData.filter((a) => a.code == "KW");

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0])
          }
        }
      })
  }, [])

  function RenderAreasCodesModal() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: "row"
          }}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}>
          <Image
            source={{ uri: item.flag }}
            style={{
              height: 30,
              width: 30,
              marginRight: 10
            }}
          />
          <Text style={{ fontSize: 16, color: "#fff" }}>{item.item}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.primary,
                borderRadius: 12
              }}>
              <FlatList
                data={areas}
                renderItem={renderItem}
                horizontal={false}
                keyExtractor={(item) => item.code}
                style={{
                  padding: 20,
                  marginBottom: 20
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
     
        <ScrollView style={{ marginVertical: 54 }} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={images.logo}
              resizeMode='contain'
              style={styles.logo}
            />
          </View>
          <Text style={[styles.title, {
            color: isDarkMode ? COLORS.white : COLORS.black
          }]}>
            {t('ForgotPasswordPhoneNumber.title')}
          </Text>
          <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? COLORS.dark2 : COLORS.greyscale500 }]}>
            <TouchableOpacity
              style={styles.selectFlagContainer}
              onPress={() => setModalVisible(true)}>
              <View style={{ justifyContent: "center" }}>
                <AppIcon
                  size={24}
                  color={isDarkMode ? COLORS.accent : COLORS.greyscale900}
                  name="chevron-down-circle-outline"
                  style={styles.downIcon}
                  
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  source={{ uri: selectedArea?.flag }}
                  style={styles.flagIcon}
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Text style={{ color: isDarkMode ? COLORS.white : COLORS.black, fontSize: 12 }}>{selectedArea?.callingCode}</Text>
              </View>
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { color: isDarkMode ? COLORS.white : COLORS.black }]}
              placeholder={t('ForgotPasswordPhoneNumber.phoneNumber')}
              placeholderTextColor={COLORS.gray}
              selectionColor="#111"
              keyboardType="numeric"
            />
          </View>
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
                }]}>
                  {t('ForgotPasswordPhoneNumber.rememberMe')}
                </Text>
              </View>
            </View>
          </View>
          <Button
            title={t('ForgotPasswordPhoneNumber.resetPassword')}
            filled
            onPress={() => navigation.navigate("OTPVerification")}
        
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("loginScreen")}>
            <Text style={styles.forgotPasswordBtnText}>{t('ForgotPasswordPhoneNumber.forgotPasswordText')}</Text>
          </TouchableOpacity>
          <View>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Text style={[styles.bottomLeft, {
            color: isDarkMode ? COLORS.white : COLORS.black
          }]}>
            {t('ForgotPasswordPhoneNumber.dontHaveAccount')}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("registerScreen")}>
            <Text style={styles.bottomRight}>{""} {t('register')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {RenderAreasCodesModal()}
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
        textAlign: "center"
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
    inputContainer: {
        flexDirection: "row",
        borderColor: COLORS.greyscale500,
        borderWidth: .4,
        borderRadius: 6,
        height: 58,
        width: SIZES.width - 32,
        alignItems: 'center',
        marginVertical: 16,
        backgroundColor: COLORS.greyscale500,
    },
    downIcon: {
        width: 10,
        height: 10,
        tintColor: "#111"
    },
    selectFlagContainer: {
        width: 90,
        height: 50,
        marginHorizontal: 5,
        flexDirection: "row",
    },
    flagIcon: {
        width: 30,
        height: 30
    },
    input: {
        flex: 1,
        marginVertical: 10,
        height: 40,
        fontSize: 14,
        color: "#111"
    }
})

export default ForgotPasswordPhoneNumber