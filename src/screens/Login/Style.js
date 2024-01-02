import { StyleSheet, StatusBar } from "react-native";

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight - 30,
		paddingBottom: StatusBar.currentHeight,
		backgroundColor: "#20314d",
	},
	scrollView: {
		// marginHorizontal: 20,
	},
	serviceContainer: {
		marginTop: 20,
		marginHorizontal: 20,
	},
});

export default Styles;
