import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import Heading from "../components/Heading";
import nogodLogo from '../assets/images/nogodLogo.png'
import codLogo from '../assets/images/codLogo.png'
import bkashLogo from '../assets/images/bkashLogo.png'
import { PaymentStyle as styles } from "../styles";

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

export default Payment;
