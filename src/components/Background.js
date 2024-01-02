import React from "react";
import {
	ImageBackground,
	StyleSheet,
	KeyboardAvoidingView,
	View,
	ScrollView,
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import { theme } from "../core/theme";

export default function Background({ children }) {
	return (
		<ImageBackground
			source={require("../../assets/background_dot.png")}
			resizeMode="repeat"
			style={styles.background}
		>
			<ScrollView>
				<View style={styles.container} behavior="padding">
					{children}
				</View>
			</ScrollView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		// flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: theme.colors.surface,
	},
	container: {
		flex: 1,
		padding: 20,
		width: "100%",
		maxWidth: 340,
		alignSelf: "center",
		alignItems: "center",
		// justifyContent: "center",
	},
});
