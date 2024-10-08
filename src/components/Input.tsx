import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { AntDesign  } from '@expo/vector-icons';
import { useDarkMode } from '../Hooks/darkmode/useDarkMode';
import { COLORS, SIZES } from '../constants/theme';
import useLanguage from '../Hooks/language/useLanguage';

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors, isDarkMode } = useDarkMode();
  
  // Use custom hook to get language and RTL direction
  const { isRTL } = useLanguage();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onChangeText = (text) => {
    props.onInputChanged(props.id, text);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFocused ? COLORS.primary : isDarkMode ? COLORS.dark2 : COLORS.greyscale500,
            backgroundColor: isFocused ? COLORS.transparentPrimary : isDarkMode ? COLORS.dark2 : COLORS.greyscale500,
          },
        ]}
      >
        {props.icon && props.iconType === 'image' && (
          <Image
            source={props.icon}
            style={[
              styles.icon,
              {
                tintColor: isFocused ? COLORS.primary : '#BCBCBC',
              },
            ]}
          />
        )}
        {props.icon && props.iconType === 'icon' && (
          <AntDesign 
            name={props.icon}
            size={20}
            color={isFocused ? COLORS.primary : '#BCBCBC'}
            style={styles.icon}
          />
        )}
        <TextInput
          {...props}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            {
              color: isDarkMode ? COLORS.white : COLORS.black,
              textAlign: isRTL ? 'right' : 'left',
              textAlignVertical: 'center',
              writingDirection: isRTL ? 'rtl' : 'ltr',
            },
          ]}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          autoCapitalize="none"
        />
      </View>
      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText[0]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    fontFamily: 'regular',
    fontSize: 14,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default Input;
