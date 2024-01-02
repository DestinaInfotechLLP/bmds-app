import {
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import {
	RadioButton,
	Button,
	Colors,
} from "react-native-paper";
import { AddressProof, AgeProof } from "../static/Docs";

const CustomAddressProofForm = ({ valueChange, value, styles, onPress }) => {
	return (
		<View>
			<View>
				<Text style={{ color: "#fff", paddingBottom: 5 }}>
					Upload Address Proof (Any One)
				</Text>
				<View style={{ paddingBottom: 10 }}>
					<RadioButton.Group onValueChange={valueChange} value={value}>
						<View style={styles.radioGroup}>
							{AddressProof.map((aProof) => {
								return (
									<View style={styles.radioGroupItems} key={aProof.label}>
										<RadioButton value={aProof.label} />
										<Text style={styles.txtWhite}>{aProof.name}</Text>
									</View>
								);
							})}
						</View>
					</RadioButton.Group>
				</View>
				<TouchableOpacity>
					<Button
						icon="file-upload"
						color={Colors.green500}
						size={30}
						onPress={onPress}
					>
						Upload Your Address Proof Document
					</Button>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const CustomAgeProofForm = ({ valueChange, value, styles, onPress }) => {
	return (
		<View>
			<View>
				<Text style={{ color: "#fff", paddingBottom: 5 }}>
					Upload Age Proof (Any One)
				</Text>
				<View style={{ paddingBottom: 10 }}>
					<RadioButton.Group onValueChange={valueChange} value={value}>
						<View style={styles.radioGroup}>
							{AgeProof.map((aProof) => {
								return (
									<View style={styles.radioGroupItems} key={aProof.label}>
										<RadioButton value={aProof.label} />
										<Text style={styles.txtWhite}>{aProof.name}</Text>
									</View>
								);
							})}
						</View>
					</RadioButton.Group>
				</View>
				<TouchableOpacity>
					<Button
						icon="file-upload"
						color={Colors.green500}
						size={30}
						onPress={onPress}
					>
						Upload Your Age Proof Document
					</Button>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export { CustomAddressProofForm, CustomAgeProofForm };
