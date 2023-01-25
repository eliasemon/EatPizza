import { useState, useRef, useEffect } from "react";
import { View, Image, TouchableOpacity, TextInput, Modal, Text, Alert, ActivityIndicator } from "react-native";
import logo from "../../assets/images/logo.png";
import { Button } from "../Buttons";
import { FirebaseRecaptchaVerifierModal } from "../../expo-firebase-recaptcha/src/index"
import Otp from "./Otp";
import { LoginStyle as styles } from '../../styles'
import { getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise, setDataToCollection } from "../../utils/index"
import { stylesForAlert } from "../../styles/ProductDetails.style"
import { COLORS } from "../../constants/theme";
import {  getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential , updateProfile } from 'firebase/auth';
import { getFunctions , httpsCallable } from 'firebase/functions';



import Signup from "./Signup"
import { useStoreActions } from "easy-peasy";
import Background from "../Background";

const inputValidate = (state, type) => {
  if (state === "") {
    if (type === "code") {
      Alert.alert(
        "OTP Requiered",
        "You haven to provide valid OTP",
        [
          { text: "OK" }
        ]
      );
    }

    if (type === "name") {
      Alert.alert(
        "Empty Field",
        "The Field is Requiered",
        [
          { text: "OK" }
        ]
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
      ]
    );
    return false
  }



  return true

}

const Login = () => {
  const firebaseApp = getApp();
  const functions = getFunctions(firebaseApp);
  const auth = getAuth();



  const { LoadingChanger } = useStoreActions(action => action)

  const changeTheScreenHandle = () => {
    LoadingChanger({ status: false, type: "LoginUI" })
  }


  const [inputView, setInputView] = useState("phoneUi")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [code, setCode] = useState('')
  const [verificationId, setVerificationId] = useState(null)
  const recaptchaVerification = useRef(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.displayName)
      changeTheScreenHandle();
    if (auth.currentUser && !auth.currentUser.displayName) {
      setInputView("placingNameUi")
    }
  }, [auth.currentUser])

  const sendVerfication = () => {
    setLoading(true)
    const ValidatedPhoneNumber = inputValidate(phoneNumber, "phoneNumber")
    if (!ValidatedPhoneNumber) {
      setPhoneNumber("")
      setLoading(false)
      return
    }
    (new PhoneAuthProvider(auth)).verifyPhoneNumber(ValidatedPhoneNumber, recaptchaVerification.current)
      .then(setVerificationId).then(() => {
        setInputView("optUi")
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
  }

  // this functionalies created for dummy screen change
  const nameSubmitions = (fullName) => {
    setLoading(true)
    if (!inputValidate(fullName, "name")) {
      setLoading(false)
      return;
    }
    const data = {
      id: auth.currentUser.uid,
      uid: auth.currentUser.uid,
      isRestricted: false,
      phoneNumber: auth.currentUser.phoneNumber,
      fullName: fullName,
      shipingAddress: "",
      profileCreation: Date.now(),
    }

    const setUsersInfoInDatabase = httpsCallable(functions, 'setUsersInfoInDatabase')




    setUsersInfoInDatabase(data).then(() => {
      updateProfile(auth.currentUser, {
        displayName: `${fullName}`, photoURL: undefined
      }).then(() => {
        changeTheScreenHandle()
        setLoading(false)
      }).catch((error) => {
        Alert.alert(
          "SomeThings Went Worng",
          "Please Try Again latter",
          [
            { text: "OK" }
          ]
        );
        setLoading(false)
        changeTheScreenHandle()
      });
    })



  }


  const confirmCode = async (setStopTimer) => {
    if (!(inputValidate(code, "code"))) return;
    setLoading(true)
    const credential = PhoneAuthProvider.credential(verificationId, code);
    await signInWithCredential(auth, credential).then((userInfo) => {
      if (userInfo._tokenResponse.isNewUser || !userInfo.user.displayName) {
        setInputView("placingNameUi")
      } else {
        changeTheScreenHandle()
      }
      setCode('')
    }).then(() => {
      setStopTimer(true)
      setLoading(false)
    })
      .catch((err) => {
        Alert.alert(
          "OTP Requiered",
          "You haven to provide valid OTP",
          [
            { text: "OK" }
          ]
        );
        setLoading(false)
      })

  }

  const UiEnum = {
    phoneUi: (<View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <View>
        {/* <Text> "+88" </Text> */}
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

      <View >

        <Button style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 15,
          paddingHorizontal: 80,
          alignSelf: 'center',
          borderRadius: 10
        }} disabled={loading} onPress={sendVerfication}>
          {loading ? <ActivityIndicator /> : "LOGIN"}
        </Button>

        <View style={{ height: 20 }} />
        {!loading && (
          <TouchableOpacity onPress={changeTheScreenHandle} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Skip for now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>),
    optUi: (<Otp setInputView={setInputView} loading={loading} changeTheScreenHandle={changeTheScreenHandle} phoneNumber={phoneNumber} code={code} setCode={setCode} confirmCode={confirmCode} />),
    placingNameUi: (<Signup loading={loading} nameSubmitions={nameSubmitions} />)
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
