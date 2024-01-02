import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { theme } from "../../core/theme";
import { Text, TextInput as Input } from "react-native-paper";
import usernameValidator from "../../helper/usernameValidator";
import axios from "axios";
import AuthContext from "../../context/Auth/AuthContext";
import { APP_URL } from "@env";
import AppLoader from "../../components/AppLoader";
import AlertBox from "../../components/AlertBox";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Login = ({ navigation, route }) => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const [appLoading, setAppLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye-off");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setShowPassword(!showPassword);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setShowPassword(!showPassword);
    }
  };

  const role = route.params.role;

  const onLoginPressed = async () => {
    setAppLoading(true);
    const usernameError = usernameValidator(username.value);
    const passwordError = password.value == "" ? "Enter Password" : "";
    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      setAppLoading(false);
      return;
    }

    const data = new FormData();
    data.append("login", username.value);
    data.append("password", password.value);

    await axios({
      method: "post",
      url: `${APP_URL}/login/${role}`,
      data: {
        login: username.value,
        password: password.value,
      },
      headers: {
        Accept: "Application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.data.success) {
          const user = response.data.data;
          console.log("------------" + JSON.stringify(response.data.data));
          auth.authContext.signIn(user);
          navigation.navigate("Profile");
        }
      })
      .catch((e) => {
        if (e.response) {
          console.log("------------" + JSON.stringify(e.response.data.data));
          if (e.response.data.data.error == "Unauthorised") {
            alert("Invalid Username or Password");
          } else {
            alert(" " + e.response.data.data);
          }
          //   AlertBox("Alert", e.response.data.data);
        }
      });
    setAppLoading(false);
  };
  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email/Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
      />
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry={showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={handlePasswordVisibility}
          style={{ marginLeft: "-10%" }}
        >
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.forgotPassword}>
				<TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
					<Text style={styles.forgot}>Forgot your password?</Text>
				</TouchableOpacity>
			</View> */}
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.txt}>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.replace("Register", { role: role })}
        >
          <Text style={[styles.link, styles.txt]}>Sign up</Text>
        </TouchableOpacity>
      </View>
      {appLoading ? <AppLoader /> : <Text></Text>}
    </Background>
  );
};

export default Login;

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  txt: {
    fontSize: 18,
  },
});
