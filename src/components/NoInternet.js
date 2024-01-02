import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	NativeModules,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import Button from "./Button";

const NoInternet = () => {
	return (
		<View style={[styles.container]}>
			<LottieView
				source={require("../../assets/no_internet.json")}
				autoPlay
				loop
				style={StyleSheet.absoluteFillObject}
			/>
			<Button
				mode="text"
				icon="reload"
				color="white"
				onPress={() => NativeModules.DevSettings.reload()}
			>
				Try Again
			</Button>
		</View>
	);
};

export default NoInternet;

const styles = StyleSheet.create({
	container: {
		// width: "100%",
		height: "100%",
		// flex: 1,
		paddingHorizontal: 40,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-end",
		paddingBottom: 50,
		// backgroundColor: "rgba(0,0,0,0.4)",
		backgroundColor: "#20314d",
		zIndex: 1,
	},
});
