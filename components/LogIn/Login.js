import { useState, useRef, useEffect } from "react";
import { View, Image, StyleSheet, TextInput, Modal, Text , Alert} from "react-native";
import logo from "../../assets/images/logo.png";
import { NextButton } from "../Buttons";
import { auth, firebaseApp } from '../../config'
import { FirebaseRecaptchaVerifierModal } from "../../expo-firebase-recaptcha/src/index"
import Otp from "./Otp";
import { useNavigation } from '@react-navigation/native';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { LoginStyle as styles } from '../../styles'
import { getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise, setDataToCollection } from "../../utils/index"
import { stylesForAlert } from "../../styles/ProductDetails.style"
import { updateProfile } from "firebase/auth";


import Signup from "./Signup"
import { action, useStoreActions } from "easy-peasy";
import Background from "../Background";

const inputValidate = (state, type) => {
  if (state === "") {
    if (type === "code") {
      Alert.alert(
        "OTP Requiered",
        "You haven to provide valid OTP",
        [
          { text: "OK" }
        ],
        {
          cancelable: false,
          overlayStyle: stylesForAlert.overlay,
          alertContainerStyle: stylesForAlert.alertContainer,
          titleStyle: stylesForAlert.text,
          messageStyle: stylesForAlert.text,
          buttonStyle: stylesForAlert.buttonContainer,
          buttonTextStyle: stylesForAlert.buttonText,
        }
      );
    }

    if (type === "name") {
      Alert.alert(
        "Empty Field",
        "The Field is Requiered",
        [
          { text: "OK" }
        ],
        {
          cancelable: false,
          overlayStyle: stylesForAlert.overlay,
          alertContainerStyle: stylesForAlert.alertContainer,
          titleStyle: stylesForAlert.text,
          messageStyle: stylesForAlert.text,
          buttonStyle: stylesForAlert.buttonContainer,
          buttonTextStyle: stylesForAlert.buttonText,
        }
      );
    }
    return false;
  }


  if (type === "phoneNumber") {
    console.log(state)
    const length = state.length
    if (length === 13 && state.startsWith('88')) {
      return `+${state}`
    }
    if (state.startsWith('+88') && length === 14) {
      return state
    }

    if (state.startsWith('01') && length === 11) {
      return `+88${state}`
    }

    Alert.alert(
      "PhoneNumber isn't Validated",
      "You haven to provide valid phonNumber",
      [
        { text: "OK" }
      ],
      {
        cancelable: false,
        overlayStyle: stylesForAlert.overlay,
        alertContainerStyle: stylesForAlert.alertContainer,
        titleStyle: stylesForAlert.text,
        messageStyle: stylesForAlert.text,
        buttonStyle: stylesForAlert.buttonContainer,
        buttonTextStyle: stylesForAlert.buttonText,
      }
    );
    return false
  }



  return true

}

const Login = () => {
  const {LoadingChanger} = useStoreActions(action => action)

  const changeTheScreenHandle = () => {
    LoadingChanger({status : false , type : "LoginUI"})
  }


  const [inputView, setInputView] = useState("phoneUi")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [code, setCode] = useState('')
  const [verificationId, setVerificationId] = useState(null)
  const recaptchaVerification = useRef(null);
  const navigation = useNavigation();


  useEffect(()=>{
    if(auth.currentUser && auth.currentUser.displayName)
      changeTheScreenHandle();
    if(auth.currentUser && !auth.currentUser.displayName){
      setInputView("placingNameUi")
    }
  },[auth.currentUser])

  const sendVerfication = () => {
    const ValidatedPhoneNumber = inputValidate(phoneNumber, "phoneNumber")
    if (!ValidatedPhoneNumber) {
      setPhoneNumber("")
      return
    }
    (new PhoneAuthProvider(auth)).verifyPhoneNumber(ValidatedPhoneNumber, recaptchaVerification.current)
      .then(setVerificationId)
    setInputView("optUi")
  }

  // this functionalies created for dummy screen change
  const nameSubmitions = (fullName) => {
    console.log(auth.currentUser.user)
    if (!inputValidate(fullName, "name")) return;
    const data = {
      id : auth.currentUser.uid,
      uid : auth.currentUser.uid,
      isRestricted: false,
      phoneNumber:  auth.currentUser.phoneNumber,
      fullName : fullName,
      shopingCart : {},
      lastFiveOrdersID : [],
      shipingAddress : "",
      profileCreation : Date.now(),

    }
    setDataToCollection(data , "usersList" , false).then(()=>{
      updateProfile(auth.currentUser, {
        displayName:`${fullName}`, photoURL: undefined
      }).then(()=>{
        changeTheScreenHandle()
      }).catch((error) => {
        Alert.alert(
          "SomeThings Went Worng",
          "Please Try Again latter",
          [
            { text: "OK" }
          ],
          {
            cancelable: false,
            overlayStyle: stylesForAlert.overlay,
            alertContainerStyle: stylesForAlert.alertContainer,
            titleStyle: stylesForAlert.text,
            messageStyle: stylesForAlert.text,
            buttonStyle: stylesForAlert.buttonContainer,
            buttonTextStyle: stylesForAlert.buttonText,
          }
        );
        changeTheScreenHandle()
      });
    })
    
    

  }


  // getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise("Addons", "65xtKxCPzqAy2u9Z6")

  const confirmCode = async () => {
    if (!(inputValidate(code, "code"))) return;
    const credential = PhoneAuthProvider.credential(verificationId, code);
    await signInWithCredential(auth, credential).then((userInfo) => {
      if (userInfo._tokenResponse.isNewUser || !userInfo.user.displayName) {
        setInputView("placingNameUi")
      } else {
        changeTheScreenHandle()
      }
      setCode('')
    })
      .catch((err) => {
        Alert.alert(
          "OTP Requiered",
          "You haven to provide valid OTP",
          [
            { text: "OK" }
          ],
          {
            cancelable: false,
            overlayStyle: stylesForAlert.overlay,
            alertContainerStyle: stylesForAlert.alertContainer,
            titleStyle: stylesForAlert.text,
            messageStyle: stylesForAlert.text,
            buttonStyle: stylesForAlert.buttonContainer,
            buttonTextStyle: stylesForAlert.buttonText,
          }
        );
        console.log("Error" + err)
      })
  }

  const UiEnum = {
    phoneUi: (<View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <View>
        <Text> "+88" </Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          autoCompleteType='tel'
          placeholder="Phone Number"
          keyboardType="numeric"
          placeholderTextColor="#fff"
        />
      </View>


      <NextButton onPress={sendVerfication} title="Login" />
      <NextButton onPress={changeTheScreenHandle} title="Skip For Now" />
    </View>),
    optUi: (<Otp phoneNumber={phoneNumber} code={code} setCode={setCode} confirmCode={confirmCode} />),
    placingNameUi: (<Signup nameSubmitions={nameSubmitions} />)
  }



  return (
    <Modal
      animationType="fade"
      transparent={true}
      // onRequestClose={() => {
      //   navigation.goBack()
      // }}
      visible={true}
    >
      <View style={styles.container}>
        <Background />
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerification}
          firebaseConfig={firebaseApp.options}
        // appVerificationDisabledForTesting={true}
        />
        {UiEnum[inputView]}
      </View>
    </Modal>
  );
};



export default Login;
