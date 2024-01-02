import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import React from "react";

const FormRadioButton = ({
	value,
	onPress,
	label,
	checked,
	styles,
	status,
}) => {
	return (
		<View>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<RadioButton
					value={value}
					status={status}
					onPress={onPress}
					theme={{
						colors: {
							text: "white",
						},
					}}
				/>
				<Text style={styles.checkbox}>{label}</Text>
			</View>
		</View>
	);
};

export { FormRadioButton };
