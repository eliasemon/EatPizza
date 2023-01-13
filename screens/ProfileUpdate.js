import { View, TextInput, TouchableOpacity, Image } from "react-native"
import { Button } from "../components/Buttons"
import Heading from "../components/Heading"
import { GlobalStyle, ProfileUpdateStyle as styles } from "../styles"
import uploadIcon from '../assets/images/uploadIcon.png'

import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';

const ProfileUpdate = () => {
    const [selectedImage, setSelectedImage] = useState(null)

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1]
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
        <>
            <View>
                <Heading title="Profile Update" />
            </View>
            <View>
                <View style={[GlobalStyle.sidePadding, styles.inputGroup]}>
                    <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="rgba(255,255,255,.8)" />
                    <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="rgba(255,255,255,.8)" />
                    <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="rgba(255,255,255,.8)" />
                    <TouchableOpacity onPress={pickImageAsync} style={styles.sectionBlock}>
                        <Image
                            style={{
                                width: 150,
                                height: 150,
                                resizeMode: 'contain',
                                borderRadius: 100
                            }}
                            source={selectedImage ?
                                { uri: selectedImage } :
                                uploadIcon
                            }
                        />
                    </TouchableOpacity>
                </View>
                <Button onPress={handleOnPress} style={styles.saveButton}>Save</Button>
            </View >
        </>
    )
}

export default ProfileUpdate