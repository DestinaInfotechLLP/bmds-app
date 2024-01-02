import {
	View,
	ScrollView,
	SafeAreaView,
	Text,
	ActivityIndicator,
	RefreshControl,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./Styles";
import CarouselCards from "../../components/CarouselCards";
import ServiceWidget from "../../components/ServicesWidget";
import { APP_URL } from "@env";
import CarListing from "../../components/CarListing";
import AppLoader from "../../components/AppLoader";
import SafetyInfoListing from "../../components/SafetyInfoListing";
import SafetyCard from "../../components/SaftyCard";

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = ({ navigation }) => {
	const [category, setCategory] = useState({});
	const [refreshing, setRefreshing] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	const [safetyInfo, setSafetyInfo] = React.useState();

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		getCategory();
		// getSafetyInfo();
	}, []);

	const getCategory = () => {
		axios
			.get(`${APP_URL}/guest/services/category/`)
			.then(function (response) {
				setCategory(response.data);
				setIsLoading(false);
			})
			.catch(function (error) {
				console.log(error.response);
				setIsLoading(false);
			});
	};

	return (
		<SafeAreaView style={Styles.container}>
			<ScrollView
				style={Styles.scrollView}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollView}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<CarouselCards />

				<View style={Styles.itemsContainer}>
					<View style={Styles.serviceContainer}>
						<SafetyCard navigation={navigation} />
					</View>

					<View style={Styles.serviceContainer}>
						<FetchData category={category} navigation={navigation} />
					</View>

					<View>
						<View style={Styles.cardHeaderTitle}>
							<View>
								<Text style={Styles.headerText}>Pre-Owned Cars</Text>
							</View>
							<View>
								<TouchableOpacity onPress={() => navigation.navigate("CarTab")}>
									<Text style={Styles.headerTextView}>View All</Text>
								</TouchableOpacity>
							</View>
						</View>
						<CarListing navigation={navigation} />
					</View>
				</View>
			</ScrollView>
			{isLoading ? <AppLoader /> : <View></View>}
		</SafeAreaView>
	);
};

export default Home;

const FetchData = ({ category, navigation }) => {
	if (category.success) {
		return category.data.map((cat) => {
			return (
				<ServiceWidget key={cat.id} category={cat} navigation={navigation} />
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
