import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Image, LogBox } from "react-native";
import Carousel from "react-native-banner-carousel";
import AppLoader from "./AppLoader";
import axios from "axios";
import { APP_URL, IMG_URL } from "@env";

const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 200;

function CarouselCards() {
	const [banners, setBanners] = useState();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
		axios
			.get(`${APP_URL}/guest/banner`)
			.then((response) => {
				setBanners(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error.response.data);
				setLoading(false);
			});
	}, []);

	const renderPage = (image, index) => {
		// console.log(image);
		return (
			<View key={index}>
				<Image
					style={{
						width: BannerWidth,
						height: BannerHeight,
					}}
					source={{ uri: `${IMG_URL}/banners/${image}` }}
				/>
			</View>
		);
	};

	if (loading) {
		return <AppLoader />;
	}
	if (banners) {
		return (
			<View style={[styles.container, { borderRadius: 20 }]}>
				<Carousel
					autoplay
					autoplayTimeout={5000}
					loop
					index={0}
					pageSize={BannerWidth}
				>
					{banners.data.map((data, index) => renderPage(data.image, index))}
				</Carousel>
			</View>
		);
	}
	return <AppLoader />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
});

export default CarouselCards;
