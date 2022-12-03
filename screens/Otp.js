import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { IconButton, NextButton } from "./../components/Buttons";
import { OtpInput } from "../components/TextInput";
import backButton from "../assets/icons/backOrange.png";


const Otp = ({code , setCode , confirmCode}) => {
  return (
    <View style={styles.container}>
      <View>
        <IconButton
          onPress={null}
          src={backButton}
          paddingX={25}
          paddingY={25}
          width={15}
          height={24}
        />
        <Text style={styles.largeText}>Enter 6 digit Verification code</Text>
        <Text style={styles.smallText}>
          Code send to +8801771551*** . This code will expired in 01:30
        </Text>
      </View>
      <OtpInput 
        code={code}
        setCode={setCode}
      />
      <NextButton onPress={confirmCode} title="Continue" />
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
    paddingHorizontal: 30,
    zIndex: 2,
  },
  smallText: {
    color: "white",
    fontSize: 15,
    marginVertical: 15,
  },
  largeText: {
    color: "white",
    fontSize: 30,
  },
});

export default Otp;
