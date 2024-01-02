import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, List } from "react-native-paper";
import { APP_URL, IMG_URL } from "@env";
import axios from "axios";
import Loading from "../../components/Loading";
import Accordion from "@gapur/react-native-accordion";

const Services = ({ navigation }) => {
	const [category, setCategory] = useState({});
	const [services, setServices] = useState({});

	const [expanded, setExpanded] = React.useState(true);

	const handlePress = () => setExpanded(!expanded);
	const [loading, setLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`${APP_URL}/guest/services/category/`)
			.then(function (response) {
				setCategory(response.data);
				setIsLoading(false);
			})
			.catch(function (error) {
				console.log(error.response);
			});

		axios
			.get(`${APP_URL}/guest/services/`)
			.then(function (response) {
				setServices(response.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error.response);
			});
	}, []);

	if (loading || isLoading) {
		return <Loading />;
	}
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollView}
			>
				{/* <List.Section title="Accordions"> */}
				{/* <List.AccordionGroup>
					{category.data.map((cat) => {
						return (
							<List.Accordion
								title={cat.name}
								left={(props) => <List.Icon {...props} icon="checkbox-blank" />}
								key={cat.id}
								id={cat.id}
							>
								{services.data.map((service) => {
									if (service.category_id == cat.id) {
										return (
											<TouchableOpacity
												onPress={() =>
													navigation.navigate("Service", { id: service.id })
												}
												key={service.id}
											>
												<List.Item
													title={service.name}
													titleStyle={styles.listItems}
													left={(props) => (
														<List.Icon
															{...props}
															icon="chevron-right"
															color={Colors.red300}
														/>
													)}
												/>
											</TouchableOpacity>
										);
									}
								})}
							</List.Accordion>
						);
					})}
				</List.AccordionGroup> */}
				{/* </List.Section> */}

				<View>
					{category.data.map((cat) => {
						return (
							<Accordion
								showButton
								headerTitle={cat.name}
								headerTitleStyle={{
									fontSize: 16,
									color: "blue",
									fontWeight: "600",
								}}
								buttonStyle={{
									paddingTop: 10,
								}}
								key={cat.id}
							>
								<View>
									{services &&
										services.data.map((service) => {
											if (service.category_id == cat.id) {
												return (
													<View key={service.id} style={styles.services}>
														<View style={styles.serveiceCard}>
															<View style={styles.serveiceC}>
																<View style={styles.serviceImg}>
																	<TouchableOpacity
																		onPress={() =>
																			navigation.navigate("Service", {
																				id: service.id,
																			})
																		}
																	>
																		<Image
																			source={{
																				uri:
																					service.service_photo == null
																						? "https://us.123rf.com/450wm/artinspiring/artinspiring1710/artinspiring171000917/88752959-woman-s-driver-license-id-card-and-automobile-.jpg"
																						: `${IMG_URL}/services/${service.service_photo}`,
																			}}
																			resizeMode="contain"
																			style={styles.backgroundImg}
																		></Image>
																	</TouchableOpacity>
																</View>
															</View>
															<Text style={styles.serviceText}>
																{service.name}
															</Text>
														</View>
													</View>
												);
											}
										})}
								</View>
							</Accordion>
						);
					})}
				</View>

				{/* <View>
					{category.data.map((cat) => {
						return (
							<View key={cat.id}>
								<Text style={styles.categoryTitle}>{cat.name}</Text>
								<View>
									{services &&
										services.data.map((service) => {
											if (service.category_id == cat.id) {
												return (
													<View key={service.id} style={styles.services}>
														<View style={styles.serveiceCard}>
															<View style={styles.serveiceC}>
																<View style={styles.serviceImg}>
																	<TouchableOpacity
																		onPress={() =>
																			navigation.navigate("Service", {
																				id: service.id,
																			})
																		}
																	>
																		<Image
																			source={{
																				uri:
																					service.service_photo == null
																						? "https://us.123rf.com/450wm/artinspiring/artinspiring1710/artinspiring171000917/88752959-woman-s-driver-license-id-card-and-automobile-.jpg"
																						: `${IMG_URL}/services/${service.service_photo}`,
																			}}
																			resizeMode="contain"
																			style={styles.backgroundImg}
																		></Image>
																	</TouchableOpacity>
																</View>
															</View>
															<Text style={styles.serviceText}>
																{service.name}
															</Text>
														</View>
													</View>
												);
											}
										})}
								</View>
							</View>
						);
					})}
				</View> */}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Services;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight - 30,
		paddingBottom: StatusBar.currentHeight,
		backgroundColor: "#20314d",
		paddingHorizontal: 20,
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
	headerText: {
		fontSize: 20,
		fontWeight: "600",
		color: Colors.white,
	},
	listItems: {
		color: Colors.white,
	},

	categoryTitle: {
		fontSize: 20,
		fontWeight: "900",
		color: Colors.red700,
		paddingVertical: 10,
		textTransform: "uppercase",
		textAlign: "center",
	},
	serveiceCard: {
		// width: "100%",
		height: 200,
		marginRight: 10,
		flex: 1,
		borderRadius: 10,
	},
	serveiceC: {
		flex: 0.9,
		width: "100%",
	},
	serviceImg: {
		borderRadius: 10,
	},
	backgroundImg: {
		height: "100%",
		justifyContent: "flex-end",
		borderRadius: 10,
	},
	serviceText: {
		fontSize: 16,
		flexDirection: "row",
		justifyContent: "center",
		alignSelf: "center",
		fontWeight: "600",
		color: "#000000",
		paddingTop: 5,
		flexWrap: "wrap",
		width: 200,
		textAlign: "center",
	},
	services: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
	},
});
