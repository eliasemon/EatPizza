import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import Heading from "../components/Heading";
import nogodLogo from '../assets/images/nogodLogo.png'
import codLogo from '../assets/images/codLogo.png'
import bkashLogo from '../assets/images/bkashLogo.png'

const Payment = (navigation) => {
    return (
        <View>
            <Heading navigation={navigation} title="Shipping" />
            <TouchableOpacity style={styles.card}>
                <Image source={bkashLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
                <Image source={nogodLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
                <Image source={codLogo} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 100,
        backgroundColor: '#282828',
        marginVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Payment;
