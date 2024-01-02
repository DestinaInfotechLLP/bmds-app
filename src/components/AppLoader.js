import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Colors } from "react-native-paper";

const AppLoader = () => {
	return (
		<View style={[StyleSheet.absoluteFillObject, styles.container]}>
			<LottieView
				source={require("../../assets/dot_loading.json")}
				autoPlay
				loop
			/>
		</View>
	);
};

export default AppLoader;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.6)",
		zIndex: 1,
	},
});
