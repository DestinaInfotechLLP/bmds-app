import { TouchableOpacity, ActivityIndicator } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	Home,
	Profile,
	Login,
	Register,
	CarDetails,
	Cars,
	AddCar,
	Requests,
	Services,
	Help,
	Support,
	MyCars,
	EditProfile,
	UpdateCar,
	Tc,
	ForgetPassword,
	SafetyInfo,
} from "../screens";

import { useFonts, Salsa_400Regular } from "@expo-google-fonts/salsa";
import Service from "../screens/Service/Service";
import LogoTitle from "../components/LogoTitle";

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
	headerStyle: {
		backgroundColor: "#20314d",
		color: "#fff",
	},
	headerTitleStyle: {
		color: "#fff",
		alignItems: "center",
	},
	headerTintColor: "#fff",
	headerTitleAlign: "center",
	// headerShown: false,
};

const CarNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="Cars" component={Cars} />
			<Stack.Screen name="CarDetail" component={CarDetails} />
			<Stack.Screen
				name="AddCar"
				component={AddCar}
				options={{
					title: "Add Car",
				}}
			/>
			{/* <Stack.Screen name="Register" component={Register} /> */}
		</Stack.Navigator>
	);
};

const ServiceNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="Services" component={Services} />
			<Stack.Screen name="Service" component={Service} />
		</Stack.Navigator>
	);
};

const HomeNavigator = () => {
	let [fontsLoaded] = useFonts({
		Salsa_400Regular,
	});

	if (!fontsLoaded) {
		return <ActivityIndicator />;
	}
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: "#20314d",
					color: "#fff",
				},
				headerTitleStyle: {
					color: "#fff",
					alignItems: "center",
				},
				headerTintColor: "#fff",
				headerTitleAlign: "center",
			})}
		>
			<Stack.Screen
				name="Home"
				component={Home}
				options={({ navigation }) => ({
					headerTitle: (props) => <LogoTitle {...props} />,
				})}
			/>
			<Stack.Screen name="Service" component={Service} />
			<Stack.Screen name="CarDetail" component={CarDetails} />
			<Stack.Screen name="SafetyInfo" component={SafetyInfo} />
		</Stack.Navigator>
	);
};

const ProfileNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen
				name="Login"
				component={Login}
				// options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Register"
				component={Register}
				// options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ForgetPassword"
				component={ForgetPassword}
				// options={{ headerShown: false }}
			/>
			<Stack.Screen name="Requests" component={Requests} />
			<Stack.Screen name="MyCars" component={MyCars} />
			<Stack.Screen name="UpdateCar" component={UpdateCar} />
			<Stack.Screen name="Help" component={Help} />
			<Stack.Screen name="Support" component={Support} />
			<Stack.Screen name="EditProfile" component={EditProfile} />
			<Stack.Screen name="Tc" component={Tc} />
		</Stack.Navigator>
	);
};

export { HomeNavigator, ProfileNavigator, CarNavigator, ServiceNavigator };
