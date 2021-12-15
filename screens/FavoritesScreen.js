import React from "react"
import { View, Text, StyleSheet } from "react-native"
import MealList from "../components/MealList"
import { MEALS } from "../data/dummy-data"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../components/HeaderButton"
import { useSelector } from "react-redux"
import DefaultText from "../components/DefaultText"
const FavoritesScreen = props => {
	const favMeals = useSelector(state => state.meals.favoriteMeals)

	if (favMeals.length === 0 || !favMeals) {
		return (
			<View style={styles.content}>
				<DefaultText>No favorite meals found. Start adding some!</DefaultText>
			</View>
		)
	}
	return <MealList listData={favMeals} navigation={props.navigation} />
}

FavoritesScreen.navigationOptions = navData => {
	return {
		headerTitle: "Your Favorities!",
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
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})

export default FavoritesScreen
