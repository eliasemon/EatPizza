import { TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { COLORS } from "../constants/theme";

const handleChange = () => {
  console.log("Handling Text Changes");
};

const InputText = () => {
  const [name, setName] = useState(null);
  return (
    <TextInput
      style={styles.input}
      onChangeText={handleChange}
      value={name}
      placeholder="Enter your full name"
      keyboardType="default"
      placeholderTextColor={COLORS.white}
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
    width: "90%",
    borderRadius: 10,
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 20,
    fontSize: 50,
    textAlign: "center",
    letterSpacing: 15,
  },
});

export default InputText;
