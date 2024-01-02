import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Tc = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<Text>Terms And Conditions</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Tc;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#20314d",
	},
	scrollView: {
		paddingHorizontal: 20,
	},
});
