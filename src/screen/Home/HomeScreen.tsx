import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';
import CourseCard from './CourseCard';
import UniversitiesSection from './UniversitiesSection';
import CourseList from './CourseList';
import AppIcon from '../../utils/AppIcon';
import { COLORS, SIZES } from '../../constants/theme';
import { images } from '../../constants';
import SectionHeader from './common/SectionHeader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { colors, isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const isRTL = useSelector((state) => state.language.isRTL);

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => navigation.navigate("PersonalProfile")}>
                    <Image source={images.logo} resizeMode='cover' style={styles.avatar} />
                </TouchableOpacity>
                <Text style={[styles.username, { color: isDarkMode ? COLORS.white : COLORS.greyscale900 }]}>
                    {t('greeting')}
                </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                <AppIcon iconSet="Ionicons" name="notifications-circle" size={24} color={isDarkMode ? COLORS.white : COLORS.greyscale900} style={styles.bellIcon} />
            </TouchableOpacity>
        </View>
    );

    const renderSearchBar = () => {
        const [search, setSearch] = useState("");
        const handleInputFocus = () => {
            navigation.navigate('SearchScreen');
        };

        return (
            <View style={[styles.searchContainer, { borderColor: isDarkMode ? COLORS.grayscale700 : "#000" }]}>
                <TouchableOpacity>
                    <AppIcon name="search" size={24} color={"#FE8A54"} style={styles.searchIcon} iconSet="FontAwesome" />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                    placeholder={t('searchPlaceholder')}
                    placeholderTextColor="#FE8A54"
                    onFocus={handleInputFocus}
                />
                <TouchableOpacity>
                    <AppIcon name="filter" size={24} color={isDarkMode ? COLORS.white : COLORS.greyscale900} style={styles.filterIcon} iconSet="Ionicons" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderSearchBar()}
                    <View style={styles.section}>
                        <SectionHeader 
                            title={t('ongoingLearning')} 
                            seeAllText={t('seeAll')} 
                            onSeeAllPress={() => navigation.navigate('AllOngoingCourses')} 
                        />
                     <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
    <Text style={[styles.sectionSubtitle, { textAlign: isRTL ? 'right' : 'left' }]}>
        {t('sectionSubtitle')}
    </Text>
</View>

                        <CourseCard navigation={navigation} />
                        <SectionHeader 
                            title={t('universities')}
                            seeAllText={t('seeAll')} 
                            onSeeAllPress={() => navigation.navigate('AllUniversities')} 
                        />
                        <UniversitiesSection />
                        <SectionHeader 
                            title={t('latestCourses')}
                            seeAllText={t('seeAll')} 
                            onSeeAllPress={() => navigation.navigate('AllOngoingCourses')} 
                        />
                        <CourseList />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 32,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 999,
        marginRight: 12,
    },
    username: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.black,
    },
    bellIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black,
    },
    searchContainer: {
        height: 50,
        width: SIZES.width - 32,
        borderRadius: 30,
        borderWidth: 1,
        marginTop: 22,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    },
    searchIcon: {
        height: 20,
        width: 20,
        tintColor: "#BABABA",
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        marginHorizontal: 8,
        borderRightColor: "#BABABA",
        borderRightWidth: 0.4,
    },
    filterIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.black,
    },
    section: {
        marginVertical: 8,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: "#FE8A54",
        fontStyle:"italic"
     
    },
});

export default Home;
