import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
} from "react-native";
import { Button, Colors, TextInput, Caption } from "react-native-paper";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import { FormRadioButton } from "../../components/FormComponents";
import {
  CustomAddressProofForm,
  CustomAgeProofForm,
} from "../../components/CustomComponents";
import { APP_URL } from "@env";
import AlertBox from "../../components/AlertBox";
import AuthContext from "../../context/Auth/AuthContext";
import AppLoader from "../../components/AppLoader";
import textOnlyValidator from "../../helper/textOnlyValidator";
import mobileNumberValidator from "../../helper/mobileNumberValidator";
import validator from "validator";

const Width = Dimensions.get("window").width;

const Service = ({ navigation, route }) => {
  // console.log(route.params);
  const { id } = route.params;
  const [service, setService] = useState({});
  const [serviceForms, setServiceForms] = useState({});
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    getService();
    getForms();
  }, []);

  const getService = async () => {
    const res = await axios.get(`${APP_URL}/guest/services/show/${id}`);
    const { data } = res;
    setService(data);
  };

  const getForms = async () => {
    const res = await axios.get(`${APP_URL}/guest/service-form/show/${id}`);
    const { data } = res;
    setServiceForms(data);
  };

  return (
    <View style={styles.container}>
      <FetchData
        service={service}
        id={id}
        navigation={navigation}
        serviceForms={serviceForms}
        setAppLoading={setAppLoading}
      />
      {appLoading ? <AppLoader /> : <Text></Text>}
    </View>
  );
};

export default Service;

