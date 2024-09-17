import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Checkbox from 'expo-checkbox';
import { useTranslation } from 'react-i18next';
import useLanguage from '../../Hooks/language/useLanguage';
import useActions from '../../Hooks/language/useActions';
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';
import { validateInput } from '../../utils/actions/formActions';
import Header from '../../components/Header';
import { images } from '../../constants';
import { COLORS, SIZES } from '../../constants/theme';
import Input from '../../components/Input';
import Button from '../../components/Button';


const isTestMode = true;

const initialState = {
    inputValues: {
        email: isTestMode ? 'fahad@gmail.com' : '',
    },
    inputValidities: {
        email: false
    },
    formIsValid: false,
}

const ForgotPasswordEmail = ({ navigation }) => {
    const [formState, dispatchFormState] = useState(initialState);
    const [error, setError] = useState(null);
    const [isChecked, setChecked] = useState(false);
   const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { setLanguage, setIsRTL } = useActions();
  const { colors, isDarkMode } = useDarkMode();

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Forgot Password" />
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
                    }]}>Enter to Your Email</Text>
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
                    <View style={styles.checkBoxContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Checkbox
                                style={styles.checkbox}
                                value={isChecked}
                                color={isChecked ? COLORS.primary : isDarkMode ? COLORS.primary : "gray"}
                                onValueChange={setChecked}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.privacy, {
                                    color: isDarkMode ? COLORS.white : COLORS.black
                                }]}>  {t('loginScreen.rememberMe')}</Text>
                            </View>
                        </View>
                    </View>
                    <Button
                        title="Reset Password"
                        filled
                        onPress={() => navigation.navigate("OTPVerification")}
                        style={styles.button}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.forgotPasswordBtnText}>Remenber the password?</Text>
                    </TouchableOpacity>
                    <View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <Text style={[styles.bottomLeft, {
                        color: isDarkMode ? COLORS.white : COLORS.black
                    }]}>            {t('loginScreen.dontHaveAccount')}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.bottomRight}>{"  "}Sign Up</Text>
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
        textAlign: "center"
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    // title: {
    //     fontSize: 26,
    //     fontFamily: "semiBold",
    //     color: COLORS.black,
    //     textAlign: "center",
    //     marginBottom: 22
    // },
    checkBoxContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 18,
    },
    checkbox: {
        marginRight: 8,
        height: 16,
        width: 16,
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
    }
})

export default ForgotPasswordEmail