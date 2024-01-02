import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import axios from "axios";
import Loading from "../components/Loading";
import { APP_URL } from "@env";
import _ from "lodash";

const CarListing = ({ navigation }) => {
	const [loading, setLoading] = useState(true);
	const [cars, setCars] = useState({});

	useEffect(() => {
		axios.defaults.baseURL = APP_URL;

		axios
			.get(
				"/guest/sell/random",
				{ headers: { Accept: "Application/json" } },
				{ maxContentLength: 4, maxBodyLength: 3 }
			)
			.then((response) => {
				setCars(response.data);
				setLoading(false);
			})
			.catch((error) => console.error(error.response));
	}, []);
	if (loading) {
		return <Loading />;
	}
	if (cars.success) {
		return (
			<View>
				<View style={styles.carCard}>
					{cars.data.map((car) => {
						return (
							<View key={car.id} style={styles.carCard}>
								<CarCard data={car} navigation={navigation} />
							</View>
						);
					})}
				</View>
			</View>
		);
	}
};

export default CarListing;

const styles = StyleSheet.create({
	carCard: {
		marginVertical: 10,
	},
});
