import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { APP_URL } from "@env";
import AuthContext from "../../context/Auth/AuthContext";
import CarLists from "../../components/CarLists";
import AppLoader from "../../components/AppLoader";

const MyCars = ({ navigation }) => {
	const [myCars, setMyCars] = useState({});
	const auth = useContext(AuthContext);
	const [appLoading, setAppLoading] = useState(false);
	useEffect(() => {
		setAppLoading(true);
		const token = auth.loginState.userToken;
		setTimeout(async () => {
			await axios
				.get(`${APP_URL}/admin/sell/my-cars`, {
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setMyCars(response.data);
				})
				.catch((error) => console.log(error.response.data));
		}, 500);
		setAppLoading(false);
	}, []);
	// console.log(myCars);
	if (appLoading || !myCars.data) {
		return <AppLoader />;
	}
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				{Object.keys(myCars.data).length > 0 ? (
					<CarLists navigation={navigation} myCars={myCars} edit={true} />
				) : (
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
							No Request Found!
						</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyCars;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#20314d",
		justifyContent: "center",
		alignItems: "center",
	},
	scrollContainer: {
		paddingHorizontal: 20,
	},
});
