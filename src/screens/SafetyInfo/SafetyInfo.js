import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	SafeAreaView,
	ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { APP_URL, IMG_URL } from "@env";
import { Colors } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import AppLoader from "../../components/AppLoader";

const SafetyInfo = ({ navigation, route }) => {
	const { id } = route.params;
	const [safetyInfo, setSafetyInfo] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getSafetyInfo(id);
	}, []);

	const getSafetyInfo = async (id) => {
		try {
			const res = await axios.get(`${APP_URL}/guest/safety-info/show/${id}`, {
				headers: {
					Accept: "application/json",
				},
			});
			if (res.status == 202) {
				setSafetyInfo(res.data.data);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error.response);
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <AppLoader />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.itemsContainer}>
					<View style={styles.cardHeaderTitle}>
						<Text style={styles.headerText}>{safetyInfo.title}</Text>
					</View>
					<View style={styles.cardHeaderDescription}>
						<RenderHTML
							source={{ html: safetyInfo.description }}
							tagsStyles={{
								body: { color: Colors.white },
							}}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SafetyInfo;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight - 30,
		paddingBottom: StatusBar.currentHeight,
		backgroundColor: "#20314d",
		paddingTop: 20,
	},
	scrollView: {
		// marginHorizontal: 20,
	},
	itemsContainer: {
		marginHorizontal: 20,
	},
	serviceContainer: {
		marginTop: 20,
	},
	cardHeaderTitle: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerText: {
		flex: 1,
		fontSize: 20,
		fontWeight: "600",
		color: Colors.white,
		textAlign: "center",
	},
	headerTextView: {
		flex: 1,
		fontSize: 12,
		fontWeight: "600",
		color: Colors.blue800,
		// textDecorationLine: "underline",
	},
	cardHeaderDescription: {
		color: Colors.white,
	},
});
