import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Alert,
  Linking,
} from "react-native";
import "expo-dev-client";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/navigation/TabNavigator";
import AuthState from "./src/context/Auth/AuthState";
// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "./src/components/NoInternet";
// import { PermissionsAndroid } from "react-native";
// import * as Location from "expo-location";
// import BackgroundGeolocation from "react-native-background-geolocation";
// import Geolocation from 'react-native-geolocation-service';

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("screen").width;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const App = () => {
  const [connectionType, setConnectionType] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [initialPosition, setInitialPosition] = useState("unknown");
  NetInfo.fetch().then((state) => {
    setConnectionType(state.type);
    setIsConnected(state.isConnected);
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [loaded] = useFonts({
    Salsa: require("./assets/fonts/salsa-regular.ttf"),
  });
  //   const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  // 	const getLocation = async () => {
  // 		let foregroundStatus = await Location.requestForegroundPermissionsAsync();
  // 		if (foregroundStatus.status !== 'granted') {
  // 			// Handle foreground permission not granted
  // 			return;
  // 		}

  // 		let backgroundStatus = await Location.requestBackgroundPermissionsAsync();
  // 		if (backgroundStatus.status !== 'granted') {
  // 			showLocationPermissionPrompt()
  // 			return;
  // 		}

  // 		try {
  // 			let location = await Location.getCurrentPositionAsync({});
  // 			const { latitude, longitude } = location.coords;
  // 			// Do something with latitude and longitude
  // 		} catch (error) {
  // 			// Handle location fetching error
  // 		}
  // 	}
  // 	getLocation();
  // })

  // const requestLocationPermission = () => {
  // 	Geolocation.requestAuthorization('always')
  // 		.then((result) => {
  // 			if (result === 'granted') {
  // 				console.log('Location permission granted');
  // 			} else {
  // 				showLocationPermissionPrompt();
  // 			}
  // 		})
  // 		.catch((error) => console.log('Location permission error: ', error));
  // };

  // const showLocationPermissionPrompt = () => {
  // 	Alert.alert(
  // 		'Location Permission',
  // 		'This app needs to access your location to provide the best Driving experience for you. Please select an option:',
  // 		[
  // 			{
  // 				text: 'Allow',
  // 				onPress: () => {
  // 					Geolocation.requestAuthorization('always');
  // 				},
  // 			},
  // 			{
  // 				text: 'Allow While Using App',
  // 				onPress: () => {
  // 					Geolocation.requestAuthorization('whenInUse');
  // 				},
  // 			},
  // 			{
  // 				text: 'Deny',
  // 				style: 'cancel',
  // 			},
  // 		],
  // 		{ cancelable: false },
  // 	);
  // };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const backgroundgranted = PermissionsAndroid.request(
  // 	PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  // 	{
  // 		title: "Background Location Permission",
  // 		message:
  // 			"We need access to your location " +
  // 			"so you can get live quality updates.",
  // 		buttonNeutral: "Ask Me Later",
  // 		buttonNegative: "Cancel",
  // 		buttonPositive: "OK",
  // 	}
  // );

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        edges={["top", "left", "right"]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
  // }
  if (isConnected) {
    return (
      <SafeAreaView style={styles.screen}>
        <AuthState>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#20314d"
            translucent={true}
          />
          <View
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <NavigationContainer>
              <BottomTabNavigator />
            </NavigationContainer>
          </View>
        </AuthState>
      </SafeAreaView>
    );
  }
  // }
  return (
    <View>
      <NoInternet />
    </View>
  );
};
export default App;
// registerRootComponent(App);
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // height: ScreenHeight,
    // width: ScreenWidth,
    // backgroundColor: "#20314d",
    // paddingTop: 10,
    // marginBottom: -10,
    // flexDirection: "row",
    // justifyContent: "center",
  },
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // fontFamily: "salsa",
  },
});
