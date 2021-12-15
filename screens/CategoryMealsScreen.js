import React from "react"
import {
	View,
	Text,
	StyleSheet,
	Button,
	Platform,
	FlatList,
} from "react-native"
import { CATEGORIES } from "../data/dummy-data"
import colors from "../constants/Colors"
import { useSelector } from "react-redux"

import MealList from "../components/MealList"
import DefaultText from "../components/DefaultText"

const CategoryMealsScreen = props => {
	const availableMeals = useSelector(state => state.meals.filteredMeals)
	const catId = props.navigation.getParam("categoryId")

	const selectedCategory = CATEGORIES.find(cat => cat.id === catId)
	const displayedMeals = availableMeals.filter(
		meal => meal.categoryIds.indexOf(catId) >= 0
	)

	if (displayedMeals.length === 0)
		return (
			<View style={styles.content}>
				<DefaultText>No meals found. Check your filters!</DefaultText>
			</View>
		)

	return <MealList listData={displayedMeals} navigation={props.navigation} />
}

CategoryMealsScreen.navigationOptions = navigationData => {
	const catId = navigationData.navigation.getParam("categoryId")
	const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

	return {
		headerTitle: selectedCategory.title,
		/**
		 * ! We can write navigation options here as well as in MealsNAvigator.js
		 **
		 ** headerStyle: {
		 **	backgroundColor: Platform.OS == "android" ? colors.primaryColor : "",
		 **},
		 **headerTintColor: Platform.OS == "android" ? "white" : colors.primaryColor,
		 **
		 **/
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})

export default CategoryMealsScreen
