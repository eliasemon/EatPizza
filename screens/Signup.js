import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { NextButton } from "./../components/Buttons";
import InputText from "../components/TextInput";
import logo from "../assets/images/logo.png";

const handlePress = (event) => {
  console.log("Logged in");
};

const Signup = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <InputText />
      <NextButton onPress={handlePress} title="Continue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    zIndex: 2,
  },
  image: {
    width: 162,
    height: 202,
  },
});

export default Signup;
