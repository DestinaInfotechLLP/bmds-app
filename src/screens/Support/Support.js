import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	StatusBar,
} from "react-native";
import React from "react";
import { Caption, Colors, Headline, List } from "react-native-paper";

const Support = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.boxContainer}>
					<Headline style={styles.header}>BHARAT MOTOR DRIVING SCHOOL</Headline>
					<View style={styles.addressContainer}>
						{/* <Headline style={styles.addressHeader}>Nehru Nagar</Headline> */}
						<List.Item
							title="Hindalga, Road, behind Vijay nagar, Bustop, Belagavi, Karnataka
							591108"
							left={() => <List.Icon icon="map" size={20} color="white" />}
							titleStyle={styles.addressCaption}
							titleNumberOfLines={2}
						/>
						<List.Item
							title="+91 8197750903"
							left={() => <List.Icon icon="phone" size={20} color="white" />}
							titleStyle={styles.addressCaption}
							titleNumberOfLines={2}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Support;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight - 30,
		paddingBottom: StatusBar.currentHeight,
		backgroundColor: "#20314d",
	},
	scrollView: {
		paddingHorizontal: 20,
	},
	boxContainer: {
		paddingTop: 20,
	},
	header: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 24,
		color: Colors.white,
	},
	addressContainer: {
		paddingHorizontal: 40,
		paddingVertical: 30,
	},
	addressHeader: {
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
	},
	addressCaption: {
		color: "white",
		fontSize: 12,
	},
});
