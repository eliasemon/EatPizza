import { Image, Text, TouchableOpacity, View } from "react-native"
import Heading from "../components/Heading"

import galaryIcon from '../assets/images/galaryIcon.png'
import cameraIcon from '../assets/images/cameraIcon.png'
import { UploadPhotoStyle as styles } from "../styles"

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

export default UploadPhoto