import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import thanksImage from '../assets/images/thanks.png'

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

const styles = StyleSheet.create({
    container: {
        marginVertical: '30%',
        alignItems: 'center'
    },
    primaryText: {
        marginVertical: 15,
        color: 'green',
        fontSize: 36
    },
    secondaryText: {
        color: '#fff',
        fontSize: 28
    },
    continueButton: {
        backgroundColor: 'green',
        marginTop: '30%',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10
    },
    continueButtonText: {
        fontSize: 18,
        color: '#fff'
    }
})

export default ThankYou