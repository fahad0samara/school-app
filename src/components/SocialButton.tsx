import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useDarkMode } from '../Hooks/darkmode/useDarkMode';
import { COLORS } from '../constants/theme';


const SocialButton = ({ icon, onPress, tintColor = null }) => {
const dark = useDarkMode()
  
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={[styles.container, { 
          backgroundColor: dark ? COLORS.grayscale100 : COLORS.black,
          borderColor: dark ? COLORS.dark2 : COLORS.grayscale200
        }]}>
        <Image
          source={icon}
          resizeMode='contain'
          style={[styles.icon, {
            tintColor: tintColor
          }]}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        borderWidth: 1,
        marginHorizontal: 8
    },
    icon: {
        height: 30,
        width: 30,
    }
})

export default SocialButton