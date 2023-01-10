import { TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { COLORS } from "../constants/theme";
import { GlobalStyle } from "../styles";



const InputText = ({fullName , setFullName}) => {

  return (
    <TextInput
      style={styles.input}
      onChangeText={setFullName}
      value={fullName}
      placeholder="Enter your full name"
      keyboardType="default"
      placeholderTextColor="#848484"
    />
  );
};

export const OtpInput = ({code , setCode}) => {
  return (
    <TextInput
      style={styles.otpinput}
      onChangeText={setCode}
      value={code}
      placeholder="______"
      keyboardType="numeric"
      placeholderTextColor="#848484"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    color: "white",
    backgroundColor: "#252525",
    width: "80%",
    borderRadius: 10,
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 20,
    fontSize: 16,
  },
  otpinput: {
    color: "#fff",
    backgroundColor: "#252525",
    marginHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    fontSize: 50,
    textAlign: "center",
    letterSpacing: 15,
    marginTop: 15,
    marginBottom: 80
  },
});

export default InputText;
