import { View, Text, ActivityIndicator , Alert } from "react-native";
import { Button } from "../Buttons";
import { OtpInput } from "../TextInput";
import { OtpStyle as styles } from "../../styles";
import Heading from "../Heading";
import { GlobalStyle } from "../../styles";
import { useEffect, useRef, useState } from 'react';
import { COLORS } from "../../constants/theme";

const Otp = ({ loading, setInputView, changeTheScreenHandle, phoneNumber, code, setCode, confirmCode }) => {
  const [timer, setTimer] = useState(300)
  const [stopTimer, setStopTimer] = useState(false)
  const timerRef = useRef()
  useEffect(() => {
    if (stopTimer) return () => clearInterval(timerRef.current);

    if (timer <= 0) {
      Alert.alert(
        "TimeOut",
        "You did not provide any OTP",
        [
          { text: "OK" }
        ]
      );
      setInputView("phoneUi")
    } else {
      timerRef.current = setInterval(() => {
        setTimer( prv => (prv - 1))
      }, 1000)
    }

    return  () => clearInterval(timerRef.current)
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
      <Button style={{
        backgroundColor: COLORS.primary,
        width: 150,
        paddingVertical: 15,
        // paddingHorizontal: 80,
        alignSelf: 'center',
        borderRadius: 10
      }} disabled={loading} onPress={() => confirmCode(setStopTimer)}>
        {loading ? <ActivityIndicator color="#fff" /> : "Continue"}
      </Button>
    </View>
  );
};


export default Otp;
