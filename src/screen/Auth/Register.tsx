import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';
import { COLORS, SIZES } from '../../constants/theme';
import Header from '../../components/Header';
import { icons } from '../../constants';
import Input from '../../components/Input';
import { validateInput } from '../../utils/actions/formActions';
import { launchImagePicker } from '../../utils/ImagePickerHelper';
import { FONTS } from '../../constants/fonts';
import Button from '../../components/Button';

import { images } from '../../constants';
import { useTranslation } from 'react-i18next';
import Checkbox from 'expo-checkbox';
import SocialButton from '../../components/SocialButton';
import OrSeparator from '../../components/OrSeparator';
import useLanguage from '../../Hooks/language/useLanguage';

;

const isTestMode = true;

const initialState = {
  inputValues: {
    fullName: isTestMode ? 'John Doe' : '',
    email: isTestMode ? 'example@gmail.com' : '',
    nickname: isTestMode ? "" : "",
    phoneNumber: ''
  },
  inputValidities: {
    fullName: false,
    email: false,
    nickname: false,
    phoneNumber: false,
  },
  formIsValid: false,
}


const Register = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useState( initialState);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
   const [isChecked, setChecked] = useState(false);
 const { isRTL } = useLanguage();
  const { colors, isDarkMode } = useDarkMode();
  const { t } = useTranslation();





  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
    },
    [dispatchFormState]
  )

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error)
    }
  }, [error])

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker()

      if (!tempUri) return

      // set the image
      setImage({ uri: tempUri })
    } catch (error) { }
  };
    const googleAuthHandler = () => {
    console.log("Google Authentication");
  };

  // fectch codes from rescountries api
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
          let defaultData = areaData.filter((a) => a.code == "US");

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0])
          }
        }
      })
  }, [])

  // render countries codes modal
  function RenderAreasCodesModal() {

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: "row"
          }}
          onPress={() => {
            setSelectedArea(item),
              setModalVisible(false)
          }}>
          <Image
            source={{ uri: item.flag }}
            contentFit='contain'
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
                height: SIZES.height,
                width: SIZES.width,
                backgroundColor: COLORS.primary,
                borderRadius: 12
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}>
                <Ionicons name="close-outline" size={24} color={COLORS.primary} />
              </TouchableOpacity>
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
        <Header title={t('registerScreen.title')} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", marginVertical: 12 }}>
            <View style={styles.avatarContainer}>
              <Image
                source={image === null ? images.logo : image}
                resizeMode="cover"
                style={styles.avatar} />
              <TouchableOpacity
                onPress={pickImage}
                style={styles.pickImage}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Input
              id="fullName"
                iconType="icon"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['fullName']}
               placeholder={t('registerScreen.usernamePlaceholder')}
               placeholderTextColor={isDarkMode ? COLORS.grayTie : COLORS.black}
                 icon="user"
               
               />
         
            <Input
           id="email"
            iconType="icon"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['email']}
            placeholder={t('loginScreen.emailPlaceholder')}
            placeholderTextColor={isDarkMode ? COLORS.grayTie : COLORS.black}
            icon="mail"
            keyboardType="email-address" />
            <View style={{
              width: SIZES.width - 32
            }}>

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

          
            </View>
            <View style={[styles.inputContainer, {
              backgroundColor: isDarkMode ? COLORS.dark2 : COLORS.greyscale500,
              borderColor: isDarkMode ? COLORS.dark2 : COLORS.greyscale500,
            }]}>
              <TouchableOpacity
                style={styles.selectFlagContainer}
                onPress={() => setModalVisible(true)}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={icons.down}
                    resizeMode='contain'
                    style={styles.downIcon}
                  />
                </View>
                <View style={{ justifyContent: "center", marginLeft: 5 }}>
                  <Image
                    source={{ uri: selectedArea?.flag }}
                    contentFit="contain"
                    style={styles.flagIcon}
                  />
                </View>
                <View style={{ justifyContent: "center", marginLeft: 5 }}>
                  <Text style={{ color: isDarkMode ? COLORS.white : "#111", fontSize: 12 }}>{selectedArea?.callingCode}</Text>
                </View>
              </TouchableOpacity>
              {/* Phone Number Text Input */}
              <TextInput
                            placeholderTextColor={isDarkMode ? COLORS.grayTie : COLORS.black}

                placeholder={t('registerScreen.phoneNumber')}
                   style={[
            styles.input,
            {
              color: isDarkMode ? COLORS.white : COLORS.black,
              textAlign: isRTL ? 'right' : 'left',
              textAlignVertical: 'center',
              writingDirection: isRTL ? 'rtl' : 'ltr',
            },
          ]}
                selectionColor="#111"
                keyboardType="numeric"

              />
            </View>
          </View>
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
                  {t('registerScreen.termAndConditionEmpty')}
                </Text>
              </View>
            </View>
          </View>
          <Button
            title={t('registerScreen.btnSubmit')}
            filled
            onPress={() => navigation.navigate("Main")}
            style={styles.button}
          />
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
            <View style={styles.bottomContainer}>
          <Text style={[styles.bottomLeft, {
            color: isDarkMode ? COLORS.white : COLORS.black
          }]}>{t('registerScreen.Already')}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}>
            <Text style={styles.bottomRight}>{" "}Sign In</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
            
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
  avatarContainer: {
    marginVertical: 12,
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  pickImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: COLORS.greyscale500,
    borderWidth: .4,
    borderRadius: 12,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 12,
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
    color: "#111",
    marginHorizontal:4
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.greyscale500,
    height: 52,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "space-between",
    marginTop: 4,
    backgroundColor: COLORS.greyscale500,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  // bottomContainer: {
  //   position: "absolute",
  //   bottom: 32,
  //   right: 16,
  //   left: 16,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   width: SIZES.width - 32,
  //   alignItems: "center"
  // },
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
  continueButton: {
    width: (SIZES.width - 32) / 2 - 8,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  closeBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    position: "absolute",
    right: 16,
    top: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  }
})

export default Register