import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import useLanguage from '../Hooks/language/useLanguage';
import { useDarkMode } from '../Hooks/darkmode/useDarkMode';
import { COLORS, SIZES } from '../constants/theme';

interface SettingsItemProps {
    icon: keyof typeof MaterialIcons.glyphMap; 
    name: string;
    onPress: (event: GestureResponderEvent) => void;
    hasArrowRight?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, name, onPress, hasArrowRight = true }) => {
    const { colors,  isDarkMode } = useDarkMode(); // Combine color scheme and dark mode state
    const language = useLanguage();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, { backgroundColor: colors.background1 }]}>
            <View style={styles.leftContainer}>
                <MaterialIcons
                    name={icon} 
                    size={25}
                    color={isDarkMode ? COLORS.white : COLORS.greyscale900} 
                />
                <Text style={[styles.name, { color: isDarkMode ? COLORS.white : COLORS.greyscale900 }]}>
                    {name}
                </Text>
            </View>
            {hasArrowRight && (
                <FontAwesome
                    name={language === 'ar' ? "chevron-left" : "chevron-right"}
                    size={24}
                    color={isDarkMode ? COLORS.white : COLORS.greyscale900} 
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SIZES.width - 32,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 7,
        padding: 8,
        borderRadius: 8, 
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontSize: 18,
        fontFamily: "semiBold", 
        marginLeft: 12,
    },
});

export default SettingsItem;
