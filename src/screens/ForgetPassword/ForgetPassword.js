import {
	View,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { theme } from "../../core/theme";
import { Text, TextInput as Input } from "react-native-paper";
import usernameValidator from "../../helper/usernameValidator";
import axios from "axios";
import AuthContext from "../../context/Auth/AuthContext";
import { APP_URL } from "@env";
import AppLoader from "../../components/AppLoader";
import AlertBox from "../../components/AlertBox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import emailValidator from "../../helper/emailValidator";

const Login = ({ navigation, route }) => {
	const auth = useContext(AuthContext);
	const [email, setEmail] = useState({ value: "", error: "" });

	const [appLoading, setAppLoading] = useState(false);

	const onLoginPressed = async () => {
		setAppLoading(true);
		const emailError = emailValidator(email.value);
		if (emailError) {
			setEmail({ ...username, error: usernameError });
			setAppLoading(false);
			return;
		}
		const data = new FormData();
		data.append("email", email.value);

		try {
			const response = await axios.post(
				`${APP_URL}/forget-password`,
				{ email: email.value },
				{
					headers: {
						Accept: "Application/json",
					},
				}
			);
			if (response.status === 202) {
				Alert.alert("Success", "Email has been sent to your email");
				setAppLoading(false);
			}
		} catch (error) {
			console.log(error.response);
			setAppLoading(false);
		}
	};
	return (
		<Background>
			<Logo />
			<Header>Welcome back.</Header>
			<TextInput
				label="Email"
				returnKeyType="next"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: "" })}
				error={!!email.error}
				errorText={email.error}
			/>

			<Button mode="contained" onPress={onLoginPressed}>
				Login
			</Button>
			<View style={styles.row}>
				{/* <Text>Don’t have an account? </Text> */}
				<TouchableOpacity onPress={() => navigation.replace("Login")}>
					<Text style={styles.link}>Login</Text>
				</TouchableOpacity>
			</View>
			{appLoading ? <AppLoader /> : <Text></Text>}
		</Background>
	);
};

export default Login;

const styles = StyleSheet.create({
	forgotPassword: {
		width: "100%",
		alignItems: "flex-end",
		marginBottom: 24,
	},
	row: {
		flexDirection: "row",
		marginTop: 4,
	},
	forgot: {
		fontSize: 13,
		color: theme.colors.secondary,
	},
	link: {
		fontWeight: "bold",
		color: theme.colors.primary,
	},
});
