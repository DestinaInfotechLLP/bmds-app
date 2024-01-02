import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { APP_URL, IMG_URL } from "@env";
import AppLoader from "./AppLoader";
import axios from "axios";

const SafetyInfoListing = ({ navigation }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [safetyInfo, setSafetyInfo] = React.useState();
	const { width } = useWindowDimensions();
	useEffect(() => {
		getSafetyInfo();
	}, []);
	const getSafetyInfo = async () => {
		try {
			const res = await axios.get(`${APP_URL}/guest/safety-info`, {
				headers: {
					Accept: "application/json",
				},
			});
			console.log(res.data);
			if (res.status == 202) {
				setSafetyInfo(res.data.data);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error.response);
			setIsLoading(false);
		}
	};

	// 	const html = `
	//   <h1>This HTML snippet is now rendered with native components !</h1>
	//   <h2>Enjoy a webview-free and blazing fast application</h2>
	//   <em style="textAlign: center;">Look at how happy this native cat is</em>
	// `;
	if (isLoading) {
		return <AppLoader />;
	}

	return (
		<View>
			<View style={styles.carCard}>
				{safetyInfo &&
					safetyInfo.map((item) => {
						return (
							<View key={item.id}>
								<View style={styles.serveiceCard}>
									<View style={styles.itemImg}>
										<TouchableOpacity
											onPress={() =>
												navigation.navigate("SafetyInfo", { id: item.id })
											}
										>
											<Image
												source={{
													uri:
														item.image == null
															? "https://us.123rf.com/450wm/artinspiring/artinspiring1710/artinspiring171000917/88752959-woman-s-driver-license-id-card-and-automobile-.jpg"
															: `${IMG_URL}/safety/${item.image}`,
												}}
												resizeMode="contain"
												style={styles.backgroundImg}
											></Image>
										</TouchableOpacity>
									</View>
								</View>
								<Text style={styles.itemText}>{item.title}</Text>
							</View>
						);
					})}
			</View>
		</View>
	);
};

export default SafetyInfoListing;

const styles = StyleSheet.create({
	carCard: {
		marginVertical: 10,
	},
});
