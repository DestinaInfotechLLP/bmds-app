import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	Animated,
	DevSettings,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { List, IconButton, Colors, Avatar } from "react-native-paper";
import styles from "./Styles";
import CircleBtn from "../../components/CircleBtn";
import Offer from "../../../assets/offer.jpg";
import profile from "../../../assets/profile.png";
import AuthContext from "../../context/Auth/AuthContext";
import axios from "axios";
import Loading from "../../components/Loading";
import { APP_URL, IMG_URL } from "@env";
import AppLoader from "../../components/AppLoader";
import * as ImagePicker from "expo-image-picker";

const Profile = ({ navigation }) => {
	const offset = useRef(new Animated.Value(0)).current;
	const auth = useContext(AuthContext);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [profilePic, setProfilePic] = useState();

	useEffect(() => {
		const token = auth.loginState.userToken;
		setTimeout(async () => {
			if (auth.loginState.userToken) {
				await axios
					.get(`${APP_URL}/profile`, {
						headers: { Authorization: `Bearer ${token}` },
					})
					.then((response) => {
						if (response.data.success) {
							setUser(response.data);
							setLoading(false);
						}
					})
					.catch((error) => console.error(error.response));
			} else {
				setLoading(false);
			}
		}, 200);
	}, [auth.loginState.userToken]);

	const getMimeType = (ext) => {
		// mime type mapping for few of the sample file types
		switch (ext) {
			case "pdf":
				return "application/pdf";
			case "jpg":
				return "image/jpeg";
			case "jpeg":
				return "image/jpeg";
			case "png":
				return "image/png";
		}
	};

	const uploadProfieImage = async () => {
		const token = auth.loginState.userToken;

		const data = new FormData();

		await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		})
			.then((response) => {
				if (!response.cancelled) {
					// setProfilePic(response);
					const fileUri = response.uri;
					let filename = fileUri.split("/").pop();

					const extArr = /\.(\w+)$/.exec(filename);
					const type = getMimeType(extArr[1]);

					data.append("profile_pic", {
						uri: fileUri,
						type: type,
						name: filename,
					});
					axios
						.post(`${APP_URL}/profile/update/profilepic`, data, {
							headers: {
								Authorization: `Bearer ${token}`,
								"content-type": "multipart/form-data",
								Accept: "application/json",
							},
						})
						.then((response) => {
							// console.log(response.data);
							// DevSettings.reload();
						})
						.catch((error) => console.log(error.response));
				}
			})
			.catch((error) => console.log(error));
	};

	if (loading) {
		return <AppLoader />;
	}
	if (auth.loginState.userToken) {
		if (!user.data) {
			return <AppLoader />;
		}
		return (
			<ScrollView
				stickyHeaderIndices={[0]}
				showsVerticalScrollIndicator={false}
				style={{ backgroundColor: "#20314d", color: "#fff" }}
			>
				<View style={styles.authContainer}>
					<View style={styles.profileBanner}>
						<View style={styles.profileImageContainer}>
							{user.data.profile_pic ? (
								<Avatar.Image
									source={{
										uri: `${IMG_URL}/profile/${user.data.profile_pic}`,
									}}
									size={100}
								/>
							) : (
								<Image source={profile} style={styles.profileImage} />
							)}
						</View>
						<IconButton
							icon="pencil"
							color={Colors.red400}
							containerColor={Colors.amberA100}
							size={20}
							onPress={() => uploadProfieImage()}
							style={{ marginTop: -15, backgroundColor: "#e7e7e7" }}
						/>
						<View>
							<Text style={styles.profileName}>
								{user.data.username.toUpperCase()}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.authContainerDetail}>
					<View style={styles.accountInfoContainer}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Text style={styles.accountInfoTitle}>Account Info: </Text>
							<IconButton
								icon="pencil"
								color={Colors.red400}
								containerColor={Colors.amberA100}
								size={20}
								onPress={() => navigation.navigate("EditProfile")}
								// style={{ marginTop: -15, backgroundColor: "#e7e7e7" }}
							/>
						</View>
						<List.Item
							title="Name"
							description={user.data.name}
							left={(props) => <List.Icon {...props} icon="account" />}
						/>
						<List.Item
							title="Mobile"
							description={user.data.mobile}
							left={(props) => <List.Icon {...props} icon="cellphone" />}
						/>
						<List.Item
							title="Email"
							description={user.data.email}
							left={(props) => <List.Icon {...props} icon="email" />}
						/>
						<List.Item
							title="Address"
							description={user.data.full_address}
							left={(props) => <List.Icon {...props} icon="home-map-marker" />}
						/>
					</View>
					<View>
						<List.Section>
							<List.Subheader>More</List.Subheader>
							<TouchableOpacity onPress={() => navigation.navigate("Requests")}>
								<List.Item
									title="My Request"
									titleStyle={styles.listItems}
									left={() => <List.Icon color="#fa7" icon="server" />}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigation.navigate("MyCars")}>
								<List.Item
									title="My Cars"
									titleStyle={styles.listItems}
									left={() => <List.Icon color="#c06" icon="car" />}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigation.navigate("Help")}>
								<List.Item
									title="Help"
									titleStyle={styles.listItems}
									left={() => <List.Icon color="#4d7" icon="help" />}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigation.navigate("Support")}>
								<List.Item
									title="Support"
									titleStyle={styles.listItems}
									left={() => <List.Icon color="#c1d" icon="calendar-clock" />}
								/>
							</TouchableOpacity>
							{/* <TouchableOpacity onPress={() => navigation.navigate("Tc")}>
								<List.Item
									title="Term & Condition"
									titleStyle={styles.listItems}
									left={() => <List.Icon color="#e45" icon="folder" />}
								/>
							</TouchableOpacity> */}
							<TouchableOpacity>
								<List.Item
									title="App Version"
									titleStyle={styles.listItems}
									description="v1.0.0"
									left={() => <List.Icon color="#38f" icon="apps" />}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => auth.authContext.signOut()}>
								<List.Item
									title="Sign Out"
									titleStyle={styles.listItems}
									left={() => <List.Icon color="#f56" icon="logout" />}
								/>
							</TouchableOpacity>
						</List.Section>
					</View>
				</View>
			</ScrollView>
		);
	} else {
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.authButtonCard}>
						<View style={styles.authButtonContainer}>
							<CircleBtn
								icon="lock"
								color="red"
								title="Login as User"
								onPress={() => navigation.navigate("Login", { role: "user" })}
							/>
							<CircleBtn
								icon="account-lock"
								color="green"
								title="Login as Agent"
								onPress={() => navigation.navigate("Login", { role: "agent" })}
							/>
						</View>
					</View>
					{/* <View style={[styles.card, styles.shadowProp]}>
						<Image source={Offer} style={styles.offerImage} />
					</View> */}
				</View>
				<View>
					<List.Section>
						<List.Subheader>More</List.Subheader>

						<TouchableOpacity onPress={() => navigation.navigate("Help")}>
							<List.Item
								title="Help"
								titleStyle={styles.listItems}
								left={() => <List.Icon color="#4d7" icon="help" />}
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate("Support")}>
							<List.Item
								title="Support"
								titleStyle={styles.listItems}
								left={() => <List.Icon color="#c1d" icon="calendar-clock" />}
							/>
						</TouchableOpacity>
						{/* <TouchableOpacity onPress={() => navigation.navigate("Tc")}>
							<List.Item
								title="Term & Condition"
								titleStyle={styles.listItems}
								left={() => <List.Icon color="#e45" icon="folder" />}
							/>
						</TouchableOpacity> */}
						<TouchableOpacity>
							<List.Item
								title="App Version"
								titleStyle={styles.listItems}
								description="v1.0.0"
								left={() => <List.Icon color="#38f" icon="apps" />}
							/>
						</TouchableOpacity>
						{/* <TouchableOpacity onPress={() => auth.authContext.signOut()}>
							<List.Item
								title="Sign Out"
								titleStyle={styles.listItems}
								left={() => <List.Icon color="#f56" icon="logout" />}
							/>
						</TouchableOpacity> */}
					</List.Section>
				</View>
			</ScrollView>
		);
	}
};

export default Profile;
