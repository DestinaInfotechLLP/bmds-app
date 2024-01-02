import { StyleSheet, StatusBar } from "react-native";
import { Colors } from "react-native-paper";

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
	itemsContainer: {
		marginHorizontal: 20,
	},
	serviceContainer: {
		marginTop: 20,
	},
	cardHeaderTitle: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerText: {
		// flex: 1,
		fontSize: 20,
		fontWeight: "600",
		color: Colors.white,
	},
	headerTextView: {
		flex: 1,
		fontSize: 12,
		fontWeight: "600",
		color: Colors.blue800,
		// textDecorationLine: "underline",
	},
});

export default Styles;
