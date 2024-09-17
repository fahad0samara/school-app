import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Switch,
    ScrollView,
    ViewStyle,
    TextStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons'; // Import vector icons
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import Button from '../../components/Button';
import SettingsItem from '../../components/SettingsItem';
import { launchImagePicker } from '../../utils/ImagePickerHelper';
import { useTranslation } from 'react-i18next';
import useLanguage from '../../Hooks/language/useLanguage';
import { toggleDarkMode } from '../../redux/DarkMod/darkModeSlice';
import LanguageSwitchButton from '../../Hooks/language/LanguageSwitchButton';
import { darkModeColors, lightModeColors } from '../../constants/theme';
import DarkModeToggleItem from '../../Hooks/darkmode/DarkModeToggle';
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';



const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
    const refRBSheet = useRef(null);
    const { colors,isDarkMode  } = useDarkMode();
    const dispatch = useDispatch();

    const { t } = useTranslation();
    const language = useLanguage();

    const toggleDarkModeSwitch = () => {
        dispatch(toggleDarkMode()); 
    };

    const renderHeader = () => (
        <TouchableOpacity style={styles.headerContainer}>
            <View style={styles.headerLeft}>
                <FontAwesome
                    name="user-circle"
                    size={40}
                    color={isDarkMode ? darkModeColors.white : lightModeColors.greyscale900}
                />
                <Text style={[styles.headerTitle, {
                    color: isDarkMode ? darkModeColors.white : lightModeColors.greyscale900
                }]}>{t('profile')}</Text>
            </View>
            <TouchableOpacity>
                <MaterialIcons
                    name="more-vert"
                    size={24}
                    color={isDarkMode ? darkModeColors.secondaryWhite : lightModeColors.greyscale900}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderProfile = () => {
        const [image, setImage] = useState<string | undefined>(undefined);

        const pickImage = async () => {
            try {
                const tempUri = await launchImagePicker();
                if (!tempUri) return;
                setImage(tempUri);
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <View style={styles.profileContainer}>
                <View>
                    <Image
                        source={image ? { uri: image } : require('../../../assets/user1.png')}
                        resizeMode='cover'
                        style={styles.avatar}
                    />
                    <TouchableOpacity
                        onPress={pickImage}
                        style={styles.picContainer}>
                        <MaterialIcons name="edit" size={16} color={isDarkMode ? darkModeColors.white : lightModeColors.white} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.title, { color: isDarkMode ? darkModeColors.secondaryWhite : lightModeColors.greyscale900 }]}>fahad samara</Text>
                <Text style={[styles.subtitle, { color: isDarkMode ? darkModeColors.secondaryWhite : lightModeColors.greyscale900 }]}>fahad@gmail.com</Text>
            </View>
        );
    };

    const renderSettings = () => {
        return (
            <View style={styles.settingsContainer}>
            <SettingsItem
                icon="person-outline"
                name={t('myBooking')}
                onPress={() => navigation.navigate("MyBookings")}
            />
            <SettingsItem
                icon="person-outline" 
                name={t('editProfile')}
                onPress={() => navigation.navigate("EditProfile")}
            />
            <SettingsItem
                icon="notifications" 
                name={t('notification')}
                onPress={() => navigation.navigate("SettingsNotifications")}
            />
            <SettingsItem
                icon="payment" 
                name={t('payment')}
                onPress={() => navigation.navigate("SettingsPayment")}
            />
            <SettingsItem
                icon="security" 
                name={t('security')}
                onPress={() => navigation.navigate("SettingsSecurity")}
            />
        
            <LanguageSwitchButton language={language} newLanguage={language === 'en' ? 'ar' : 'en'} />
        <DarkModeToggleItem toggleDarkModeSwitch={toggleDarkModeSwitch} />
            <SettingsItem
                icon="privacy-tip" // Pass as a string
                name={t('privacyPolicy')}
                onPress={() => navigation.navigate("SettingsPrivacyPolicy")}
            />
            <SettingsItem
                icon="help-outline" // Pass as a string
                name={t('helpCenter')}
                onPress={() => navigation.navigate("HelpCenter")}
            />
            <SettingsItem
                icon="people" // Pass as a string
                name={t('inviteFriends')}
                onPress={() => navigation.navigate("InviteFriends")}
            />
            <TouchableOpacity
                onPress={() => refRBSheet.current?.open()}
                style={styles.logoutContainer}
            >
                <View style={styles.logoutLeftContainer}>
                    <MaterialIcons
                        name="logout"
                        size={24}
                        color="red"
                    />
                    <Text style={styles.logoutText}>{t('logout')}</Text>
                </View>
            </TouchableOpacity>
        </View>
        );
    };

    return (
        <SafeAreaView style={[styles.safeArea,{backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {renderHeader()}
                {renderProfile()}
                {renderSettings()}
            </ScrollView>
            <RBSheet
                ref={refRBSheet}
                height={200}
                openDuration={250}
                customStyles={{ container: styles.sheetContainer }}>
                <View style={styles.sheetContent}>
                    <Text style={styles.sheetTitle}>{t('logout')}</Text>
                    <Button
                        title={t('logout')}
                        onPress={() => {/* Handle logout logic */}}
                    />
                </View>
            </RBSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        
    },
    scrollViewContainer: {
        paddingHorizontal: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    picContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    settingsContainer: {
        marginTop: 20,
    },
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
        marginLeft: 10,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightLanguage: {
        fontSize: 16,
        marginRight: 10,
    },
    switch: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    logoutLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 16,
        color: 'red',
        marginLeft: 10,
    },
    sheetContainer: {
        padding: 20,
    },
    sheetContent: {
        alignItems: 'center',
    },
    sheetTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Profile;
