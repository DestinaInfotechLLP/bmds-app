import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
	HomeNavigator,
	ProfileNavigator,
	CarNavigator,
	ServiceNavigator,
} from "./StackNavigator";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import LogoTitle from "../components/LogoTitle";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#e91e63",
				tabBarStyle: {
					backgroundColor: "#20314d",
					// position: "absolute",
					// bottom: 0,
					borderTopColor: "#e1e1e1",
					// elevation: 20,
				},
				tabBarItemStyle: {
					padding: 5,
				},
			}}
			tabBarOptions={{
				activeTintColor: "#e91e63",
				keyboardHidesTabBar: true,
				safeAreaInsets: {
					bottom: 0,
				},
			}}
		>
			<Tab.Screen
				name="HomeTab"
				component={HomeNavigator}
				options={({ navigation }) => ({
					headerTitle: (props) => <LogoTitle {...props} />,
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" color={color} size={size} />
					),
				})}
			/>

			<Tab.Screen
				name="ServicesTab"
				component={ServiceNavigator}
				options={({ navigation }) => ({
					headerTitle: (props) => <LogoTitle {...props} />,
					tabBarLabel: "Services",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="account-wrench"
							color={color}
							size={size}
						/>
					),
				})}
			/>

			<Tab.Screen
				name="CarTab"
				component={CarNavigator}
				options={({ navigation }) => ({
					headerTitle: (props) => <LogoTitle {...props} />,
					tabBarLabel: "Cars",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="car" color={color} size={size} />
					),
				})}
			/>
			<Tab.Screen
				name="ProfileTab"
				component={ProfileNavigator}
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;
