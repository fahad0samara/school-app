import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import IconI from 'react-native-vector-icons/Ionicons';
import styles from './styles'; // Import your styles here
import { images } from '../../constants'; // Ensure images are correctly imported
import { useDarkMode } from '../../Hooks/darkmode/useDarkMode';

const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 };

const MyCourse: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.user);
  const [showAnimatedSearch, setShowAnimatedSearch] = useState(false);
  const [keySearch, setKeySearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const inputSearch = useRef<TextInput>(null);
  const { colors, isDarkMode } = useDarkModxse();
  const onAnimatedSearch = () => {
    setShowAnimatedSearch(true);
    setTimeout(() => {
      inputSearch.current?.focus();
    }, 200);
  };

  const onSearch = () => {
    if (loading || refreshing) return;

    // Perform search action here
    console.log('Searching for:', keySearch);
  };

  const onCloseSearch = () => {
    setShowAnimatedSearch(false);
    setKeySearch('');
  };

  return (
    <View style={styles.container}>
      <Image source={images.banner} style={styles.imgBanner} />
      <View style={styles.header}>
        {showAnimatedSearch ? (
          <View style={styles.viewInput}>
            <TouchableOpacity
              hitSlop={hitSlop}
              style={{ marginRight: 16 }}
              onPress={onCloseSearch}
            >
              <Image source={images.iconBack} style={styles.iconBack} />
            </TouchableOpacity>
            <TextInput
              style={styles.inputSearch}
              ref={inputSearch}
              value={keySearch}
              onChangeText={setKeySearch}
              onSubmitEditing={onSearch}
              returnKeyType="search"
            />
            <TouchableOpacity
              hitSlop={hitSlop}
              onPress={onSearch}
              disabled={loading || refreshing}
            >
              <Image source={images.iconSearch} style={styles.iconSearch} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.header1}>
            <Text style={styles.title}>{t('myCourse.title')}</Text>
            {user?.token && (
              <TouchableOpacity
                style={styles.viewSearch}
                onPress={onAnimatedSearch}
              >
                <Image source={images.iconSearch} style={styles.iconSearch} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* The rest of your component code */}
    </View>
  );
};

export default MyCourse;
