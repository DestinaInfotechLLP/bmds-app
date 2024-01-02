import { useState, useEffect, useMemo, useReducer } from "react";

import AuthContext from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthState = (props) => {
	const initialAuthState = {
		userId: null,
		name: null,
		userToken: null,
		isLoading: true,
	};

	const authReducer = (prevState, action) => {
		switch (action.type) {
			case "RETRIEVE_TOKEN":
				return {
					...prevState,
					userToken: action.token,
					isLoading: false,
				};
			case "SIGN_IN":
				return {
					...prevState,
					userId: action.id,
					name: action.name,
					userToken: action.token,
					isLoading: false,
				};
			case "SIGN_OUT":
				return {
					...prevState,
					userId: null,
					name: null,
					userToken: null,
					isLoading: false,
				};
			case "REGISTER":
				return {
					...prevState,
					userId: action.id,
					name: action.name,
					userToken: action.token,
					isLoading: false,
				};
		}
	};

	const [loginState, dispatch] = useReducer(authReducer, initialAuthState);

	const authContext = useMemo(
		() => ({
			signIn: async (user) => {
				const userId = String(user.id);
				const name = String(user.name);
				const userToken = String(user.token);
				const isLoading = false;

				try {
					await AsyncStorage.setItem("userToken", userToken);
				} catch (e) {
					console.log(e);
				}

				dispatch({
					type: "SIGN_IN",
					id: userId,
					token: userToken,
					name: name,
				});
			},
			signOut: async () => {
				const userId = null;
				const name = null;
				const userToken = null;
				const isLoading = false;
				try {
					await AsyncStorage.removeItem("userToken");
				} catch (e) {
					console.log(e);
				}
				dispatch({ type: "SIGN_OUT" });
			},
			signUp: async (user) => {
				const name = String(user.name);
				const userToken = String(user.token);
				const isLoading = false;

				try {
					await AsyncStorage.setItem("userToken", userToken);
				} catch (e) {
					console.log(e);
				}

				dispatch({
					type: "REGISTER",
					token: userToken,
					name: name,
				});
			},
		}),
		[]
	);

	useEffect(() => {
		setTimeout(async () => {
			let userToken;
			userToken = null;
			try {
				userToken = await AsyncStorage.getItem("userToken");
			} catch (e) {
				console.log(e);
			}
			dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
		}, 1000);
	}, []);

	return (
		<AuthContext.Provider value={{ authContext, loginState }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
