import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { APP_URL } from "@env";
import { Avatar, Caption } from "react-native-paper";
import Profile from "../../assets/profile.png";

const PostByDetail = ({ navigation, id }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});

	useEffect(() => {
		console.log(id);
		axios
			.get(`${APP_URL}/guest/sell/user/show/${id}`, {
				headers: { Accept: "application/json" },
			})
			.then((response) => {
				setUser(response.data);
				setLoading(false);
				console.log(response.data);
			})
			.catch((error) => console.error(error.data));
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<View>
			<View style={styles.userContainer}>
				{user.data.profile_img ? (
					<Avatar.Image
						source={{
							uri: `${IMG_URL}/profile/${user.data.profile_img}`,
						}}
					/>
				) : (
					<Avatar.Image source={Profile} />
				)}
				<View style={styles.userDetailContainer}>
					<Text style={styles.usernameText}>
						{user.data.name == "admin" ? "BHARAT MOTOR" : user.data.name}
					</Text>
					<Text>
						<Caption>{user.data.mobile}</Caption>
					</Text>
				</View>
			</View>
		</View>
	);
};

export default PostByDetail;

const styles = StyleSheet.create({
	userContainer: {
		flex: 1,
		flexDirection: "row",
	},
	userDetailContainer: {
		paddingHorizontal: 20,
	},
	usernameText: {
		fontSize: 16,
		fontWeight: "bold",
		textTransform: "capitalize",
	},
});
