import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Logo() {
  return (
    <View style={styles.imgContainer}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    // backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: 80,
    height: 80,
    // padding: 20,
    marginBottom: 8,
  },
});
