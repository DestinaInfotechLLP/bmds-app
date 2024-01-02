import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import React, { useContext } from "react";
import { Headline, Caption, Paragraph, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { APP_URL, IMG_URL } from "@env";
import moment from "moment";
import AppLoader from "./AppLoader";
import AuthContext from "../context/Auth/AuthContext";
import axios from "axios";

const CarCard = ({ data, navigation, edit }) => {
	const auth = useContext(AuthContext);

	const updateCarSold = async (id, selled) => {
		const token = auth.loginState.userToken;
		await axios
			.post(
				`${APP_URL}/admin/sell/verify-sell/${id}`,
				{
					selled: selled,
				},
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => navigation.push("MyCars"))
			.catch((error) => console.log(error.response));
	};

	const soldCar = (id, selled) => {
		const title =
			selled == "yes" ? "Is Your Car Sold?" : "Is Your Car not Sold yet?";
		Alert.alert("Confirmation", title, [
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{ text: "YES", onPress: () => updateCarSold(id, selled) },
		]);
	};

	if (!data) {
		return <AppLoader />;
	}
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("CarDetail", { id: data.id })}
		>
			<View style={styles.carCard}>
				<Image
					source={{
						uri: `${IMG_URL}/car_sells/cars/${JSON.parse(data.photos)[0]}`,
					}}
					style={styles.carImage}
				/>
				<View style={styles.cardContent}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Headline style={styles.cardHeader}>
							<Text>₹ </Text> {data.price}
						</Headline>
						{edit ? (
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<IconButton
									icon="pencil"
									color="black"
									size={10}
									onPress={() =>
										navigation.navigate("UpdateCar", { id: data.id })
									}
								/>
								{data.selled == "yes" ? (
									<IconButton
										icon="car"
										color="green"
										size={10}
										onPress={() => soldCar(data.id, "no")}
									/>
								) : (
									<IconButton
										icon="car-off"
										color="red"
										size={10}
										onPress={() => soldCar(data.id, "yes")}
									/>
								)}
								<IconButton
									icon={data.status == "approved" ? "thumb-up" : "thumb-down"}
									color={data.status == "approved" ? "green" : "red"}
									size={10}
									accessibilityLabel={
										data.status == "approved"
											? "You Ad Approved"
											: "Your Ad is in Pending"
									}
									onPress={() => {}}
								/>
							</View>
						) : (
							<></>
						)}
					</View>
					<Caption>
						{data.car_brand.name}, {data.car_model.name}, {data.cars.name}
					</Caption>
					<Paragraph>
						{data.year} - {data.km_driven} KM
					</Paragraph>
					<View style={[styles.cardBottom]}>
						<View style={[styles.location]}>
							<Icon name="location" size={15} color="#555" />
							<Text style={styles.locationText}>
								{data.address}, {data.city}
							</Text>
						</View>
						<View>
							<Text style={[styles.postDate]}>
								{moment(data.created_at).fromNow()}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default CarCard;

const styles = StyleSheet.create({
	carCard: {
		flexDirection: "row",
		backgroundColor: "white",
		borderRadius: 5,
		elevation: 5,
		shadowColor: "#919191",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		// height: 100,
	},
	carImage: {
		width: "35%",
		height: 100,
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5,
	},
	cardContent: {
		// padding: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
		width: "65%",
	},
	cardHeader: {
		fontSize: 18,
		fontWeight: "900",
		paddingBottom: 0,
	},
	cardBottom: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
		alignContent: "flex-end",
	},
	location: {
		flexDirection: "row",
		alignItems: "center",
	},
	locationText: {
		paddingLeft: 5,
	},
});
