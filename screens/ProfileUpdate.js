import { View, TextInput, TouchableOpacity } from "react-native"
import { Button } from "../components/Buttons"
import Heading from "../components/Heading"
import { GlobalStyle, ProfileUpdateStyle as styles } from "../styles"
import galaryIcon from '../assets/images/galaryIcon.png'
import cameraIcon from '../assets/images/cameraIcon.png'

import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';

const ProfileUpdate = () => {
    const [isPicked, setIsPicked] = useState(false);
    const [selectedImage, setSelectedImage] = useState('./../assets/images/galaryIcon.png')
    const imageLink = '';

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            imageLink = result.assets[0].uri;
            setSelectedImage(result.assets[0].uri)
        } else {
            alert('You did not select any image.');
        }
    };

    const handleOnPress = () => {
        // you have to read the result and send to the server
    }

    // let image = isPicked ? require('./../assets/images/galaryIcon.png') : require(imageLink)

    return (
        <View style={styles.checkoutContainer}>
            <View>
                <Heading title="Profile Update" />
            </View>
            <View style={[GlobalStyle.sidePadding, styles.inputGroup]}>
                <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="rgba(255,255,255,.8)" />
                <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="rgba(255,255,255,.8)" />
                <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="rgba(255,255,255,.8)" />
                <TouchableOpacity onPress={pickImageAsync} style={styles.sectionBlock}>
                    {/* <Image source={image} /> */}
                </TouchableOpacity>
            </View>
            <Button onPress={handleOnPress} style={styles.saveButton}>Save</Button>
        </View >
    )
}

export default ProfileUpdate