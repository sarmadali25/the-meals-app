import React from "react"
import { View, Text } from "react-native"
import { HeaderButton } from "react-navigation-header-buttons"
import { Ionicons } from "@expo/vector-icons"
import { color } from "react-native-reanimated"
import Colors from "../constants/Colors"

const CustomHeaderButton = props => {
	return (
		<HeaderButton
			{...props}
			IconComponent={Ionicons}
			iconSize={23}
			color="white"
		/>
	)
}

export default CustomHeaderButton
