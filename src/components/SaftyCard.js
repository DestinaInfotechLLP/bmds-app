import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { APP_URL, IMG_URL } from "@env";

const SafetyCard = ({ navigation }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [safetyInfo, setSafetyInfo] = React.useState();

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

	return (
		<View style={styles.container}>
			<Text style={styles.categoryTitle}>
				Road Safety & Vehicle Maintenance
			</Text>
			<View style={styles.serviceContainer}>
				<ScrollView
					horizontal={true}
					contentContainerStyle={styles.scrollView}
					showsHorizontalScrollIndicator={false}
				>
					<FetchData safetyInfo={safetyInfo} navigation={navigation} />
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		width: "100%",
	},
	categoryTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#fff",
	},
	serviceContainer: {
		flexDirection: "row",
	},
	serveiceCard: {
		width: 200,
		height: 100,
		marginRight: 10,
		// flex: 1,
		borderRadius: 10,
	},
	serviceImg: {
		borderRadius: 10,
	},
	scrollView: {
		marginVertical: 20,
	},
	serviceText: {
		flexDirection: "row",
		justifyContent: "center",
		alignSelf: "center",
		fontWeight: "600",
		color: "#ffffff",
		padding: 5,
	},
	backgroundImg: {
		height: "100%",
		justifyContent: "flex-end",
		borderRadius: 10,
	},
});

export default SafetyCard;

const FetchData = ({ safetyInfo, navigation }) => {
	if (safetyInfo) {
		return safetyInfo.map((safety) => {
			return (
				<View key={safety.id}>
					<View style={styles.serveiceCard}>
						<View style={styles.serviceImg}>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("SafetyInfo", { id: safety.id })
								}
							>
								<Image
									source={{
										uri:
											safety.image == null
												? "https://us.123rf.com/450wm/artinspiring/artinspiring1710/artinspiring171000917/88752959-woman-s-driver-license-id-card-and-automobile-.jpg"
												: `${IMG_URL}/safety/${safety.image}`,
									}}
									resizeMode="contain"
									style={styles.backgroundImg}
								></Image>
							</TouchableOpacity>
						</View>
					</View>
					<Text style={styles.serviceText}>{safety.title}</Text>
				</View>
			);
		});
	}
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				flexDirection: "row",
				justifyContent: "space-around",
				padding: 10,
			}}
		>
			<ActivityIndicator size="large" color="#00ff00" />
		</View>
	);
};
