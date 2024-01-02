import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, Colors, TextInput } from "react-native-paper";
import AuthContext from "../../context/Auth/AuthContext";
import Profile from "../Profile/Profile";
import axios from "axios";
import { APP_URL } from "@env";
import Loading from "../../components/Loading";
import { Picker } from "@react-native-picker/picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import AlertBox from "../../components/AlertBox";
import AppLoader from "../../components/AppLoader";
import textOnlyValidator from "../../helper/textOnlyValidator";

const Width = Dimensions.get("window").width;

const AddCar = ({ navigation }) => {
	const auth = useContext(AuthContext);
	const token = auth.loginState.userToken;
	const [appLoading, setAppLoading] = useState(false);

	const [carBrand, setCarBrand] = useState({});
	const [carModel, setCarModel] = useState({});
	const [carVariant, setCarVariant] = useState({});

	const [loading, setLoading] = useState(true);
	const [modelLoading, setModelLoading] = useState(true);
	const [variantLoading, setVariantLoading] = useState(true);

	const [brandSelect, setBrandSelect] = useState(null);
	const [modelSelect, setModelSelect] = useState(null);
	const [variantSelect, setVariantSelect] = useState(null);
	const [fuelType, setFuelType] = useState(null);
	const [year, setYear] = useState("");
	const [transmission, setTransmission] = useState("");
	const [km, setKm] = useState(null);
	const [owner, setOwner] = useState(null);
	const [color, setColor] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(null);
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [area, setArea] = useState("");
	const [address, setAddress] = useState("");
	const [photos, setPhotos] = useState([]);

	// Error States
	const [brandError, setBrandError] = useState(false);
	const [modelError, setModelError] = useState(false);
	const [variantError, setVariantError] = useState(false);
	const [fuelTypeError, setFuelTypeError] = useState(false);
	const [yearError, setYearError] = useState(false);
	const [transmissionError, setTransmissionError] = useState(false);
	const [kmError, setKmError] = useState(false);
	const [ownerError, setOwnerError] = useState(false);
	const [colorError, setColorError] = useState(false);
	const [titleError, setTitleError] = useState(false);
	const [priceError, setPriceError] = useState(false);
	const [stateError, setStateError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [addressError, setAddressError] = useState(false);
	const [photosError, setphotosError] = useState(false);

	useEffect(() => {
		if (modelSelect) {
			axios
				.get(`${APP_URL}/admin/cars/get-cars/${modelSelect}`, {
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setCarVariant(response.data);
					// console.log(carModel);
					setVariantLoading(false);
				})
				.catch((error) => {});
		}
	}, [modelSelect]);

	useEffect(() => {
		if (brandSelect) {
			axios
				.get(`${APP_URL}/admin/cars/model/get-models/${brandSelect}`, {
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setCarModel(response.data);
					// console.log(carModel);
					setModelLoading(false);
				})
				.catch((error) => {});
		}
	}, [brandSelect]);

	useEffect(() => {
		// permisionFunction();
		axios
			.get(`${APP_URL}/admin/cars/brand`, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
			})
			.then((response) => {
				setCarBrand(response.data);
				setVariantLoading(true);
				setLoading(false);
			})
			.catch((error) => {});
	}, []);

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

	const uploadImage = async () => {
		await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})
			.then((response) => {
				if (!response.cancelled) {
					setPhotos([...photos, response]);
				}
			})
			.catch((error) => console.log(error));
	};

	const handleRemoveItem = (name) => {
		setPhotos(photos.filter((item) => item !== name));
	};

	const handlerSubmitForm = async () => {
		setAppLoading(true);
		if (!brandSelect) {
			setBrandError(true);
			setAppLoading(false);

			return alert("Please Select Car Brand");
		}

		if (!modelSelect) {
			setModelError(true);
			setAppLoading(false);

			return alert("Please Select Car Model");
		}

		if (!variantSelect) {
			setVariantError(true);
			setAppLoading(false);

			return alert("Please Select Car Variant");
		}

		if (!fuelType) {
			setFuelTypeError(true);
			setAppLoading(false);

			return alert("Please Select Car Fuel Type");
		}

		if (!transmission) {
			setTransmissionError(true);
			setAppLoading(false);

			return alert("Please Select Transmission");
		}

		if (!year) {
			setYearError(true);
			setAppLoading(false);

			return alert("Please Enter Year");
		}
		if (!km) {
			setKmError(true);
			setAppLoading(false);

			return alert("Please Enter KM Driven");
		}

		if (!owner) {
			setOwnerError(true);
			setAppLoading(false);

			return alert("Please Enter Number of Owners");
		}

		if (!color) {
			setColorError(true);
			setAppLoading(false);

			return alert("Please Enter Color");
		}

		if (!title) {
			setTitleError(true);
			setAppLoading(false);

			return alert("Please Enter Title");
		}

		if (!price) {
			setPriceError(true);
			setAppLoading(false);

			return alert("Please Enter Price");
		}

		if (!state) {
			setStateError(true);
			setAppLoading(false);

			return alert("Please Enter State");
		}

		if (textOnlyValidator(state)) {
			setStateError(true);
			setAppLoading(false);
			return alert("Please Enter valid State Name");
		}

		if (!city) {
			setCityError(true);
			setAppLoading(false);

			return alert("Please Enter City");
		}

		if (textOnlyValidator(city)) {
			setStateError(true);
			setAppLoading(false);
			return alert("Please Enter valid City Name");
		}

		if (!address) {
			setAddressError(true);
			setAppLoading(false);
			return alert("Please Enter Address");
		}

		let data = new FormData();

		photos.forEach((photo, i) => {
			const fileUri = photo.uri;
			console.log(fileUri);
			let filename = fileUri.split("/").pop();

			const extArr = /\.(\w+)$/.exec(filename);
			const type = getMimeType(extArr[1]);

			data.append("photos[]", { uri: fileUri, type: type, name: filename });
		});
		data.append("car_brand_id", brandSelect);
		data.append("car_model_id", modelSelect);
		data.append("car_id", variantSelect);
		data.append("transmission", transmission);
		data.append("fuel_type", fuelType);
		data.append("year", year);
		data.append("km_driven", km);
		data.append("number_of_owners", owner);
		data.append("title", title);
		data.append("description", description);
		data.append("price", price);
		data.append("state", state);
		data.append("city", city);
		data.append("address", address);
		data.append("color", color);
		data.append("area", area);

		axios
			.post(`${APP_URL}/admin/sell/create`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				if (response.data.success) {
					AlertBox(
						response.data.message,
						`Your Car was Listed Successfully, Please wait for Aprroval`
					);
					setPhotos([]);
					setBrandSelect(null);
					setModelSelect(null);
					setVariantSelect(null);
					setTransmission("");
					setFuelType("");
					setYear(null);
					setOwner(null);
					setKm(null);
					setTitle("");
					setDescription("");
					setPrice(null);
					setState("");
					setCity("");
					setAddress("");
					setColor("");
					setArea("");
				}
			})
			.catch((error) => {});
		setAppLoading(false);
	};
	if (!token) {
		navigation.navigate("ProfileTab");
	}

	if (token) {
		if (loading) {
			return <Loading />;
		}
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<View style={styles.formContainer}>
						<View style={styles.textHeaderContainer}>
							<Text style={styles.textHeader}>Add Your Car Details</Text>
						</View>
						<Picker
							selectedValue={brandSelect}
							onValueChange={(itemValue, itemIndex) => {
								setBrandSelect(itemValue);
								setVariantLoading(true);
							}}
							// style={styles.input}
							dropdownIconColor="white"
							style={{ color: "white" }}
						>
							<Picker.Item label="Select Brand" value="" onFocus={true} />
							{carBrand.data.map((brand) => {
								return (
									<Picker.Item
										label={brand.name}
										value={brand.id}
										key={brand.id}
									/>
								);
							})}
						</Picker>

						<Picker
							selectedValue={modelSelect}
							onValueChange={(itemValue, itemIndex) => {
								setModelSelect(itemValue);
								setVariantLoading(true);
							}}
							dropdownIconColor="white"
							style={{ color: "white" }}
						>
							<Picker.Item label="Select Model" value="" />
							{modelLoading ? (
								<></>
							) : (
								carModel.data.map((model) => {
									return (
										<Picker.Item
											label={model.model}
											value={model.id}
											key={model.id}
										/>
									);
								})
							)}
						</Picker>

						<Picker
							selectedValue={variantSelect}
							onValueChange={(itemValue, itemIndex) => {
								setVariantSelect(itemValue);
							}}
							dropdownIconColor="white"
							style={{ color: "white" }}
						>
							<Picker.Item label="Select Variant" value="" />
							{variantLoading ? (
								<></>
							) : (
								carVariant.data.map((variant) => {
									return (
										<Picker.Item
											label={variant.variant}
											value={variant.id}
											key={variant.id}
										/>
									);
								})
							)}
						</Picker>
						<Picker
							selectedValue={fuelType}
							onValueChange={(itemValue, itemIndex) => setFuelType(itemValue)}
							dropdownIconColor="white"
							style={{ color: "white" }}
						>
							<Picker.Item value="" label="Select Fuel Type" />
							<Picker.Item value="Petrol" label="Petrol" />
							<Picker.Item value="Diesel" label="Diesel" />
						</Picker>
						<Picker
							selectedValue={transmission}
							onValueChange={(itemValue, itemIndex) =>
								setTransmission(itemValue)
							}
							dropdownIconColor="white"
							style={{ color: "white" }}
						>
							<Picker.Item value="" label="Select Transmission Type" />
							<Picker.Item value="Automation" label="Automation" />
							<Picker.Item value="Manual" label="Manual" />
						</Picker>
						<TextInput
							placeholder="Year"
							style={styles.input}
							value={year}
							placeholderTextColor="#bfbfbf"
							onChangeText={(year) => setYear(year)}
							mode="flat"
							keyboardType="number-pad"
							error={yearError}
							maxLength={4}
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>

						<TextInput
							placeholder="KM Driven"
							style={styles.input}
							value={km}
							placeholderTextColor="#bfbfbf"
							onChangeText={(km) => setKm(km)}
							mode="flat"
							keyboardType="decimal-pad"
							error={kmError}
							maxLength={6}
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>

						<TextInput
							placeholder="Number of Owner"
							style={styles.input}
							value={owner}
							placeholderTextColor="#bfbfbf"
							onChangeText={(owner) => setOwner(owner)}
							mode="flat"
							keyboardType="number-pad"
							error={ownerError}
							maxLength={2}
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>
						<TextInput
							placeholder="Color"
							style={styles.input}
							value={color}
							placeholderTextColor="#bfbfbf"
							onChangeText={(color) => setColor(color)}
							mode="flat"
							error={colorError}
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>

						<TextInput
							placeholder="Title"
							style={styles.input}
							value={title}
							placeholderTextColor="#bfbfbf"
							onChangeText={(title) => setTitle(title)}
							mode="flat"
							error={titleError}
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>
						<TextInput
							placeholder="Description"
							style={styles.input}
							value={description}
							placeholderTextColor="#bfbfbf"
							onChangeText={(description) => setDescription(description)}
							mode="flat"
							multiline={true}
							numberOfLines={3}
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>
						<TextInput
							placeholder="Price"
							style={styles.input}
							value={price}
							placeholderTextColor="#bfbfbf"
							onChangeText={(price) => setPrice(price)}
							mode="flat"
							keyboardType="number-pad"
							error={priceError}
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>
						<TextInput
							placeholder="State"
							style={styles.input}
							value={state}
							placeholderTextColor="#bfbfbf"
							onChangeText={(state) => setState(state)}
							mode="flat"
							error={stateError}
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>
						<TextInput
							placeholder="City"
							style={styles.input}
							value={city}
							placeholderTextColor="#bfbfbf"
							onChangeText={(city) => setCity(city)}
							mode="flat"
							error={cityError}
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>
						<TextInput
							placeholder="Area"
							style={styles.input}
							value={area}
							placeholderTextColor="#bfbfbf"
							onChangeText={(area) => setArea(area)}
							mode="flat"
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>
						<TextInput
							placeholder="Address"
							style={styles.input}
							value={address}
							placeholderTextColor="#bfbfbf"
							onChangeText={(address) => setAddress(address)}
							mode="flat"
							multiline={true}
							numberOfLines={3}
							error={addressError}
							theme={{
								colors: {
									text: "white",
								},
							}}
						/>
						<View>
							<View style={styles.imagesContainer}>
								{photos.map((photo, index) => {
									return (
										<View key={index} style={styles.selectedImages}>
											<Image
												source={{ uri: photo.uri }}
												style={styles.images}
											/>
											<TouchableOpacity
												onPress={() => {
													handleRemoveItem(photo);
												}}
												style={styles.removeImageIcon}
											>
												<MaterialCommunityIcons
													name="delete"
													color="red"
													size={20}
												/>
											</TouchableOpacity>
										</View>
									);
								})}
								{photos.length < 6 ? (
									<TouchableOpacity
										onPress={() => uploadImage()}
										style={styles.addImageIcon}
									>
										<View>
											<MaterialCommunityIcons
												name="camera-plus"
												size={20}
												color={Colors.red500}
											/>
										</View>
									</TouchableOpacity>
								) : (
									<View></View>
								)}
							</View>
						</View>
						<View style={{ paddingVertical: 20 }}>
							<Button icon="car" mode="contained" onPress={handlerSubmitForm}>
								Add Car
							</Button>
						</View>
					</View>
				</ScrollView>
				{appLoading ? <AppLoader /> : <Text></Text>}
			</SafeAreaView>
		);
	}
	// return <Profile navigation={navigation} />;
	return <TouchableOpacity onPress={navigation.goBack()}></TouchableOpacity>;
};

export default AddCar;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#20314d",
	},
	formContainer: {
		flex: 1,
		paddingHorizontal: 40,
		paddingTop: 20,
		paddingBottom: 40,
	},
	input: {
		paddingBottom: 0,
		color: "#fff",
		borderBottomWidth: 0.3,
		borderBottomColor: "#f7f7f7",
		backgroundColor: "transparent",
	},
	imagesContainer: {
		paddingVertical: 10,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	addImageIcon: {
		flexDirection: "row",
		// flex: 1,
		width: "33%",
		height: 100,
		alignItems: "center",
		justifyContent: "center",
		// flexWrap: "wrap",
	},
	selectedImages: {
		width: "33%",
		padding: 3,
	},
	images: {
		width: "100%",
		height: 100,
	},
	removeImageIcon: {
		position: "absolute",
		right: 10,
		top: 10,
	},
	textHeaderContainer: {
		flexDirection: "row",
		justifyContent: "center",
		paddingVertical: 10,
	},
	textHeader: {
		fontWeight: "bold",
		fontSize: 20,
		color: Colors.white,
		textTransform: "uppercase",
		textDecorationLine: "underline",
	},
});
