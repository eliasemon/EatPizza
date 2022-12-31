import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import Heading from "../components/Heading";
import { ShippingStyle as styles } from "../styles";

const Shipping = (navigation) => {
    return (
        <View>
            <Heading navigation={navigation} title="Shipping" />
            <View>
                <View style={styles.locationCard}>
                    <Text style={styles.locationCardTitle}>Previous Delivered Location</Text>
                    <View style={styles.locationDetails}>
                        <Ionicons name="location" size={36} color="yellow" />
                        <Text style={styles.locationCardValue}>8502 Preston Rd. Inglewood, Maine 98380</Text>
                    </View>
                </View>
                <View style={styles.locationCard}>
                    <Text style={styles.locationCardTitle}>Set New Address</Text>
                    <View style={styles.locationDetails}>
                        <Ionicons name="location" size={36} color="yellow" />
                        <TextInput style={styles.locationTextBox} placeholder="Put your address here" />
                    </View>
                    <TouchableOpacity style={styles.setLocationButton}>
                        <Text style={styles.setLocationButtonText}>Set Location</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default Shipping;
