import { useState ,useRef } from "react";
import { View, Image, StyleSheet, TextInput } from "react-native";
import logo from "../assets/images/logo.png";
import { NextButton } from "./../components/Buttons";
import { auth , firebaseApp} from '../config'
import {FirebaseRecaptchaVerifierModal} from "../expo-firebase-recaptcha/src/index"
import Otp from "./Otp";
import { useNavigation } from '@react-navigation/native';
import {  PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const Login = ({ setIsLogged }) => {
  const [inputView , setInputView] = useState(true)
  const [phoneNumber,setPhoneNumber]=useState('')
  const [code,setCode]=useState('')
  const [verificationId,setVerificationId]=useState(null)
  const recaptchaVerification = useRef(null);
  const navigation = useNavigation();

  const sendVerfication =()=>{
    (new PhoneAuthProvider(auth)).verifyPhoneNumber(phoneNumber,recaptchaVerification.current)
        .then(setVerificationId)
        setPhoneNumber('')
        setInputView(false)
  }

  // this functionalies created for dummy screen change
  const dummyPageChange = () => {
    setIsLogged(true)
    navigation.navigate('Home')
  }

  const confirmCode = async ()=>{
    const credential = PhoneAuthProvider.credential(verificationId, code);
    await signInWithCredential(auth, credential).then(()=>{
        setCode('')
        console.log('success')
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  const otpUI = ( <Otp code={code} setCode={setCode} confirmCode={confirmCode}  />)
  const numberUi = (<View style={styles.container}>
    <Image source={logo} style={styles.image} />
    <TextInput
      style={styles.input}
      onChangeText={setPhoneNumber}
      value={phoneNumber}
      autoCompleteType='tel'
      placeholder="Phone Number"
      keyboardType="numeric"
      placeholderTextColor="#fff"
    />
    {/* <NextButton onPress={sendVerfication} title="Login" /> */}
    <NextButton onPress={dummyPageChange} title="Login" />
  </View>)


  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal 
        ref={recaptchaVerification}
        firebaseConfig={firebaseApp.options}
        // appVerificationDisabledForTesting={true}
      />
        {inputView ? numberUi : otpUI}
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
