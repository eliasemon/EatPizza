import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import thanksImage from '../assets/images/thanks.png'
import { Button } from "../components/Buttons"
import { ThankYouStyle as styles } from "../styles"

const ThankYou = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image source={thanksImage} />
            <Text style={styles.primaryText}>Thank you!</Text>
            <Text style={styles.secondaryText}>Enjoy Your Meal</Text>
            <Button onPress={() => navigation.navigate("FilteredProduct", { activeID: {} })} style={styles.continueButton}>Continue Order</Button>
            {/* <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}></Text>
            </TouchableOpacity> */}
        </View>
    )
}


export default ThankYou