const FetchData = ({
  service,
  navigation,
  id,
  serviceForms,
  setAppLoading,
}) => {
  const [imageKeyboard, setImageKeyboard] = useState(true);

  if (service.success) {
    return (
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceDetailTitle}>{service.data.name}</Text>
            <Caption style={styles.serviceDetailDescription}>
              {service.data.description}
            </Caption>
            <View style={styles.serviceDetailForm}>
              <FetchForms
                serviceForms={serviceForms}
                id={id}
                setAppLoading={setAppLoading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
      }}
    >
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const FetchForms = ({ serviceForms, id, setAppLoading }) => {
  const [textInputName, setTextInputName] = useState("");
  const [textInputMobile, setTextInputMobile] = useState("");
  const [textInputAddress, setTextInputAddress] = useState("");
  const [textInputSeater, setTextInputSeater] = useState("");
  const [textInputDays, setTextInputDays] = useState("");
  const [textInputVehicleType, setTextInputVehicleType] = useState("");
  const [address, setAddress] = React.useState("aadhar_card");
  const [checked, setChecked] = React.useState("yes");
  const [age, setAge] = React.useState("birth_certificate");
  const [aadhar, setAadhar] = React.useState(null);
  const [addressDoc, setAddressDoc] = React.useState(null);
  const [ageDoc, setAgeDoc] = React.useState(null);
  const [photo, setPhoto] = React.useState(null);
  const [rc, setRc] = useState(null);
  const [oldInsurance, setOldInsurance] = useState(null);
  const [oldDrivingLicense, setOldDrivingLicense] = useState(null);
  const [drivingLicenseTwo, setDrivingLicenseTwo] = useState(null);
  const [drivingLicenseFour, setDrivingLicenseFour] = useState(null);
  const [learningLicenseFour, setLearningLicenseFour] = useState(null);
  const [learningLicenseTwo, setLearningLicenseTwo] = useState(null);

  const auth = useContext(AuthContext);
  const token = auth.loginState.userToken;

  const alertMsg = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Close",
          onPress: () => {},
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  console.log("------------------" + id);
  const checkInputField = async (e) => {
    e.preventDefault();
    setAppLoading(true);
    const guestUrl = `${APP_URL}/guest/requests`;
    const adminUrl = `${APP_URL}/admin/service-request/store`;

    if (textOnlyValidator(textInputName)) {
      alert(textOnlyValidator(textInputName));
      setAppLoading(false);
      return;
    }

    if (!validator.isAlpha(textInputName.replace(" ", ""), "en-IN")) {
      alert("Please Enter Valid Name");
      setAppLoading(false);
      return;
    }

    if (textOnlyValidator(textInputVehicleType) && id == 7) {
      alert(textOnlyValidator(textInputVehicleType));
      setAppLoading(false);
      return;
    }

    if (
      textOnlyValidator(textInputAddress) &&
      (id == 11 || id == 16 || id == 17)
    ) {
      alert(textOnlyValidator(textInputAddress));
      setAppLoading(false);
      return;
    }

    if (textOnlyValidator(textInputSeater) && (id == 16 || id == 18)) {
      alert(textOnlyValidator(textInputSeater));
      setAppLoading(false);
      return;
    }

    if (
      textOnlyValidator(textInputDays) &&
      (id == 16 || id == 17 || id == 18)
    ) {
      alert(textOnlyValidator(textInputDays));
      setAppLoading(false);
      return;
    }

    if (mobileNumberValidator(textInputMobile)) {
      alert(mobileNumberValidator(textInputMobile));
      setAppLoading(false);
      return;
    }

    if ((oldInsurance == null || rc == null) && (id == 13 || id == 15)) {
      alert("Upload your documents");
      setAppLoading(false);
      return;
    }
    if (
      aadhar == null &&
      checked == "yes" &&
      id != 7 &&
      id != 8 &&
      id != 9 &&
      id != 10 &&
      id != 11 &&
      id != 13 &&
      id != 15 &&
      id != 16 &&
      id != 17 &&
      id != 18
    ) {
      alert("Upload your documents");
      setAppLoading(false);
      return;
    }
    if (
      (addressDoc == null || ageDoc == null) &&
      checked == "no" &&
      id != 7 &&
      id != 8 &&
      id != 9 &&
      id != 10 &&
      id != 11 &&
      id != 13 &&
      id != 15 &&
      id != 16 &&
      id != 17 &&
      id != 18
    ) {
      alert("Upload your documents");
      setAppLoading(false);
      return;
    }

    if (drivingLicenseTwo == null && id == 2) {
      alert("Upload your documents");
      setAppLoading(false);
      return;
    }

    // console.log(address);
    const data = new FormData();
    data.append("service_id", id);
    data.append("name", textInputName);
    data.append("mobile", textInputMobile);
    data.append("address", textInputAddress);
    data.append("seater", textInputSeater);
    data.append("days", textInputDays);
    data.append("vehicle_type", textInputVehicleType);
    data.append("aadhar_card_link", checked);
    data.append("aadhar_card", aadhar);
    if (checked == "no") {
      data.append(address, addressDoc);
      data.append(age, ageDoc);
    }
    data.append("photo", photo);
    data.append("old_insurance", oldInsurance);
    data.append("rc_book", rc);
    data.append("old_driving_license", oldDrivingLicense);
    data.append("driving_license_2_wheeler", drivingLicenseTwo);
    data.append("driving_license_4_wheeler", drivingLicenseFour);
    data.append("learning_license_4_wheeler", learningLicenseFour);
    data.append("learning_license_2_wheeler", learningLicenseTwo);

    console.log("-----data------" + JSON.stringify(data));
    if (token) {
      await axios({
        url: adminUrl,
        method: "POST",
        data: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          const res = response.data;
          console.log(res);
          setTimeout(() => {
            alertMsg(res.message, `Your Application ID: ${res.request_id}`);
          }, 100);

          setTextInputName("");
          setTextInputMobile("");
          setTextInputAddress("");
          setTextInputSeater("");
          setTextInputDays("");
          setTextInputVehicleType("");
          setAddress("aadhar_card");
          setChecked("yes");
          setAge("birth_certificate");
          setAadhar(null);
          setAddressDoc(null);
          setAgeDoc(null);
          setPhoto(null);
          setRc(null);
          setOldInsurance(null);
          setOldDrivingLicense(null);
          setDrivingLicenseTwo(null);
          setDrivingLicenseFour(null);
          setLearningLicenseFour(null);
          setLearningLicenseTwo(null);
        })
        .catch(function (error) {
          console.log("*****handle failure******");
          console.log(error.response);
          alert("Uploading failed");
        });
    } else {
      await axios({
        url: guestUrl,
        method: "POST",
        data: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          const res = response.data;
          console.log(res);
          setTimeout(() => {
            alertMsg(res.message, `Your Application ID: ${res.request_id}`);
          }, 100);

          setTextInputName("");
          setTextInputMobile("");
          setTextInputAddress("");
          setTextInputSeater("");
          setTextInputDays("");
          setTextInputVehicleType("");
          setAddress("aadhar_card");
          setChecked("yes");
          setAge("birth_certificate");
          setAadhar(null);
          setAddressDoc(null);
          setAgeDoc(null);
          setPhoto(null);
          setRc(null);
          setOldInsurance(null);
          setOldDrivingLicense(null);
          setDrivingLicenseTwo(null);
          setDrivingLicenseFour(null);
          setLearningLicenseFour(null);
          setLearningLicenseTwo(null);
        })
        .catch(function (error) {
          console.log("*****handle failure******");
          console.log(error.response);
          alert("Uploading failed");
        });
    }
    setAppLoading(false);
  };

  const pickAadharDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      console.log("=======" + JSON.stringify(response));
      // if (!response.cancelled) {
      //   let { name, size, uri } = response.assets[0];

      //   if (Platform.OS == "android" && uri[0] == "/") {
      //     uri = `file://${uri}`;
      //     uri = uri.replace(/%/g, "%25");
      //   }

      //   let nameParts = name.split(".");
      //   let fileType = nameParts[nameParts.length - 1];
      //   let aadharToUpload = {
      //     name: name,
      //     size: size,
      //     uri: uri,
      //     type: "application/" + fileType,
      //   };
      //   console.log(aadharToUpload, "...............file");
      //   setAadhar(aadharToUpload);
      let aadharToUpload = {
        name: response.name,
        size: response.size,
        uri: response.uri,
        type: response.mimeType,
      };
      console.log(aadharToUpload, "...............file");
      setAadhar(aadharToUpload);
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  const pickAddressDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      // if (!response.cancelled) {
      //   let { name, size, uri } = response.assets[0];

      //   if (Platform.OS == "android" && uri[0] == "/") {
      //     uri = `file://${uri}`;
      //     uri = uri.replace(/%/g, "%25");
      //   }

      //   let nameParts = name.split(".");
      //   let fileType = nameParts[nameParts.length - 1];
      //   let addressToUpload = {
      //     name: name,
      //     size: size,
      //     uri: uri,
      //     type: "application/" + fileType,
      //   };
      //   console.log(addressToUpload, "...............file");
      //   setAddressDoc(addressToUpload);
      // }
      let addressToUpload = {
        name: response.name,
        size: response.size,
        uri: response.uri,
        type: response.mimeType,
      };
      console.log(addressToUpload, "...............file");
      setAddressDoc(addressToUpload);
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  const pickAgeDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      // if (!response.cancelled) {
      //   let { name, size, uri } = response.assets[0];

      //   if (Platform.OS == "android" && uri[0] == "/") {
      //     uri = `file://${uri}`;
      //     uri = uri.replace(/%/g, "%25");
      //   }

      //   let nameParts = name.split(".");
      //   let fileType = nameParts[nameParts.length - 1];
      //   let ageToUpload = {
      //     name: name,
      //     size: size,
      //     uri: uri,
      //     type: "application/" + fileType,
      //   };
      //   console.log(ageToUpload, "...............file");
      //   setAgeDoc(ageToUpload);
      // }

      let ageToUpload = {
        name: response.name,
        size: response.size,
        uri: response.uri,
        type: response.mimeType,
      };
      console.log(ageToUpload, "...............file");
      setAgeDoc(ageToUpload);
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  const pickPhotoDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      if (!response.cancelled) {
        let { name, size, uri } = response.assets[0];

        if (Platform.OS == "android" && uri[0] == "/") {
          uri = `file://${uri}`;
          uri = uri.replace(/%/g, "%25");
        }

        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        let photoToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };
        console.log(photoToUpload, "...............file");
        setPhoto(photoToUpload);
      }
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  const pickRcDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      // if (!response.cancelled) {
      //   let { name, size, uri } = response.assets[0];

      //   if (Platform.OS == "android" && uri[0] == "/") {
      //     uri = `file://${uri}`;
      //     uri = uri.replace(/%/g, "%25");
      //   }

      //   let nameParts = name.split(".");
      //   let fileType = nameParts[nameParts.length - 1];
      //   let rcToUpload = {
      //     name: name,
      //     size: size,
      //     uri: uri,
      //     type: "application/" + fileType,
      //   };
      //   console.log(rcToUpload, "...............file");
      //   setRc(rcToUpload);
      // }
      let rcToUpload = {
        name: response.name,
        size: response.size,
        uri: response.uri,
        type: response.mimeType,
      };
      console.log(rcToUpload, "...............file");
      setRc(rcToUpload);
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  const pickOldInsuranceDocument = async () => {
    console.log("hiiiiii");
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      // if (!response.cancelled) {
      //   let { name, size, uri } = response.assets[0];

      //   if (Platform.OS == "android" && uri[0] == "/") {
      //     uri = `file://${uri}`;
      //     uri = uri.replace(/%/g, "%25");
      //   }

      //   let nameParts = name.split(".");
      //   let fileType = nameParts[nameParts.length - 1];
      //   let oldInsuranceToUpload = {
      //     name: name,
      //     size: size,
      //     uri: uri,
      //     type: "application/" + fileType,
      //   };
      //   console.log(oldInsuranceToUpload, "...............file");
      //   setOldInsurance(oldInsuranceToUpload);
      // }

      let oldInsuranceToUpload = {
        name: response.name,
        size: response.size,
        uri: response.uri,
        type: response.mimeType,
      };
      console.log(oldInsuranceToUpload, "...............file");
      setOldInsurance(oldInsuranceToUpload);
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  const pickOldDrivingDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      // if (!response.cancelled) {
      //   let { name, size, uri } = response.assets[0];

      //   if (Platform.OS == "android" && uri[0] == "/") {
      //     uri = `file://${uri}`;
      //     uri = uri.replace(/%/g, "%25");
      //   }

      //   let nameParts = name.split(".");
      //   let fileType = nameParts[nameParts.length - 1];
      //   let oldDrivingToUpload = {
      //     name: name,
      //     size: size,
      //     uri: uri,
      //     type: "application/" + fileType,
      //   };
      //   console.log(oldDrivingToUpload, "...............file");
      //   setOldDriving(oldDrivingToUpload);
      // }
      let oldDrivingToUpload = {
        name: response.name,
        size: response.size,
        uri: response.uri,
        type: response.mimeType,
      };
      console.log(oldDrivingToUpload, "...............file");
      setOldDriving(oldDrivingToUpload);
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  const pickTwoDrivingDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      // if (!response.cancelled) {
      //   let { name, size, uri } = response.assets[0];

      //   if (Platform.OS == "android" && uri[0] == "/") {
      //     uri = `file://${uri}`;
      //     uri = uri.replace(/%/g, "%25");
      //   }

      //   let nameParts = name.split(".");
      //   let fileType = nameParts[nameParts.length - 1];
      //   let twoDrivingToUpload = {
      //     name: name,
      //     size: size,
      //     uri: uri,
      //     type: "application/" + fileType,
      //   };
      //   console.log(twoDrivingToUpload, "...............file");
      //   setDrivingLicenseTwo(twoDrivingToUpload);
      // }

      let twoDrivingToUpload = {
        name: response.name,
        size: response.size,
        uri: response.uri,
        type: response.mimeType,
      };
      console.log(twoDrivingToUpload, "...............file");
      setDrivingLicenseTwo(twoDrivingToUpload);
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  const pickFourDrivingDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      // if (!response.cancelled) {
      //   let { name, size, uri } = response.assets[0];

      //   if (Platform.OS == "android" && uri[0] == "/") {
      //     uri = `file://${uri}`;
      //     uri = uri.replace(/%/g, "%25");
      //   }

      //   let nameParts = name.split(".");
      //   let fileType = nameParts[nameParts.length - 1];
      //   let fourDrivingToUpload = {
      //     name: name,
      //     size: size,
      //     uri: uri,
      //     type: "application/" + fileType,
      //   };
      //   console.log(fourDrivingToUpload, "...............file");
      //   setDrivingLicenseFour(fourDrivingToUpload);
      // }
      let fourDrivingToUpload = {
        name: response.name,
        size: response.size,
        uri: response.uri,
        type: response.mimeType,
      };
      console.log(fourDrivingToUpload, "...............file");
      setDrivingLicenseFour(fourDrivingToUpload);
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  const pickFourLearningDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      // if (!response.cancelled) {
      //   let { name, size, uri } = response.assets[0];

      //   if (Platform.OS == "android" && uri[0] == "/") {
      //     uri = `file://${uri}`;
      //     uri = uri.replace(/%/g, "%25");
      //   }

      //   let nameParts = name.split(".");
      //   let fileType = nameParts[nameParts.length - 1];
      //   let fourLearningToUpload = {
      //     name: name,
      //     size: size,
      //     uri: uri,
      //     type: "application/" + fileType,
      //   };
      //   console.log(fourLearningToUpload, "...............file");
      //   setLearningLicenseFour(fourLearningToUpload);
      // }
      let fourLearningToUpload = {
        name: response.name,
        size: response.size,
        uri: response.uri,
        type: response.mimeType,
      };
      console.log(fourLearningToUpload, "...............file");
      setLearningLicenseFour(fourLearningToUpload);
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  const pickTwoLearningDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      // if (!response.cancelled) {
      //   let { name, size, uri } = response.assets[0];

      //   if (Platform.OS == "android" && uri[0] == "/") {
      //     uri = `file://${uri}`;
      //     uri = uri.replace(/%/g, "%25");
      //   }

      //   let nameParts = name.split(".");
      //   let fileType = nameParts[nameParts.length - 1];
      //   let twoLearningToUpload = {
      //     name: name,
      //     size: size,
      //     uri: uri,
      //     type: "application/" + fileType,
      //   };
      //   console.log(twoLearningToUpload, "...............file");
      //   setLearningLicenseTwo(twoLearningToUpload);
      // }
      let twoLearningToUpload = {
        name: response.name,
        size: response.size,
        uri: response.uri,
        type: response.mimeType,
      };
      console.log(twoLearningToUpload, "...............file");
      setLearningLicenseTwo(twoLearningToUpload);
    });
    // console.log("Doc: " + aadhar.uri);
    // console.log(result);
  };

  if (serviceForms.success) {
    return (
      <View style={{ flex: 1 }}>
        {serviceForms.data.map((serviceForm, index) => {
          return (
            <View key={index}>
              {serviceForm.form_name == "name" ? (
                <TextInput
                  placeholder="Enter Your Name Here"
                  style={styles.input}
                  placeholderTextColor="#bfbfbf"
                  value={textInputName}
                  onChangeText={(textInputName) =>
                    setTextInputName(textInputName)
                  }
                  mode="flat"
                  theme={{
                    colors: {
                      text: "white",
                    },
                  }}
                />
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "vehicle_type" ? (
                <TextInput
                  placeholder="Enter Your Vehicle Type"
                  style={styles.input}
                  placeholderTextColor="#bfbfbf"
                  value={textInputVehicleType}
                  onChangeText={(textInputVehicleType) =>
                    setTextInputVehicleType(textInputVehicleType)
                  }
                  mode="flat"
                  theme={{
                    colors: {
                      text: "white",
                    },
                  }}
                />
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "mobile" ? (
                <TextInput
                  placeholder="Enter Your Mobile Number Here"
                  style={styles.input}
                  value={textInputMobile}
                  placeholderTextColor="#bfbfbf"
                  onChangeText={(textInputMobile) =>
                    setTextInputMobile(textInputMobile)
                  }
                  mode="flat"
                  keyboardType="phone-pad"
                  theme={{
                    colors: {
                      text: "white",
                    },
                  }}
                />
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "address" ? (
                <TextInput
                  placeholder={"Enter Your Address Here"}
                  style={styles.input}
                  placeholderTextColor="#bfbfbf"
                  mode="flat"
                  keyboardType="default"
                  value={textInputAddress}
                  onChangeText={(value) => setTextInputAddress(value)}
                  numberOfLines={2}
                  theme={{
                    colors: {
                      text: "white",
                    },
                  }}
                />
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "car_number_seater" ? (
                <TextInput
                  placeholder={"Seater"}
                  value={textInputSeater}
                  onChangeText={(value) => setTextInputSeater(value)}
                  style={styles.input}
                  placeholderTextColor="#bfbfbf"
                  mode="flat"
                  maxLength={2}
                  keyboardType="numeric"
                  theme={{
                    colors: {
                      text: "white",
                    },
                  }}
                />
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "days" ? (
                <TextInput
                  placeholder={"Days"}
                  value={textInputDays}
                  onChangeText={(value) => setTextInputDays(value)}
                  style={styles.input}
                  placeholderTextColor="#bfbfbf"
                  mode="flat"
                  maxLength={2}
                  keyboardType="numeric"
                  theme={{
                    colors: {
                      text: "white",
                    },
                  }}
                />
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "aadhar_link" ? (
                <View>
                  <View style={{ paddingBottom: 20 }}>
                    <Text style={[styles.checkbox, { paddingBottom: 5 }]}>
                      Aadhar Card Linked With Mobile Number
                    </Text>
                    <FormRadioButton
                      value={"yes"}
                      onPress={() => setChecked("yes")}
                      label={"Yes"}
                      checked={checked}
                      styles={styles}
                      status={checked === "yes" ? "checked" : "unchecked"}
                    />
                    <FormRadioButton
                      value={"no"}
                      onPress={() => setChecked("no")}
                      label={"No"}
                      checked={checked}
                      styles={styles}
                      status={checked === "no" ? "checked" : "unchecked"}
                    />
                  </View>
                  <View style={{ paddingBottom: 20 }}>
                    {checked == "yes" ? (
                      <View>
                        <Text style={{ color: "#fff", paddingBottom: 5 }}>
                          Upload Aadhar Card
                        </Text>
                        <TouchableOpacity>
                          <Button
                            icon="file-upload"
                            color={Colors.green500}
                            size={30}
                            onPress={pickAadharDocument}
                          >
                            Upload Your Aadhar Card
                          </Button>
                        </TouchableOpacity>
                        <View style={styles.filePadding}>
                          <Text style={styles.fileText}>
                            {aadhar ? aadhar.name : ""}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <View style={{ paddingBottom: 25 }}>
                          <CustomAddressProofForm
                            valueChange={(newValue) => setAddress(newValue)}
                            value={address}
                            styles={styles}
                            onPress={pickAddressDocument}
                          />
                          <View style={styles.filePadding}>
                            <Text style={styles.fileText}>
                              {addressDoc ? addressDoc.name : ""}
                            </Text>
                          </View>
                        </View>
                        <View style={{ paddingBottom: 25 }}>
                          <CustomAgeProofForm
                            valueChange={(newValue) => setAge(newValue)}
                            value={age}
                            styles={styles}
                            onPress={pickAgeDocument}
                          />
                          <View style={styles.filePadding}>
                            <Text style={styles.fileText}>
                              {ageDoc ? ageDoc.name : ""}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "old_insurance" ? (
                <View style={{ paddingBottom: 20 }}>
                  <Text style={{ color: "#fff", paddingBottom: 5 }}>
                    Upload Old Insurance
                  </Text>
                  <TouchableOpacity>
                    <Button
                      icon="file-upload"
                      color={Colors.green500}
                      size={30}
                      onPress={pickOldInsuranceDocument}
                    >
                      Upload Your Old Insurance
                    </Button>
                  </TouchableOpacity>
                  <View style={styles.filePadding}>
                    <Text style={styles.fileText}>
                      {oldInsurance ? oldInsurance.name : ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "rc_book" ? (
                <View style={{ paddingBottom: 20 }}>
                  <Text style={{ color: "#fff", paddingBottom: 5 }}>
                    Upload RC Book
                  </Text>
                  <TouchableOpacity>
                    <Button
                      icon="file-upload"
                      color={Colors.green500}
                      size={30}
                      onPress={pickRcDocument}
                    >
                      Upload Your RC Book
                    </Button>
                  </TouchableOpacity>
                  <View style={styles.filePadding}>
                    <Text style={styles.fileText}>{rc ? rc.name : ""}</Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "old_driving_license" ? (
                <View style={{ paddingBottom: 20 }}>
                  <Text style={{ color: "#fff", paddingBottom: 5 }}>
                    Upload Your Old License
                  </Text>
                  <TouchableOpacity>
                    <Button
                      icon="file-upload"
                      color={Colors.green500}
                      size={30}
                      onPress={pickOldDrivingDocument}
                    >
                      Upload Your Old License
                    </Button>
                  </TouchableOpacity>
                  <View style={styles.filePadding}>
                    <Text style={styles.fileText}>
                      {oldDrivingLicense ? oldDrivingLicense.name : ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "driving_license_2_wheeler" ? (
                <View style={{ paddingBottom: 20 }}>
                  <Text style={{ color: "#fff", paddingBottom: 5 }}>
                    Upload Your 2 Wheeler License
                  </Text>
                  <TouchableOpacity>
                    <Button
                      icon="file-upload"
                      color={Colors.green500}
                      size={30}
                      onPress={pickTwoDrivingDocument}
                    >
                      Upload Your 2 Wheeler License
                    </Button>
                  </TouchableOpacity>
                  <View style={styles.filePadding}>
                    <Text style={styles.fileText}>
                      {drivingLicenseTwo ? drivingLicenseTwo.name : ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "driving_license_4_wheeler" ? (
                <View style={{ paddingBottom: 20 }}>
                  <Text style={{ color: "#fff", paddingBottom: 5 }}>
                    Upload Your 4 Wheeler License
                  </Text>
                  <TouchableOpacity>
                    <Button
                      icon="file-upload"
                      color={Colors.green500}
                      size={30}
                      onPress={pickFourDrivingDocument}
                    >
                      Upload Your 4 Wheeler License
                    </Button>
                  </TouchableOpacity>
                  <View style={styles.filePadding}>
                    <Text style={styles.fileText}>
                      {drivingLicenseFour ? drivingLicenseFour.name : ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "learning_license_2_wheeler" ? (
                <View style={{ paddingBottom: 20 }}>
                  <Text style={{ color: "#fff", paddingBottom: 5 }}>
                    Upload Your Learning License
                  </Text>
                  <TouchableOpacity>
                    <Button
                      icon="file-upload"
                      color={Colors.green500}
                      size={30}
                      onPress={pickTwoLearningDocument}
                    >
                      Upload Your Learning License
                    </Button>
                  </TouchableOpacity>
                  <View style={styles.filePadding}>
                    <Text style={styles.fileText}>
                      {learningLicenseTwo ? learningLicenseTwo.name : ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
              {serviceForm.form_name == "learning_license_4_wheeler" ? (
                <View style={{ paddingBottom: 20 }}>
                  <Text style={{ color: "#fff", paddingBottom: 5 }}>
                    Upload Your Learning License
                  </Text>
                  <TouchableOpacity>
                    <Button
                      icon="file-upload"
                      color={Colors.green500}
                      size={30}
                      onPress={pickFourLearningDocument}
                    >
                      Upload Your Learning License
                    </Button>
                  </TouchableOpacity>
                  <View style={styles.filePadding}>
                    <Text style={styles.fileText}>
                      {learningLicenseFour ? learningLicenseFour.name : ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
              {/* {serviceForm.form_name == "photo" ? (
                <View style={{ paddingBottom: 20 }}>
                  <Text style={{ color: "#fff", paddingBottom: 5 }}>
                    Upload Photo:
                  </Text>
                  <TouchableOpacity>
                    <Button
                      icon="file-upload"
                      color={Colors.green500}
                      size={30}
                      onPress={pickPhotoDocument}
                    >
                      Upload Your Passport Size Photo
                    </Button>
                  </TouchableOpacity>
                  <View style={styles.filePadding}>
                    <Text style={styles.fileText}>
                      {photo ? photo.name : ""}
                    </Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )} */}
            </View>
          );
        })}
        <Button mode="contained" onPress={checkInputField}>
          Submit
        </Button>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
      }}
    >
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  serviceImg: {
    width: Width,
    height: 200,
    resizeMode: "cover",
  },
  container: {
    width: Width,
    flex: 1,
    backgroundColor: "#20314d",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: StatusBar.currentHeight - 30,
    paddingBottom: StatusBar.currentHeight,
  },
  serviceDetails: {
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  serviceDetailTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    // textDecorationLine: "underline",
    textAlign: "center",
    textTransform: "uppercase",
  },
  serviceDetailDescription: {
    color: Colors.lightGreen500,
  },
  serviceDetailForm: {
    paddingTop: 20,
    // width: "100%",
    // flex: 1,
  },
  input: {
    marginVertical: 20,
    height: 40,
    width: Width - 100,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    backgroundColor: "transparent",
  },
  checkbox: {
    color: "#fff",
    backgroundColor: "transparent",
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  radioGroupItems: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  txtWhite: {
    color: "#ffffff",
  },
  filePadding: {
    paddingVertical: 5,
    // flexDirection: "row",
    justifyContent: "center",
  },
  fileText: {
    color: Colors.blue300,
    textAlign: "center",
  },
});
