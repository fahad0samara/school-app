// AppIcon.js
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons"; // Import both icon sets

const AppIcon = ({ name, size, color, style=null, iconSet = "Ionicons" }) => {
  const IconComponent = iconSet === "Ionicons" ? Ionicons : FontAwesome; // Determine which icon set to use

  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default AppIcon;
