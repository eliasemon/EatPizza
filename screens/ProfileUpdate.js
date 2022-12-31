import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import Heading from "../components/Heading"
import { styles } from "../styles/ProfileUpdate.style"


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

export default ProfileUpdate