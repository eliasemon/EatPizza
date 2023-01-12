import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Heading from "../components/Heading";
import { ShippingStyle as styles } from "../styles";
import { auth } from "../config";
import { getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise } from "../utils";
import { useEffect, useRef, useState } from "react";
import { useStoreActions } from "easy-peasy";
import { getFirestore , doc , updateDoc} from "firebase/firestore";

const Shipping = ({navigation}) => {
    const { addDataToCachesForOrder , clearShopingCard } = useStoreActions(action => action)
    const [shipingAddress , setShipingAddress] = useState("");
    const [shipingRefforUi, setShipingRefforUi] = useState(false);
    useEffect(()=>{
        getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise("usersList", auth.currentUser.phoneNumber).then((data) => {
            if(data.shipingAddress){
                setShipingAddress(data.shipingAddress)
                setShipingRefforUi(data.shipingAddress)
            }
            
        })  
    },[])
    const setShipingAddressToOrder = async () => {
        try {
            const db = getFirestore()
            const colRef = doc(db, "usersList", `${auth.currentUser.phoneNumber}`);
            await updateDoc( colRef ,{shipingAddress : shipingAddress })
 
        } catch (error) {
            console.log(error)
        }
        addDataToCachesForOrder({type : "spread" , data : {shipingAddress : shipingAddress}})
        // const updates = {}
        // updates['/usersList/' + auth.currentUser.uid + '/shipingAddress' ] = shipingAddress;
        navigation.navigate("Payment")
        
    }
    const continueWithPrv = () =>{
        addDataToCachesForOrder({type : "spread" , data : {shipingAddress : shipingAddress}})
        navigation.navigate("Payment")
    }
    return (
        <View>
            <Heading navigation={navigation} title="Shipping" />
            <View>
                {shipingRefforUi && (
                    <View style={styles.locationCard}>
                        <Text style={styles.locationCardTitle}>Previous Delivered Location</Text>
                        <View style={styles.locationDetails}>
                            <Ionicons name="location" size={36} color="yellow" />
                            <Text style={styles.locationCardValue}>{shipingRefforUi}</Text>
                        </View>
                    </View>

                )}
                
                <View style={styles.locationCard}>
                    <Text style={styles.locationCardTitle}>Set New Address</Text>
                    <View style={styles.locationDetails}>
                        <Ionicons name="location" size={36} color="yellow" />
                        <TextInput  onChangeText={setShipingAddress}  style={styles.locationTextBox} placeholder="Put your address here" />
                    </View>
                    <TouchableOpacity onPress={setShipingAddressToOrder}  style={styles.setLocationButton}>
                        <Text style={styles.setLocationButtonText}>Set Location</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {shipingRefforUi && (
                <TouchableOpacity onPress={continueWithPrv} style={styles.setLocationButton}>
                    <Text style={styles.setLocationButtonText}>Continue</Text>
                </TouchableOpacity>
            )}
            
        </View>
    )
}

export default Shipping;
