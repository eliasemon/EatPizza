import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
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

const styles = StyleSheet.create({
    textGroup: {
        marginVertical: 10
    },
    primaryText: {
        color: '#fff',
        fontSize: 32
    },
    secondaryText: {
        color: '#fff',
        fontSize: 18,
        marginTop: 20
    },
    imagePreview: {
        alignItems: 'center'
    },
    saveButton: {
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%',
        backgroundColor: 'green',
        marginVertical: '20%',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10
    },
    saveButtonText: {
        fontSize: 22,
        color: '#fff'
    }
})

export default ConfirmUploadPhoto