import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions, Image, LogBox } from "react-native";
import Carousel from "react-native-banner-carousel";
import { IMG_URL } from "@env";

const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 200;

const CarImageCarousel = ({ imgUrls, navigation }) => {
	useEffect(() => {
		LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
	}, []);

	const renderPage = (image, index) => {
		// console.log(`${IMG_URL}car_sells/cars/${image}`);
		return (
			<View key={index}>
				<Image
					style={{
						width: BannerWidth,
						height: BannerHeight,
					}}
					source={{ uri: `${IMG_URL}/car_sells/cars/${image}` }}
				/>
			</View>
		);
	};
	return (
		<View style={[styles.container, { borderRadius: 20 }]}>
			<Carousel
				autoplay
				autoplayTimeout={5000}
				loop
				index={0}
				pageSize={BannerWidth}
			>
				{imgUrls.map((image, index) => renderPage(image, index))}
			</Carousel>
		</View>
	);
};

export default CarImageCarousel;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
});
