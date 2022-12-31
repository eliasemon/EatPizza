import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import thanksImage from '../assets/images/thanks.png'
import { ThankYouStyle as styles } from "../styles"

const ThankYou = () => {
    return (
        <View style={styles.container}>
            <Image source={thanksImage} />
            <Text style={styles.primaryText}>Thank you!</Text>
            <Text style={styles.secondaryText}>Enjoy Your Meal</Text>
            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue Order</Text>
            </TouchableOpacity>
        </View>
    )
}


export default ThankYou