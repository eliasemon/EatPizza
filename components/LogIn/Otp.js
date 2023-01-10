import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { IconButton, NextButton } from "../Buttons";
import { OtpInput } from "../TextInput";
import backButton from "../../assets/icons/backOrange.png";
import { OtpStyle as styles } from "../../styles";


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


export default Otp;