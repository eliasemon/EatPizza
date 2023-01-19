import { View, TextInput, TouchableOpacity, Image } from "react-native"
import { Button } from "../components/Buttons"
import Heading from "../components/Heading"
import { GlobalStyle, ProfileUpdateStyle as styles } from "../styles"
import uploadIcon from '../assets/images/uploadIcon.png'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react';
import { auth, firebaseApp } from "../config"
import { getStorage, ref, uploadBytes , getDownloadURL} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore"
const ProfileUpdate = () => {
    const [selectedImage, setSelectedImage] = useState(auth.currentUser.photoURL)
    const [name , setName] = useState(auth.currentUser.displayName)
    const [loadingStatus , setLoadingStatus] = useState(false)
    console.log(setSelectedImage)
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
        setLoadingStatus(!loadingStatus)
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `profile/${auth.currentUser.phoneNumber}.jpeg`);
        const uploadTask = uploadBytes(storageRef , selectedImage , 'data_url');
        // uploadTask.then(v =>  getDownloadURL(v.ref).then((downloadURL)=>{

        //     return downloadURL
        //     // mainResolver({imageDownloadUrl : downloadURL , imgRef : `${fileRef}/${name}.jpeg` })
        // }).then((downloadURL)=>{
        //     updateProfile(auth.currentUser, {
        //         displayName:`${name}`, photoURL: downloadURL
        //       })
        //       return downloadURL
        // }).then(async (downloadURL)=>{
        //     const db = getFirestore()
        //     const colRef = doc(db, "usersList" , auth.currentUser.phoneNumber );
        //     await updateDoc( colRef ,{fullName :name , photoURL: downloadURL })
        // }).finally(()=>{
        //     setLoadingStatus(!loadingStatus)
        // }))

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
                    <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Full Name" placeholderTextColor="rgba(255,255,255,.8)" />
                    {/* <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="rgba(255,255,255,.8)" />
                    <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="rgba(255,255,255,.8)" /> */}
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