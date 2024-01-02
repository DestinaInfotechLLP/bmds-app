import { View, Text, Animated, Image } from "react-native";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 200;

const ProfileHeader = ({ animatedValue, styles }) => {
	const insets = useSafeAreaInsets();

	useEffect(() => {
		LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
	}, []);

	const headerHeight = animatedValue.interpolate({
		inputRange: [0, HEADER_HEIGHT + insets.top],
		outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
		extrapolate: "clamp",
	});
	return (
		<Animated.View
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 10,
				height: headerHeight,
				backgroundColor: "lightblue",
			}}
			useNativeDriver={true}
		>
			<View style={styles.authContainer}>
				<View style={styles.profileBanner}>
					<View style={styles.profileImageContainer}>
						<Image source={profile} style={styles.profileImage} />
					</View>
					<View>
						<Text style={styles.profileName}>{user.data.username}</Text>
					</View>
				</View>
			</View>
		</Animated.View>
	);
};

export default ProfileHeader;
