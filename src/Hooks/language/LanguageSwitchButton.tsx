import React from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../../redux/Language/languageSlice';

const LanguageSwitchButton = ({ language, newLanguage }) => {
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setLanguage(newLanguage));
  };

  return (
    <Button title={`Switch to ${newLanguage === 'en' ? 'Arabic' : 'English'}`} onPress={handlePress} />
  );
};

export default LanguageSwitchButton;
