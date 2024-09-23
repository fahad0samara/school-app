import React from 'react';
import {
  View, TextInput, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { illustrations } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';

const SearchScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useDarkMode();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color={colors.text} />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Ionicons name="search-outline" size={24} color="#FFA500" style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t('search')}
          placeholderTextColor={colors.text}
        />
      </View>

      {/* Filter & Sort Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
          <Ionicons name="filter-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>{t('filter')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
          <Ionicons name="funnel-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>{t('sort')}</Text>
        </TouchableOpacity>
      </View>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={illustrations.Search}
          style={styles.illustration}
        />
        <Text style={[styles.illustrationText, { color: colors.text }]}>{t('searchAnything')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
   
  },
  backButton: {
    marginVertical:10,
  
    paddingHorizontal: 10,
    alignItems: 'flex-start',
       marginTop: Platform.OS === 'android' ? 50 : 10, // Adjust marginTop for Android
  },
  searchContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  illustration: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  illustrationText: {
    marginTop: 20,
  },
});
