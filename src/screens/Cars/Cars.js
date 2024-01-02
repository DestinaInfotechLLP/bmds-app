import {
	View,
	RefreshControl,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import CarSellMain from "../../components/CarSellMain";
import { Avatar } from "react-native-paper";
import AuthContext from "../../context/Auth/AuthContext";

const Cars = ({ navigation }) => {
	const auth = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.screenContainer}>
				<View>
					<CarSellMain navigation={navigation} />
				</View>
			</ScrollView>
			<View style={styles.addBtn}>
				<TouchableOpacity onPress={() => navigation.navigate("AddCar")}>
					<Avatar.Icon size={40} icon="plus" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Cars;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#20314d",

		justifyContent: "center",
		alignItems: "center",
	},
	addBtn: {
		position: "absolute",
		bottom: 20,
		right: 20,
	},
	screenContainer: {
		paddingHorizontal: 20,
	},
});
