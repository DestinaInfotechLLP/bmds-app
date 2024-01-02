import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import AppLoader from "../../components/AppLoader";
import axios from "axios";
import { APP_URL } from "@env";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import nameValidator from "../../helper/nameValidator";
import usernameValidator from "../../helper/usernameValidator";
import emailValidator from "../../helper/emailValidator";
import mobileNumberValidator from "../../helper/mobileNumberValidator";
import AlertBox from "../../components/AlertBox";

const EditProfile = ({ navigation }) => {
	const auth = useContext(AuthContext);
	const [name, setName] = useState({ value: "", error: "" });
	const [username, setUsername] = useState({
		value: "",
		error: "",
	});
	const [mobileNumber, setMobileNumber] = useState({ value: "", error: "" });
	const [email, setEmail] = useState({ value: "", error: "" });
	const [address, setAddress] = useState({ value: "", error: "" });
	const [appLoading, setAppLoading] = useState(false);

	useEffect(() => {
		setAppLoading(true);
		const token = auth.loginState.userToken;
		setTimeout(async () => {
			if (auth.loginState.userToken) {
				await axios
					.get(`${APP_URL}/profile`, {
						headers: { Authorization: `Bearer ${token}` },
					})
					.then((response) => {
						if (response.data.success) {
							// setUser(response.data);
							const data = response.data.data;
							if (response.data.success) {
								setName({ value: data.name, error: "" });
								setUsername({ value: data.username, error: "" });
								setEmail({ value: data.email, error: "" });
								setMobileNumber({ value: data.mobile, error: "" });
								setAddress({ value: data.full_address, error: "" });
								setAppLoading(false);
							}
						}
					})
					.catch((error) => {
						console.log(error);
						setAppLoading(false);
					});
			}
		}, 1000);
	}, []);

	const updateUser = async () => {
		setAppLoading(true);
		const token = auth.loginState.userToken;

		const nameError = nameValidator(name.value);
		const usernameError = usernameValidator(username.value);
		const emailError = emailValidator(email.value);
		const mobileError = mobileNumberValidator(mobileNumber.value);

		if (nameError || usernameError || emailError || mobileError) {
			setName({ ...name, error: nameError });
			setUsername({ ...username, error: usernameError });
			setEmail({ ...email, error: emailError });
			setMobileNumber({ ...mobileNumber, error: mobileError });
			setAppLoading(false);
			return;
		}

		const data = new FormData();
		data.append("name", name.value);
		data.append("username", username.value);
		data.append("email", email.value);
		data.append("mobile", mobileNumber.value);
		data.append("full_address", address.value);

		await axios
			.post(`${APP_URL}/profile/update`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "multipart/form-data",
					Accept: "application/json",
				},
			})
			.then((response) => {
				navigation.push("Profile");
			})
			.catch((error) => {
				AlertBox(error.response.data.message, error.response.data.data);
			});
	};

	// if (loading) {
	// 	return <AppLoader />;
	// }
	if (auth.loginState.userToken) {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.Scrollcontainer}>
					<View style={styles.headerContainer}>
						<Text style={styles.header}>Update Your Profile Detail</Text>
					</View>
					<View>
						<TextInput
							label="Name"
							returnKeyType="next"
							value={name.value}
							onChangeText={(text) => setName({ value: text, error: "" })}
							error={!!name.error}
							errorText={name.error}
							theme={{
								colors: {
									placeholder: "white",
									text: "white",
									primary: "white",
									underlineColor: "transparent",
									background: "#003489",
								},
							}}
							style={{ backgroundColor: "#20314d" }}
						/>
						<TextInput
							label="Username"
							returnKeyType="next"
							value={username.value}
							onChangeText={(text) => setUsername({ value: text, error: "" })}
							error={!!username.error}
							errorText={username.error}
							theme={{
								colors: {
									placeholder: "white",
									text: "white",
									primary: "white",
									underlineColor: "transparent",
									background: "#003489",
								},
							}}
							style={{ backgroundColor: "#20314d" }}
						/>
						<TextInput
							label="Email"
							returnKeyType="next"
							value={email.value}
							onChangeText={(text) => setEmail({ value: text, error: "" })}
							error={!!email.error}
							errorText={email.error}
							autoComplete="email"
							keyboardType="email-address"
							theme={{
								colors: {
									placeholder: "white",
									text: "white",
									primary: "white",
									underlineColor: "transparent",
									background: "#003489",
								},
							}}
							style={{ backgroundColor: "#20314d" }}
						/>
						<TextInput
							label="Mobile Number"
							returnKeyType="next"
							value={mobileNumber.value}
							onChangeText={(text) =>
								setMobileNumber({ value: text, error: "" })
							}
							error={!!mobileNumber.error}
							errorText={mobileNumber.error}
							keyboardType="phone-pad"
							placeholderTextColor="white"
							theme={{
								colors: {
									placeholder: "white",
									text: "white",
									primary: "white",
									underlineColor: "transparent",
									background: "#003489",
								},
							}}
							style={{ backgroundColor: "#20314d" }}
						/>
						<TextInput
							label="Address"
							returnKeyType="next"
							value={address.value}
							onChangeText={(text) => setAddress({ value: text, error: "" })}
							error={!!address.error}
							errorText={address.error}
							multiline={true}
							numberOfLines={4}
							theme={{
								colors: {
									placeholder: "white",
									text: "white",
									primary: "white",
									underlineColor: "transparent",
									background: "#003489",
								},
							}}
							style={{ backgroundColor: "#20314d" }}
						/>
						<Button
							mode="contained"
							onPress={updateUser}
							style={{ marginTop: 24 }}
						>
							Update
						</Button>
					</View>
				</ScrollView>
				{appLoading ? <AppLoader /> : <></>}
			</SafeAreaView>
		);
	}
};

export default EditProfile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#20314d",
	},
	Scrollcontainer: { paddingHorizontal: 20 },
	headerContainer: {
		paddingVertical: 20,
		flexDirection: "row",
		justifyContent: "center",
	},
	header: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
		textTransform: "uppercase",
	},
});
