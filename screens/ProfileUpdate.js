import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { Button } from "../components/Buttons"
import Heading from "../components/Heading"
import { ProfileUpdateStyle as styles } from "../styles"


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
            <Button style={styles.saveButton}>Save</Button>
        </View >
    )
}

export default ProfileUpdate