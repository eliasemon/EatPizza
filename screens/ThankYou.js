import { useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity , BackHandler} from "react-native"
import thanksImage from '../assets/images/thanks.png'
import { Button } from "../components/Buttons"
import { ThankYouStyle as styles } from "../styles"

const ThankYou = ({navigation}) => {
    useEffect(()=>{
       const backHandle =  BackHandler.addEventListener('hardwareBackPress',() =>{
            navigation.navigate('Home');
            return true
        });
       return () => backHandle.remove();
    },[])


    return (
        <View style={styles.container}>
            <Image source={thanksImage} />
            <Text style={styles.primaryText}>Thank you!</Text>
            <Text style={styles.secondaryText}>Wating For Your Meal</Text>
            <Button onPress={() => navigation.navigate("Home", { activeID: {} })} style={styles.continueButton}>Go Home</Button>
            {/* <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}></Text>
            </TouchableOpacity> */}
        </View>
    )
}


export default ThankYou