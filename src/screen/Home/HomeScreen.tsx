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
    TextStyle,
    TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { COLORS, darkModeColors, lightModeColors, SIZES } from '../../constants/theme';
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';
import { icons, images } from '../../constants';
import AppIcon from '../../utils/AppIcon';
import CouponCards from './CouponCards';
import CourseCard from './CourseCard';
import UniversitiesSection from './UniversitiesSection';
import CourseList from './CourseList';
 

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
     const { colors, isDarkMode } = useDarkMode();

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalProfile")}>
            <Image
              source={images.logo}
              resizeMode='cover'
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={[styles.username, { 
            color: isDarkMode? COLORS.white : COLORS.greyscale900
          }]}>Hi, fahad</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}>
          <AppIcon
            iconSet="Ionicons" 
           name="notifications-circle"
          size={24}
          color={isDarkMode? COLORS.white : COLORS.greyscale900}
          style={styles.bellIcon}
          />
          <View
            style={styles.Notifications}
          />
        </TouchableOpacity>
      </View>
    )
  }


 const renderSearchBar = () => {
    const [search, setSearch] = useState("");
    const handleInputFocus = () => {
       navigation.navigate('Search');
    };

    return (
        <View style={[styles.searchContainer, {  
            borderColor: isDarkMode ? COLORS.grayscale700 : "#E5E7EB"
        }]}>
            <TouchableOpacity>
                <AppIcon 
                    name="search" 
                    size={24} 
                    color={isDarkMode ? COLORS.white : "#BABABA"} 
                    style={styles.searchIcon} 
                    iconSet="FontAwesome" 
                />
            </TouchableOpacity>
            <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={(value) => setSearch(value)}
                placeholder='Search...'
                placeholderTextColor="#BABABA"
                onFocus={handleInputFocus}
            />
            <TouchableOpacity>
                <AppIcon 
                    name="filter" 
                    size={24} 
                    color={isDarkMode ? COLORS.white : COLORS.greyscale900} 
                    style={styles.filterIcon} 
                    iconSet="Ionicons" 
                />
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
          <Text style={styles.sectionTitle}>Coupons</Text>
          <Text style={styles.sectionSubtitle}>
            Check out our latest offers
          </Text>
         <CourseCard navigation={navigation} />
          <UniversitiesSection/>
         <CourseList 
         
          />
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

    padding: 16
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 32,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 999,
    marginRight: 12
  },
  username: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.black
  },
  bellIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
  },
  Notifications: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: COLORS.red,
    position: "absolute",
    top: 0,
    right: 3,
    zIndex: 99999
  },
  headerLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  searchContainer: {
    height: 50,
    width: SIZES.width - 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 22,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12
  },
  searchIcon: {
    height: 20,
    width: 20,
    tintColor: "#BABABA"
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginHorizontal: 8,
    borderRightColor: "#BABABA",
    borderRightWidth: .4
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.black
  },
  bannerContainer: {
    width: SIZES.width - 32,
    height: 154,
    paddingHorizontal: 28,
    paddingTop: 28,
    borderRadius: 32,
    backgroundColor: COLORS.primary
  },
   section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  bannerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bannerDicount: {
    fontSize: 12,
    fontFamily: "medium",
    color: COLORS.white,
    marginBottom: 4
  },
  bannerDiscountName: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.white
  },
  bannerDiscountNum: {
    fontSize: 46,
    fontFamily: "bold",
    color: COLORS.white
  },
  bannerBottomContainer: {
    marginTop: 8
  },
  bannerBottomTitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.white
  },
  bannerBottomSubtitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.white,
    marginTop: 4
  },
  bannerItemContainer: {
    width: "100%",
    paddingBottom: 10,
    backgroundColor: COLORS.primary,
    height: 170,
    borderRadius: 32,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
})

export default Home;
