import { View, Image, StyleSheet , Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useStoreState , useStoreActions } from "easy-peasy";
import Ready from "./Ready";
import Login from "../LogIn/Login";



const BootLoader = () => {
    const {bootloaderLoading , LoginUI} = useStoreState(state => state)
    const [firstAttemp , setFirstAttemp] = useState("")
    const addDataFromLocalStorage = useStoreActions(action => action.addDataFromLocalStorage)
    useEffect(()=>{
        (async () => {
            try {
              const shopingCardData = await AsyncStorage.getItem('shopingCardLocalStorage');
              if(shopingCardData != null){
                addDataFromLocalStorage(JSON.parse(shopingCardData))
              }

              const value = await AsyncStorage.getItem('firstAttemp');
              if (value == null) {
                setFirstAttemp(true)
                await AsyncStorage.setItem(
                    'firstAttemp',
                    'true',
                )
              }else{
                setFirstAttemp(false)
              }
            } catch (error) {
              setFirstAttemp(true)
            }
          })()
    },[])


if(bootloaderLoading || firstAttemp === "" ){
    return (
        <Modal
      animationType="fade"
      transparent={true}
      // onRequestClose={() => {
      //   navigation.goBack()
      // }}
      visible={true}
    >
        <Loading />
        
    </Modal>
    )
}

if(firstAttemp && bootloaderLoading){
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
            <Ready />
        </View>
        
    </Modal>
    )
}

if(LoginUI){
    return (
        <Login />
    )
}
//   return (
//     <></>
//     // <View style={{display : "none"}}>
//     // </View>
//   );
};



export default BootLoader;



const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    }
  })
  