import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		paddingTop: 10,
		marginTop: -10,
	},
	authButtonCard: {
		backgroundColor: "#f5f5f5",
		borderRadius: 0,
		paddingVertical: 15,
		paddingHorizontal: 15,
		width: "100%",
		marginHorizontal: 10,
		elevation: 10,
		shadowOffset: "10",
		shadowColor: "#bfbfbf",
		marginBottom: 20,
	},
	authButtonContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 20,
	},
	shadowProp: {
		elevation: 20,
		shadowColor: "#171717",
	},
	offerImage: {
		width: 350,
		height: 200,
	},
	profileBanner: {
		width: "100%",
		height: 200,
		backgroundColor: "#20314d",
		alignItems: "center",
		justifyContent: "center",
		// position: "absolute",
	},
	profileImageContainer: {
		width: 100,
		height: 100,
		backgroundColor: "white",
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		// marginTop: 150,
	},
	profileImage: {
		width: 70,
		height: 70,
		alignItems: "center",
	},
	profileName: {
		paddingTop: 5,
		color: "white",
		fontWeight: "600",
		fontSize: 20,
	},
	accountInfoContainer: {
		marginTop: 20,
		paddingHorizontal: 20,
	},
	accountInfoTitle: {
		fontSize: 20,
		fontWeight: "900",
		letterSpacing: 2,
	},
	authContainerDetail: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		padding: 20,
		elevation: 50,
		zIndex: 100,
	},
	listItems: {
		fontWeight: "bold",
	},
});

export default styles;
