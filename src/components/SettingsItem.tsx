import React from 'react';
import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import useLanguage from '../Hooks/language/useLanguage';

interface SettingsItemProps {
    icon: string; // Changed from any to string
    name: string;
    onPress: (event: GestureResponderEvent) => void;
    hasArrowRight?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, name, onPress, hasArrowRight = true }) => {
    const dark = useSelector((state: RootState) => state.darkmode.darkmode);
  const language = useLanguage();
    return (
        <TouchableOpacity onPress={onPress} style={{ width: '100%', flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name={icon} size={24} color={dark ? '#fff' : '#1F1F1F'} />
                <Text style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: dark ? '#fff' : '#000',
                    marginLeft: 12
                }}>
                    {name}
                </Text>
            </View>
            {
                hasArrowRight && (
                    <FontAwesome
                          name={
                            language === 'ar' ? "chevron-left" :   
                            "chevron-right"
                        }
                        size={24}
                        color={dark ? '#fff' : '#1F1F1F'}
                    />
                )
            }
        </TouchableOpacity>
    );
};

export default SettingsItem;
