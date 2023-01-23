import { View, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import Heading from "../components/Heading";
import codLogo from '../assets/images/codLogo.png'
import { PaymentStyle as styles } from "../styles";
import { useStoreState , useStoreActions } from "easy-peasy";
import { auth , functions } from "../config";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";


const Payment = ({navigation}) => {
    const {cachesForOrder} = useStoreState(state => state)
    const [loading , setLoading] = useState(false)
    const placeOrder = async() =>{
        setLoading(true)
        const data = {...cachesForOrder}
        data.userID = auth.currentUser.uid
        data.userPhoneNumber = auth.currentUser.phoneNumber
        data.userName = auth.currentUser.displayName
        data.paymentType = "cashon"
        const createOrder = httpsCallable(functions , 'createOrder')
        try {

             await createOrder(data)
            .then(()=>{
                setLoading(false)
                navigation.navigate("ThankYou")
            }).finally(()=>{
                
            }) 
        } catch (error) {

            setLoading(false)
            console.log(error)
        }
        
        
    }
    return (
        <View>
            <Heading navigation={navigation} title="Payment" />
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
