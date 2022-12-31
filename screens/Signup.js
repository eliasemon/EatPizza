import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { NextButton } from "./../components/Buttons";
import InputText from "../components/TextInput";
import logo from "../assets/images/logo.png";
import { SignupStyle as styles } from "../styles";

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


export default Signup;
