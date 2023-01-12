import { View, TextInput, Image, TouchableOpacity } from "react-native"
import { Button } from "../components/Buttons"
import Heading from "../components/Heading"
import { GlobalStyle, ProfileUpdateStyle as styles } from "../styles"
import galaryIcon from '../assets/images/galaryIcon.png'

const ProfileUpdate = () => {
    return (
        <View style={styles.checkoutContainer}>
            <View>
                <Heading title="Profile Update" />
            </View>
            <View style={[GlobalStyle.sidePadding, styles.inputGroup]}>
                <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="rgba(255,255,255,.8)" />
                <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="rgba(255,255,255,.8)" />
                <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="rgba(255,255,255,.8)" />
                <TouchableOpacity style={styles.sectionBlock}>
                    <Image source={galaryIcon} />
                </TouchableOpacity>
            </View>
            <Button style={styles.saveButton}>Save</Button>
        </View >
    )
}

export default ProfileUpdate