import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    GestureResponderEvent
} from 'react-native';

interface ButtonProps {
    title: string;
    color?: string;
    textColor?: string;
    filled?: boolean;
    isLoading?: boolean;
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = (props) => {
    const filledBgColor = props.color || '#007BFF'; // Default color if COLORS.primary is not defined
    const outlinedBgColor = '#FFFFFF'; // Default color if COLORS.white is not defined
    const bgColor = props.filled ? filledBgColor : outlinedBgColor;
    const textColor = props.filled
        ? props.textColor || '#FFFFFF' // Default color if COLORS.white is not defined
        : props.textColor || '#007BFF'; // Default color if COLORS.primary is not defined
    const isLoading = props.isLoading || false;

    return (
        <TouchableOpacity
            style={[
                styles.btn,
                { backgroundColor: bgColor },
                props.style
            ]}
            onPress={props.onPress}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }]}>
                    {props.title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 16, // Example padding, adjust as needed
        paddingVertical: 12, // Example padding, adjust as needed
        borderColor: '#007BFF', // Default border color, adjust as needed
        borderWidth: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52
    },
    text: {
        fontSize: 18,
        fontWeight: '600', // 'semiBold' is not a default weight, use '600'
    },
});

export default Button;
