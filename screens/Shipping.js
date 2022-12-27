import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import Heading from "../components/Heading";

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

const styles = StyleSheet.create({
    locationCard: {
        width: '100%',
        height: 140,
        backgroundColor: '#282828',
        marginVertical: 10,
        borderRadius: 15,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    locationDetails: {
        flexDirection: 'row',
    },
    locationCardTitle: {
        color: 'rgba(255,255,255,0.7)',
        marginVertical: 10,
        fontSize: 17,
        marginLeft: 10,
    },
    locationCardValue: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 10
    },
    locationTextBox: {
        color: '#fff',
        width: '80%',
        marginLeft: '5%',
        paddingLeft: 15,
        fontSize: 15,
        backgroundColor: 'rgba(255,255,255,.2)',
        borderRadius: 5
    },
    setLocationButton: {
        marginVertical: 8,
        marginLeft: '17%',
    },
    setLocationButtonText: {
        color: 'green',
        fontSize: 18
    }
})

export default Shipping;
