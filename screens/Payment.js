import { View, TouchableOpacity, Image, ActivityIndicator , BackHandler , Alert } from "react-native"
import Heading from "../components/Heading";
import codLogo from '../assets/images/codLogo.png'
import { PaymentStyle as styles } from "../styles";
import { useStoreState , useStoreActions } from "easy-peasy";
import { httpsCallable , getFunctions } from "firebase/functions";
import {  getApp } from 'firebase/app';
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth"


const Payment = ({navigation}) => {
    const {clearShopingCard } = useStoreActions(action => action)
    const firebaseApp = getApp()
    const auth = getAuth()
    const functions = getFunctions(firebaseApp)

    
    const {cachesForOrder} = useStoreState(state => state)
    const [loading , setLoading] = useState(false)
    
    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress',() =>{
            if(loading){
                Alert.alert(
                    "In Data Processing State",
                    "Please Don't Terminate the app",
                    [
                      { text: "OK" }
                    ]
                  );
                return true
            }else{
                return false
            }
        });
       return () => BackHandler.removeEventListener('hardwareBackPress');
    },[loading])
    
    const placeOrder = async() =>{
        setLoading(true)
        const data = {...cachesForOrder}
        data.userID = auth.currentUser.uid
        data.userPhoneNumber = auth.currentUser.phoneNumber
        data.userName = auth.currentUser.displayName
        data.paymentType = "cashon"
        const createOrder = httpsCallable(functions , 'createOrder')
        try {
            console.log(JSON.stringify(data))
             await createOrder(data)
            .then(()=>{
                setLoading(false)
                navigation.navigate("ThankYou")
            }).catch(() => {
                Alert.alert(
                    "Order Failed !",
                    "The order has been failed. Please try again",
                    [
                        { text: "OK" }
                    ],
                );
            }).finally(()=>{
                clearShopingCard()
                setLoading(false)
            })
        } catch (error) {
            //here have do somethings for order creation failed ***************
            Alert.alert(
                "Order Failed !",
                "The order has been failed. Please try again",
                [
                    { text: "OK" }
                ],
            );
            setLoading(false)
            console.log(error)
        }
        
        
    }
    return (
        <View>
            <Heading loading ={loading} isHide ={true} navigation={navigation} title="Payment" />
            {/* <TouchableOpacity style={styles.card}>
                <Image source={bkashLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
                <Image source={nogodLogo} />
            </TouchableOpacity> */}

            <TouchableOpacity disabled = {loading} onPress={placeOrder} style={styles.card}>
            { loading ? <ActivityIndicator size="large" color="#fff" /> : <Image source={codLogo} /> } 
            </TouchableOpacity>
        </View>
    )
}

export default Payment;
