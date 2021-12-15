import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const CategoryGridTile = props => {
	return (
		<TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
			<View
				style={{ ...styles.container, ...{ backgroundColor: props.color } }}
			>
				<Text style={styles.title} numberOfLines={2}>
					{props.title}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	gridItem: {
		flex: 1,
		margin: 25,
		height: 150,
		borderRadius: 10,
		elevation: 5,
	},
	container: {
		flex: 1,
		borderRadius: 10,
		padding: 15,
		elevation: 3,
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		textAlign: "right",
	},
})

export default CategoryGridTile
