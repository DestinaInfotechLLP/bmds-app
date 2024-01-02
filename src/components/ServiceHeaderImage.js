import { View, Image } from "react-native";
import React from "react";

const ServiceHeaderImage = () => {
	return (
		<View>
			<Image
				source={{
					uri:
						service.data.service_photo == null
							? "https://us.123rf.com/450wm/artinspiring/artinspiring1710/artinspiring171000917/88752959-woman-s-driver-license-id-card-and-automobile-.jpg"
							: service.service_photo,
				}}
				style={styles.serviceImg}
			/>
		</View>
	);
};

export default ServiceHeaderImage;
