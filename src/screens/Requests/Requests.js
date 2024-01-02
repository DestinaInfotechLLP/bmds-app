import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import Loading from "../../components/Loading";
import Login from "../Login/Login";
import axios from "axios";
import { APP_URL } from "@env";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const Requests = () => {
	const auth = useContext(AuthContext);
	const token = auth.loginState.userToken;
	const [requests, setRequests] = useState({});
	const [loading, setLoading] = useState(true);

	const LeftContent = (props) => <Avatar.Icon {...props} icon="wrench" />;

	useEffect(() => {
		if (token) {
			axios
				.get(`${APP_URL}/admin/service-request/get-by-user/`, {
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: "application/json",
					},
				})
				.then((response) => {
					if (response.data.success) {
						setRequests(response.data);
						setLoading(false);
					}
				})
				.catch((error) => console.log(error.response));
		}
	}, []);
	// console.log(token);
	if (!token) {
		return <Login />;
	}
	if (loading) {
		return <Loading />;
	}
	console.log(Object.keys(requests.data).length);
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				{Object.keys(requests.data).length > 0 ? (
					requests.data.map((req, i) => {
						return (
							<View key={req.id} style={styles.serviceCard}>
								<Card elevation={2}>
									<Card.Title
										title={req.service_id.name}
										subtitle={req.request_id}
										left={LeftContent}
										style={styles.title}
									/>
									<Card.Actions>
										<Paragraph
											style={[
												styles.requestStatus,
												{
													color:
														req.status == "pending"
															? "blue"
															: req.status == "approved"
															? "green"
															: "red",
												},
											]}
										>
											{req.status}
										</Paragraph>
									</Card.Actions>
								</Card>
							</View>
						);
					})
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

export default Requests;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#20314d",
		justifyContent: "center",
		alignItems: "center",
	},
	scrollView: {
		paddingHorizontal: 10,
	},
	serviceCard: {
		marginBottom: 10,
	},
	requestStatus: {
		textTransform: "capitalize",
		textAlign: "center",
		width: "100%",
		fontWeight: "bold",
		fontSize: 16,
	},
	title: {
		fontWeight: "bold",
	},
});
