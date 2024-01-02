import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { APP_URL } from "@env";
import CarImageCarousel from "../../components/CarImageCarousel";
import { Caption, Headline } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import PostByDetail from "../../components/PostByDetail";

const CarDetails = ({ navigation, route }) => {
	const { id } = route.params;
	const [loading, setLoading] = useState(true);
	const [cars, setCars] = useState({});
	useEffect(() => {
		axios
			.get(`${APP_URL}/guest/sell/show/${id}`, {
				headers: { Accept: "application/json" },
			})
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
			<SafeAreaView style={styles.container}>
				<ScrollView
					stickyHeaderIndices={[0]}
					showsVerticalScrollIndicator={false}
				>
					<View>
						<CarImageCarousel
							navigation={navigation}
							imgUrls={JSON.parse(cars.data.photos)}
						/>
					</View>
					<View style={styles.containerDetail}>
						<View>
							<Text style={styles.carName}>
								{cars.data.car_brand.name.toUpperCase()}{" "}
								{cars.data.car_model.name.toUpperCase()}
							</Text>
							<Caption>
								{cars.data.year.toUpperCase()} -
								{cars.data.cars.name.toUpperCase()}
							</Caption>
							<Headline>₹ {cars.data.price}</Headline>
						</View>
						<View style={styles.featureContainer}>
							<View style={styles.features}>
								<View style={styles.featureItem}>
									<MaterialCommunityIcons
										name="gas-station"
										style={styles.featureItemIcon}
										size={20}
									/>
									<Text style={styles.featureItemText}>
										{cars.data.fuel_type}
									</Text>
								</View>
								<View style={styles.featureItem}>
									<MaterialCommunityIcons
										name="gauge"
										style={styles.featureItemIcon}
										size={20}
									/>
									<Text style={styles.featureItemText}>
										{cars.data.km_driven} KM
									</Text>
								</View>
								<View style={styles.featureItem}>
									<MaterialCommunityIcons
										name="car-shift-pattern"
										style={styles.featureItemIcon}
										size={20}
									/>
									<Text style={styles.featureItemText}>
										{cars.data.transmission}
									</Text>
								</View>
							</View>
							<View style={styles.features}>
								<View style={styles.featureItem}>
									<MaterialCommunityIcons
										name="account-multiple-plus-outline"
										style={styles.featureItemIcon}
										size={20}
									/>
									<Text style={styles.featureItemText}>
										{cars.data.number_of_owners} Users
									</Text>
								</View>
								<View style={styles.featureItem}>
									<MaterialCommunityIcons
										name="map-marker"
										style={styles.featureItemIcon}
										size={20}
									/>
									<Text style={styles.featureItemText}>{cars.data.city}</Text>
								</View>
								<View style={styles.featureItem}>
									<MaterialCommunityIcons
										name="calendar"
										style={styles.featureItemIcon}
										size={20}
									/>
									<Text style={styles.featureItemText}>
										{moment(cars.data.created_at).fromNow()}
									</Text>
								</View>
							</View>
						</View>
						<View>
							<Text>Description</Text>
							<View style={styles.descriptionTextBox}>
								<Text style={styles.descriptionTextBoxTitle}>
									{cars.data.title}
								</Text>
								<Text style={styles.descriptionTextBoxDesc}>
									{cars.data.description}
								</Text>
							</View>
						</View>
						<View>
							<Text>Posted By</Text>
							<View style={styles.descriptionTextBox}>
								<PostByDetail navigation={navigation} id={cars.data.user_id} />
							</View>
						</View>
						<View>
							<Text>Location</Text>
							<View style={styles.descriptionTextBox}>
								<Text>
									{cars.data.address}, {cars.data.city}, {cars.data.state}
								</Text>
							</View>
						</View>
						<View></View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
};

export default CarDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#20314d",
	},
	containerDetail: {
		backgroundColor: "#f7f7f7",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		padding: 20,
		elevation: 50,
		zIndex: 100,
		marginTop: -20,
	},
	carName: {
		fontSize: 18,
		fontWeight: "bold",
	},
	featureContainer: {
		backgroundColor: "#fff",
		paddingHorizontal: 10,
		marginVertical: 20,
	},
	features: {
		paddingVertical: 20,
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: "#e7e7e7",
	},
	featureItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	featureItemIcon: {
		paddingRight: 5,
	},
	featureItemText: {
		fontSize: 14,
		textTransform: "capitalize",
	},
	descriptionTextBox: {
		marginVertical: 10,
		padding: 20,
		backgroundColor: "#fff",
		elevation: 5,
		shadowColor: "#20314d",
	},
	descriptionTextBoxTitle: {
		fontSize: 16,
		fontWeight: "bold",
		paddingBottom: 8,
	},
	descriptionTextBoxDesc: {
		lineHeight: 18,
		textAlign: "justify",
		letterSpacing: 1.1,
	},
});
