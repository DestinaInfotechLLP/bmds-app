import { Alert } from "react-native";

const AlertBox = (title, message) => {
	Alert.alert(title, message, [
		{
			text: "Cancel",
			onPress: () => {},
			style: "cancel",
		},
	]);
};

export default AlertBox;
