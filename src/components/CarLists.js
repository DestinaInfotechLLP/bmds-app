import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CarCard from "./CarCard";
import AppLoader from "./AppLoader";

const CarLists = ({ navigation, myCars, edit }) => {
	if (!myCars.data) {
		return <AppLoader />;
	}
	// console.log(myCars.data);
	return (
		<View>
			<View style={styles.carCard}>
				{myCars.data.map((car, key) => {
					return (
						<View key={key} style={styles.carCard}>
							<CarCard data={car} navigation={navigation} edit={edit} />
						</View>
					);
				})}
			</View>
		</View>
	);
};

export default CarLists;

const styles = StyleSheet.create({
	carCard: {
		marginVertical: 10,
	},
});
