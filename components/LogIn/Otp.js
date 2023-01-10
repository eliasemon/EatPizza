import { View, Text } from "react-native";
import { NextButton } from "../Buttons";
import { OtpInput } from "../TextInput";
import { OtpStyle as styles } from "../../styles";
import Heading from "../Heading";
import { GlobalStyle } from "../../styles";
import { useState } from 'react';
import { useEffect } from 'react';


const Otp = ({ changeTheScreenHandle, phoneNumber, code, setCode, confirmCode }) => {
  console.log('Calling');
  const [timer, setTimer] = useState(120)
  useEffect(() => {
    const timoutFunction = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1)
      } else {
        clearTimeout(timoutFunction)
        changeTheScreenHandle()
      }
    }, 1000)
  }, [timer])



  return (
    <View style={styles.container}>
      <Heading changeTheScreenHandle={changeTheScreenHandle} />
      <View style={[{ marginVertical: 15 }, GlobalStyle.sidePadding]}>
        <Text style={styles.largeText}>Enter 6 digit Verification code</Text>
        <Text style={styles.smallText}>
          Code send to +88{
            phoneNumber.slice(0, 7)
          }**** . This code will expired in 0{Math.floor(timer / 60)}:{timer % 60}
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
