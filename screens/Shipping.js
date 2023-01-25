import { View, Text, TextInput, TouchableOpacity, Alert , ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Heading from "../components/Heading";
import { GlobalStyle, ShippingStyle as styles } from "../styles";
import { auth, functions } from "../config";
import { getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise } from "../utils";
import { useEffect, useRef, useState } from "react";
import { useStoreActions } from "easy-peasy";
import { getFirestore , doc , updateDoc} from "firebase/firestore";
import { Button } from "../components/Buttons";
import { httpsCallable } from "firebase/functions";
import { COLORS } from '../constants/theme';

const Shipping = ({navigation}) => {
    const [loading , setLoading] = useState(false)
    const { addDataToCachesForOrder } = useStoreActions(action => action)
    const [shipingAddress , setShipingAddress] = useState("");
    const [shipingRefforUi, setShipingRefforUi] = useState(false);
    useEffect(()=>{
        getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise("usersList", auth.currentUser.uid).then((data) => {
            if(data.shipingAddress){
                setShipingAddress(data.shipingAddress)
                setShipingRefforUi(data.shipingAddress)
            }
        })  
    },[])
    const setShipingAddressToOrder = async () => {
        if (shipingAddress == "") {
            Alert.alert(
                "Shiping Address Missed",
                "Shiping Address Field Can't be empty",
                [
                    { text: "OK" }
                ],
            );
            return
        }
        setLoading(true)
        const setUsersShipingAddress = httpsCallable(functions , 'setUsersShipingAddress')

        try {
            setUsersShipingAddress({shipingAddress : shipingAddress }).then(()=>{
                addDataToCachesForOrder({type : "spread" , data : {shipingAddress : shipingAddress}})
                navigation.navigate("Payment")
                setLoading(false)
            })
 
        } catch (error) {
            setLoading(false)
            Alert.alert(
                "SomeThings Went Worng",
                "Take The step Again",
                [
                    { text: "OK" }
                ]
            );
        }
       
        
    }

    const continueWithPrv = () =>{
        addDataToCachesForOrder({type : "spread" , data : {shipingAddress : shipingAddress}})
        navigation.navigate("Payment")
    }
    return (
        <View>
            <Heading navigation={navigation} title="Shipping" />
            <View style={GlobalStyle.sidePadding}>
                {shipingRefforUi && (
                    <View style={styles.locationCard}>
                        <Text style={styles.locationCardTitle}>Previous Delivered Location</Text>
                        <View style={styles.locationDetails}>
                            <Ionicons name="location" size={36} color="yellow" />
                            <Text style={styles.locationCardValue}>{shipingRefforUi}</Text>
                        </View>

                        <Button style={{
                        backgroundColor: COLORS.primary,
                            width: 150,
                            paddingVertical: 12,
                            // paddingHorizontal: 30,
                        alignSelf: 'center',
                        borderRadius: 10
                    }} disabled={loading} onPress={continueWithPrv}>
                            {loading ? <ActivityIndicator color="#fff" /> : "Continue"}
                </Button>
                    </View>

                )}
                
                <View style={styles.locationCard}>
                    <Text style={styles.locationCardTitle}>Set New Address</Text>
                    <View style={styles.locationDetails}>
                        <Ionicons name="location" size={36} color="yellow" />
                        <TextInput  onChangeText={setShipingAddress}  style={styles.locationTextBox} placeholder="Put your address here" />
                    </View>

                    <Button style={{
                        marginTop: 10,
                        backgroundColor: COLORS.primary,
                        width: 150,
                        paddingVertical: 12,
                        // paddingHorizontal: 30,
                        alignSelf: 'center',
                        borderRadius: 10
                    }} disabled={loading} onPress={setShipingAddressToOrder}>
                        {loading ? <ActivityIndicator color="#fff" /> : "Set Location"}
                </Button>
                    {/* <TouchableOpacity  style={styles.setLocationButton}>
                        <Text style={styles.setLocationButtonText}>Set Location</Text>
                    </TouchableOpacity> */}
                </View>


            </View>
            
        </View>
    )
}

export default Shipping;
