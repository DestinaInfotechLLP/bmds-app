import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Logo from "../../assets/icon.png";
import axios from "axios";
import AppLoader from "./AppLoader";
import { APP_URL, IMG_URL } from "@env";

function LogoTitle({ navigation }) {
	const [title, setTitle] = useState("");
	const [logo, setLogo] = useState("");
	const [align, setAlign] = useState("");
	const [caption, setCaption] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAppTitle();
		setIsLoading(false);
	}, []);

	const getAppTitle = async () => {
		try {
			const response = await axios.get(`${APP_URL}/guest/settings/`, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			// console.log(response.data);
			if (response.status === 202) {
				setTitle(response.data.data.name);
				setCaption(response.data.data.caption);
				setLogo(response.data.data.logo);
				setAlign(response.data.data.align);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <AppLoader />;
	}
	return (
		<View style={styles.container}>
			<View style={align === 2 ? styles.navBar : styles.navBarVertical}>
				<Image
					source={logo ? { uri: `${IMG_URL}/app/logo/${logo}` } : Logo}
					style={align === 2 ? styles.headerImage : styles.headerImageVertical}
				/>
				<View style={styles.headerText}>
					<Text style={styles.headerTextTitle}>{title ? title : ""}</Text>
					<Text style={styles.headerTextCaption}>{caption ? caption : ""}</Text>
				</View>
			</View>
		</View>
	);
}

export default LogoTitle;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginLeft: -15,
		paddingVertical: 10,
	},
	navBar: {
		alignItems: "center",
	},
	navBarVertical: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	headerText: {
		paddingVertical: 10,
		fontSize: 24,
		color: "#fff",
		fontFamily: "Salsa_400Regular",
	},
	headerTextTitle: {
		fontSize: 24,
		color: "#fff",
		fontFamily: "Salsa_400Regular",
	},
	headerTextCaption: {
		fontSize: 12,
		color: "#fff",
		fontFamily: "Salsa_400Regular",
		textAlign: "center",
	},
	headerImage: {
		width: 40,
		height: 40,
		resizeMode: "contain",
	},
	headerImageVertical: {
		width: 40,
		height: 40,
		resizeMode: "contain",
		marginRight: 10,
	},
});
