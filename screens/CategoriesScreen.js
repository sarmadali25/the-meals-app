import React from "react"
import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	Platform,
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import CategoryGridTile from "../components/CategoryGridTile"
import colors from "../constants/Colors"
import { CATEGORIES } from "../data/dummy-data"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../components/HeaderButton"
const CategoriesScreen = props => {
	const renderGridItem = itemData => {
		return (
			<CategoryGridTile
				title={itemData.item.title}
				color={itemData.item.color}
				onSelect={() => {
					props.navigation.navigate("CategoryMeals", {
						categoryId: itemData.item.id,
					})
				}}
			/>
		)
	}

	return (
		<FlatList numColumns={2} data={CATEGORIES} renderItem={renderGridItem} />
		// <View>
		// 	<Text>The Categories Screen!</Text>
		// 	<Button
		// 		title="Go To Category Meals "
		// 		onPress={() => props.navigation.navigate("CategoryMeals")}
		// 	/>
		// </View>
	)
}

CategoriesScreen.navigationOptions = navData => {
	return {
		headerTitle: "Meal Categories",
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer()
					}}
				></Item>
			</HeaderButtons>
		),
	}
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
	},
})

export default CategoriesScreen
