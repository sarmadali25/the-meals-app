import React, { useCallback, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Image } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { useDispatch, useSelector } from "react-redux"
import DefaultText from "../components/DefaultText"
import HeaderButton from "../components/HeaderButton"
import { MEALS } from "../data/dummy-data"
import { toggleFavorite } from "../store/actions/meals"

const ListItem = props => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	)
}

const MealDetailScreen = props => {
	const mealId = props.navigation.getParam("mealId")
	const currentMealIsFav = useSelector(state =>
		state.meals.favoriteMeals.some(meal => meal.id === mealId)
	)
	const availableMeals = useSelector(state => state.meals.meals)
	const selectedMeal = availableMeals.find(meal => meal.id === mealId)

	const dispatch = useDispatch()

	const toggleFavoriteHandler = useCallback(() => {
		dispatch(toggleFavorite(mealId))
	}, [dispatch, mealId])

	useEffect(() => {
		// props.navigation.setParams(
		// 	{
		// 		mealTitle: selectedMeal.title,
		// 	},
		// )
		props.navigation.setParams({
			toggleFav: toggleFavoriteHandler,
		})
	}, [toggleFavoriteHandler])

	useEffect(() => {
		props.navigation.setParams({
			isFav: currentMealIsFav,
		})
	}, [currentMealIsFav])
	return (
		<ScrollView>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={styles.details}>
				<DefaultText>{selectedMeal.duration}min</DefaultText>
				<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{selectedMeal.ingredients.map(ingredient => (
				<ListItem key={ingredient}>{ingredient}</ListItem>
			))}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal.steps.map(step => (
				<ListItem key={step}>{step}</ListItem>
			))}
		</ScrollView>
	)
}

MealDetailScreen.navigationOptions = navigationData => {
	const mealTitle = navigationData.navigation.getParam("mealTitle")
	const toggleFavorite = navigationData.navigation.getParam("toggleFav")
	const isFavorite = navigationData.navigation.getParam("isFav")

	return {
		headerTitle: mealTitle,
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="favorite"
					iconName={isFavorite ? "ios-star" : "ios-star-outline"}
					onPress={toggleFavorite}
				></Item>
			</HeaderButtons>
		),
	}
}
const styles = StyleSheet.create({
	details: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 15,
	},
	image: {
		width: "100%",
		height: 200,
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 10,
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		textAlign: "center",
	},
})

export default MealDetailScreen
