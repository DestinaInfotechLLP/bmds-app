import {
	View,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	StatusBar,
} from "react-native";
import React from "react";
import {
	Headline,
	List,
	Paragraph,
	Colors,
	Avatar,
	Icon,
} from "react-native-paper";

const Help = ({ navigation }) => {
	const LeftContent = (props) => (
		<List.Icon {...props} icon="check" size={20} color={Colors.white} />
	);
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View>
					<View style={styles.boxContainer}>
						<Headline style={styles.textHeader}>
							Types of Driving licence in Karnataka
						</Headline>
						<Paragraph style={styles.textParagraph}>
							At present, you can apply for three kinds of RTO Karnataka driving
							license depending on your age and the type of vehicle you operate:
						</Paragraph>
						<View style={styles.listContainer}>
							<List.Item
								titleStyle={styles.listItems}
								descriptionStyle={styles.listItemsDescription}
								descriptionNumberOfLines={5}
								// left={LeftContent}
								title="Driving licence Issued for Gearless Motorcycles"
								description="This is a type of permanent DL in Karnataka. It is granted to applicants who drive gearless motorcycles and two-wheelers like mopeds and scooters. To apply for this licence, the candidate must be at least 16 years old."
							/>
							<List.Item
								title="Driving licence Issued for a Light Motor Vehicle"
								descriptionNumberOfLines={5}
								titleStyle={styles.listItems}
								descriptionStyle={styles.listItemsDescription}
								description="In Karnataka, driving licence applicants who drive light motor vehicles such as cars and bikes can opt for this type of permanent licence. To apply, candidates are required to be at least 18 years old."
							/>
							<List.Item
								title="Driving licence Issued for a Transport Vehicle"
								descriptionNumberOfLines={5}
								titleStyle={styles.listItems}
								descriptionStyle={styles.listItemsDescription}
								description="Candidates who wish to drive transport vehicles like trucks, cabs, lorries, or private sector cars are required to opt for this type of driving licence in Karnataka. The driver’s licence for a transport vehicle is generally allotted to applicants who are at least 20 years of age."
							/>
						</View>
					</View>
					<View style={styles.boxContainer}>
						<Headline style={styles.textHeader}>
							Eligibility Criteria for Driving licence in Karnataka
						</Headline>
						<Paragraph style={styles.textParagraph}>
							To procure a valid driving licence in Karnataka, you must meet the
							following criteria to begin your learning or driving licence
							online application in Karnataka.
						</Paragraph>
						<View style={styles.listContainer}>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Candidates should be at least 18 years or older to apply for their permanent driving licence and lawfully drive their motor vehicle"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Candidates must have a valid learner’s licence"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="The Karnataka driving licence application form for a permanent DL must be submitted at least 30 days and within 180 days from the date of issue on one’s learner’s licence"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Those who are 20 years or older and already hold their learner’s licence, can apply for a commercial vehicle licence"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Applicants must be aware of all the current traffic laws and regulations"
							/>
						</View>
					</View>
					<View style={styles.boxContainer}>
						<Headline style={styles.textHeader}>
							Documents Required for Driving Licence Application in Karnataka
						</Headline>
						<Paragraph style={styles.textParagraph}>
							Here is a list of important documents required for driving licence
							in Karnataka:
						</Paragraph>
						<View style={styles.listContainer}>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Four passport-size photos"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Medical certificate issued by a licenced government doctor, if applicable"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Original learner’s licence"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Application Form 4"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Application Form 5, for commercial DL"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Proof of age (PAN Card, Aadhar Card, Passport, Voters ID, etc.)"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Proof of address (Utility bill, Rental agreement, Ration card, Passport, PAN Card, etc.)"
							/>
							<List.Item
								titleNumberOfLines={3}
								titleStyle={styles.listItems}
								title="Application fees as specified"
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Help;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight - 30,
		paddingBottom: StatusBar.currentHeight,
		backgroundColor: "#20314d",
		textAlign: "justify",
	},
	scrollView: {
		paddingHorizontal: 20,
	},
	boxContainer: {
		paddingVertical: 10,
	},
	textHeader: {
		textAlign: "center",
		fontSize: 22,
		fontWeight: "bold",
		color: Colors.white,
		textDecorationLine: "underline",
		paddingBottom: 4,
	},
	textParagraph: {
		textAlign: "justify",
		letterSpacing: 1.1,
		fontSize: 14,
		fontWeight: "300",
		color: Colors.white,
		paddingBottom: 4,
	},
	listContainer: {},
	listItems: {
		fontSize: 14,
		color: Colors.white,
	},
	listItemsDescription: {
		fontSize: 12,
		color: Colors.white,
		paddingTop: 2,
		textAlign: "justify",
	},
});
