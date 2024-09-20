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
    const filledBgColor = props.color || '#8DBFE2';
    const outlinedBgColor = '#FFFFFF'; 
    const bgColor = props.filled ? filledBgColor : outlinedBgColor;
    const textColor = props.filled
        ? props.textColor || '#FFFFFF'
        : props.textColor || '#007BFF'; 
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
        paddingHorizontal: 16, 
        paddingVertical: 12, 
        borderColor: '#FFFFFF', 
        borderWidth: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft:4
    },
});

export default Button;
