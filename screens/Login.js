import { useState } from "react";
import { View, Image, StyleSheet, TextInput } from "react-native";
import logo from "../assets/images/logo.png";
import { NextButton } from "./../components/Buttons";

const handlePress = (event) => {
  console.log("Logged in");
};

const handleChange = (event) => {
  console.log("changing");
};

const Login = () => {
  const [number, setNumber] = useState(null);
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <TextInput
        style={styles.input}
        onChangeText={handleChange}
        value={number}
        placeholder="Phone Number"
        keyboardType="numeric"
        placeholderTextColor="#fff"
      />
      <NextButton onPress={handlePress} title="Login" />
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
  input: {
    color: "white",
    backgroundColor: "#252525",
    width: "80%",
    borderRadius: 10,
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 20,
  },
});

export default Login;
