import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Heading from "../components/Heading"

import galaryIcon from '../assets/images/galaryIcon.png'
import cameraIcon from '../assets/images/cameraIcon.png'

const UploadPhoto = () => {
    return (
        <View>
            <Heading />
            <View style={styles.textGroup}>
                <Text style={styles.primaryText}>Upload Your Photo Profile</Text>
                <Text style={styles.secondaryText}>This data will be displayed in your account profile for security</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.sectionBlock}>
                    <Image source={galaryIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionBlock}>
                    <Image source={cameraIcon} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next</Text>
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
    sectionBlock: {
        height: 150,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButton: {
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%',
        backgroundColor: 'green',
        marginVertical: '10%',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10
    },
    nextButtonText: {
        fontSize: 22,
        color: '#fff'
    }
})

export default UploadPhoto