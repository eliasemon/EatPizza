import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ConfirmUploadStyle as styles } from '../styles'
import Heading from "../components/Heading"

import demoPhoto from '../assets/images/demoPhoto.png'

const ConfirmUploadPhoto = () => {
    return (
        <View>
            <Heading />
            <View style={styles.textGroup}>
                <Text style={styles.primaryText}>Upload Your Photo Profile</Text>
                <Text style={styles.secondaryText}>This data will be displayed in your account profile for security</Text>
            </View>
            <View style={styles.imagePreview}>
                <Image source={demoPhoto} />
            </View>
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ConfirmUploadPhoto