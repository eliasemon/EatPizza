import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import Heading from "../components/Heading";
import nogodLogo from '../assets/images/nogodLogo.png'
import codLogo from '../assets/images/codLogo.png'
import bkashLogo from '../assets/images/bkashLogo.png'
import { PaymentStyle as styles } from "../styles";
import { useStoreState , useStoreActions } from "easy-peasy";
import { auth } from "../config";
import { getFirestore , doc , updateDoc} from "firebase/firestore";
import { useRef , useEffect} from "react";
import { getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise , setDataToCollection} from "../utils";
import { async } from "@firebase/util";


const Payment = ({navigation}) => {
    const { addDataToCachesForOrder , clearShopingCard } = useStoreActions(action => action)
    const {cachesForOrder} = useStoreState(state => state)
    const ordersNumber = useRef(0)
    useEffect(()=>{
        getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise("usersList", auth.currentUser.phoneNumber).then((data) => {
            if(data.ordersNumber){
                ordersNumber.current = Number(data.ordersNumber)
            }
            
        })  
    },[])
    const placeOrder = async() =>{
        const data = {...cachesForOrder}
        data.userID = auth.currentUser.uid
        data.userPhoneNumber = auth.currentUser.phoneNumber
        data.userName = auth.currentUser.displayName
        data.status = "pending"
        data.paymentType = "cashon"
        data.creationTime = Date.now()
        data.id = `orderId-${Number(ordersNumber.current) + 1}-${auth.currentUser.phoneNumber}`
        await setDataToCollection(data , "ordersList" , false)
        await setDataToCollection({id : data.id} , "unHandleOrdersIds" , false)
        try {
            const db = getFirestore()
            const colRef = doc(db, "usersList", `${auth.currentUser.phoneNumber}`);
            await updateDoc( colRef ,{ordersNumber : Number( ordersNumber.current)+1 })
 
        } catch (error) {
            console.log(error)
        }
        navigation.navigate("ThankYou")
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
            <TouchableOpacity onPress={placeOrder} style={styles.card}>
                <Image source={codLogo} />
            </TouchableOpacity>
        </View>
    )
}

export default Payment;
