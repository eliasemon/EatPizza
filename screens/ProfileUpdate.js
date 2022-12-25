import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import Heading from "../components/Heading"


const ProfileUpdate = () => {
    return (
        <View style={styles.checkoutContainer}>
            <View>
                <Heading title="Profile Update" />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="rgba(255,255,255,.8)" />
                <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="rgba(255,255,255,.8)" />
                <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="rgba(255,255,255,.8)" />
            </View>
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        marginVertical: 40
    },
    input: {
        backgroundColor: 'rgba(255,255,255,.15)',
        height: 70,
        marginVertical: 10,
        borderRadius: 15,
        paddingLeft: 20,
        fontSize: 18,
        color: '#fff',
    },
    saveButton: {
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%',
        backgroundColor: 'green',
        marginTop: '30%',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10
    },
    saveButtonText: {
        fontSize: 22,
        color: '#fff'
    }
})

export default ProfileUpdate