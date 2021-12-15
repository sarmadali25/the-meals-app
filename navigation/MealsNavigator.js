import React from "react"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import { createDrawerNavigator } from "react-navigation-drawer"
import { createAppContainer } from "react-navigation"
import CategoriesScreen from "../screens/CategoriesScreen"
import CategoryMealsScreen from "../screens/CategoryMealsScreen"
import MealDetailScreen from "../screens/MealDetailScreen"
import { Platform, Text } from "react-native"
import FavoritesScreen from "../screens/FavoritesScreen"
import Colors from "../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import FiltersScreen from "../screens/FiltersScreen"

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS == "android" ? Colors.primaryColor : "",
	},
	headerTitleStyle: { fontFamily: "open-sans" },
	headerBackTitleStyle: {
		fontFamily: "open-sans",
	},
	headerTintColor: Platform.OS == "android" ? "white" : Colors.primaryColor,
}

const MealsNavigator = createStackNavigator(
	{
		Categories: CategoriesScreen,
		CategoryMeals: {
			screen: CategoryMealsScreen,
			/**we can also set default navigation options here **/
		},
		MealDetail: MealDetailScreen,
		/**we can also set default navigation options here **/
	},
	{
		// mode: "modal",
		// initialRouteName: "MealDetailScreen",
		// defaultNavigationOptions: {
		// 	headerStyle: {
		// 		backgroundColor: Platform.OS == "android" ? Colors.primaryColor : "",
		// 	},
		// 	headerTintColor: Platform.OS == "android" ? "white" : Colors.primaryColor,
		// },

		defaultNavigationOptions: defaultStackNavOptions,
	}
)
const FavNavigator = createStackNavigator(
	{
		Favorites: FavoritesScreen,
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
)
const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
				)
			},
			tabBarColor: Colors.primaryColor,
			tabBarLabel:
				Platform.OS === "android" ? (
					<Text style={{ fontFamily: "open-sans" }}>Meals</Text>
				) : (
					"Meals "
				),
		},
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarLabel: "Favorites!",
			tabBarIcon: tabInfo => {
				return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel:
				Platform.OS === "android" ? (
					<Text style={{ fontFamily: "open-sans" }}>Favorites</Text>
				) : (
					"Favorites"
				),
		},
	},
}

const MealsFavTabNavigator =
	Platform.OS == "android"
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: "white",
				shifting: true,
				// barStyle: {
				// 	backgroundColor: Colors.primaryColor,
				// },
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					activeTintColor: Colors.accentColor,
				},
				labelStyle: {
					fontFamily: "open-sans",
				},
		  })

const FiltersNavigator = createStackNavigator(
	{
		Filters: FiltersScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
)

const MainNavigator = createDrawerNavigator(
	{
		MealsFav: {
			screen: MealsFavTabNavigator,
			navigationOptions: {
				drawerLabel: "Meals",
			},
		},
		Filters: FiltersNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.accentColor,
			labelStyle: {
				fontFamily: "open-sans-bold",
			},
		},
	}
)

// export default createAppContainer(MealsFavTabNavigator)
export default createAppContainer(MainNavigator)
