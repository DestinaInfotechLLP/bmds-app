import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AccountDetailItem = ({ icon, label, value }) => {
	return (
		<View style={styles.accountDetail}>
			<MaterialCommunityIcons name={icon} size={50} color="#20314d" />
			<View style={styles.accountDetailGroup}>
				<Text style={styles.accountDetailLabel}>{label}</Text>
				<Text style={styles.accountDetailValue}>{value ? value : "nil"}</Text>
			</View>
		</View>
	);
};

export default AccountDetailItem;

const styles = StyleSheet.create({
	accountDetail: {
		paddingTop: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	accountDetailGroup: {
		paddingLeft: 20,
	},
	accountDetailLabel: {
		fontWeight: "600",
		fontSize: 18,
		letterSpacing: 1.4,
	},
	accountDetailValue: {
		fontWeight: "100",
		fontSize: 14,
	},
});
