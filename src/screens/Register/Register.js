import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Text } from "react-native-paper";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import validator from "validator";

import emailValidator from "../../helper/emailValidator";
import usernameValidator from "../../helper/usernameValidator";
import passwordValidator from "../../helper/passwordValidator";
import nameValidator from "../../helper/nameValidator";
import mobileNumberValidator from "../../helper/mobileNumberValidator";
import confirmPasswordValidator from "../../helper/confirmPasswordValidator";
import { APP_URL } from "@env";
import axios from "axios";
import AuthContext from "../../context/Auth/AuthContext";
import AlertBox from "../../components/AlertBox";

export default function Register({ navigation, route }) {
  const [appLoading, setAppLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [name, setName] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [mobileNumber, setMobileNumber] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  const auth = useContext(AuthContext);
  const role = route.params.role;

  const onSignUpPressed = () => {
    console.log("onSignUpPressed");
    console.log("----" + role);
    setErrors("");
    setAppLoading(true);
    const nameError = nameValidator(name.value);
    const usernameError = usernameValidator(username.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const mobileNumberError = mobileNumberValidator(mobileNumber.value);
    const confirmPasswordError = confirmPasswordValidator(
      password.value,
      confirmPassword.value
    );
    if (
      usernameError ||
      emailError ||
      passwordError ||
      nameError ||
      mobileNumberError ||
      confirmPasswordError
    ) {
      setName({ ...name, error: nameError });
      setUsername({ ...username, error: usernameError });
      setMobileNumber({ ...mobileNumber, error: mobileNumberError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      setAppLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", name.value);
    data.append("username", username.value);
    data.append("email", email.value);
    data.append("mobile", mobileNumber.value);
    data.append("password", password.value);
    data.append("password_confirmation", confirmPassword.value);
    data.append("role", role);

    axios
      .post(`${APP_URL}/register`, data, {
        headers: {
          "content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        const user = response.data.data;
        auth.authContext.signUp(user);
        navigation.navigate("Profile");
      })
      .catch((error) => {
        if (!error.response.data.success) {
          const errorResponse = error.response.data.data;
          for (var key in errorResponse) {
            if (errorResponse.hasOwnProperty(key)) {
              setErrors([...errors, errorResponse[key]]);
            }
          }
        }
      });
    setAppLoading(false);
  };

  return (
    <ScrollView>
      <Background>
        {/* <BackButton goBack={navigation.goBack} /> */}
        <Logo />
        <Header>Create Account</Header>
        {errors ? (
          <View>
            {errors.map((error) => {
              return (
                <Text style={{ color: Colors.red500, fontWeight: "bold" }}>
                  {error}
                </Text>
              );
            })}
          </View>
        ) : (
          <></>
        )}
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(name) => setName({ value: name, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Username"
          returnKeyType="next"
          value={username.value}
          onChangeText={(username) =>
            setUsername({ value: username, error: "" })
          }
          error={!!username.error}
          errorText={username.error}
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(email) => setEmail({ value: email, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Mobile Number"
          returnKeyType="next"
          value={mobileNumber.value}
          onChangeText={(mobileNumber) =>
            setMobileNumber({ value: mobileNumber, error: "" })
          }
          error={!!mobileNumber.error}
          errorText={mobileNumber.error}
          textContentType="telephoneNumber"
          keyboardType="numeric"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(password) =>
            setPassword({ value: password, error: "" })
          }
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TextInput
          label="Confirm Password"
          returnKeyType="done"
          value={confirmPassword.value}
          onChangeText={(confirmPassword) =>
            setConfirmPassword({ value: confirmPassword, error: "" })
          }
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Sign Up
        </Button>
        <View style={styles.row}>
          <Text style={styles.txt}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Register")}>
            <Text style={[styles.link, styles.txt]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  txt: {
    fontSize: 18,
  },
});
