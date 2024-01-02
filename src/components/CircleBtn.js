import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CircleBtn = ({ icon, color, title, onPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.circleIcon}>
				<MaterialCommunityIcons name={icon} size={24} color={color} />
			</View>
			<View style={styles.label}>
				<Text style={styles.labelItem}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CircleBtn;

const styles = StyleSheet.create({
	container: {
		alignContent: "center",
	},
	label: {
		alignItems: "center",
		paddingTop: 5,
	},
	labelItem: {
		fontSize: 16,
		fontWeight: "600",
	},
	circleIcon: {
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		width: 70,
		height: 70,
		borderRadius: 35,
		elevation: 20,
		shadowColor: "#171717",
	},
});
