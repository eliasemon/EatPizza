import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Heading from "../components/Heading";
import { GlobalStyle, ShippingStyle as styles } from "../styles";
import { auth } from "../config";
import { getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise } from "../utils";
import { useEffect, useRef, useState } from "react";
import { useStoreActions } from "easy-peasy";
import { getFirestore , doc , updateDoc} from "firebase/firestore";
import { Button } from "../components/Buttons";

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
        // if (shipingAddress == "") {
        //     Alert.alert(
        //         "Variant Selection Requiered",
        //         "You haven't select a variant .Please select a variant",
        //         [
        //             { text: "OK" }
        //         ],
        //         {
        //             cancelable: false,
        //             overlayStyle: stylesForAlert.overlay,
        //             alertContainerStyle: stylesForAlert.alertContainer,
        //             titleStyle: stylesForAlert.text,
        //             messageStyle: stylesForAlert.text,
        //             buttonStyle: stylesForAlert.buttonContainer,
        //             buttonTextStyle: stylesForAlert.buttonText,
        //         }
        //     );
        //     return
        // }
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
            <View style={GlobalStyle.sidePadding}>
                {shipingRefforUi && (
                    <View style={styles.locationCard}>
                        <Text style={styles.locationCardTitle}>Previous Delivered Location</Text>
                        <View style={styles.locationDetails}>
                            <Ionicons name="location" size={36} color="yellow" />
                            <Text style={styles.locationCardValue}>{shipingRefforUi}</Text>
                        </View>
                        <Button onPress={continueWithPrv} style={styles.setLocationButton}>
                            Continue
                        </Button>
                    </View>

                )}
                
                <View style={styles.locationCard}>
                    <Text style={styles.locationCardTitle}>Set New Address</Text>
                    <View style={styles.locationDetails}>
                        <Ionicons name="location" size={36} color="yellow" />
                        <TextInput  onChangeText={setShipingAddress}  style={styles.locationTextBox} placeholder="Put your address here" />
                    </View>
                    <Button onPress={setShipingAddressToOrder} style={styles.setLocationButton}>Set Location</Button>
                    {/* <TouchableOpacity  style={styles.setLocationButton}>
                        <Text style={styles.setLocationButtonText}>Set Location</Text>
                    </TouchableOpacity> */}
                </View>


            </View>
            
        </View>
    )
}

export default Shipping;
