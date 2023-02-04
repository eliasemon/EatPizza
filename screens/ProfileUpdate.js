import { View, TextInput, TouchableOpacity, Image, ActivityIndicator, ToastAndroid , BackHandler , Alert } from "react-native"
import { Button } from "../components/Buttons"
import Heading from "../components/Heading"
import { GlobalStyle, ProfileUpdateStyle as styles } from "../styles"
import uploadIcon from '../assets/images/uploadIcon.png'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { COLORS } from '../constants/theme';
import {  getApp } from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFunctions , httpsCallable } from 'firebase/functions';



const ProfileUpdate = ({ navigation }) => {
    const firebaseApp = getApp();
    const functions = getFunctions(firebaseApp);
    const auth = getAuth();


    const [selectedImage, setSelectedImage] = useState(auth.currentUser.photoURL ? { uri: auth.currentUser.photoURL } : "")

    // useEffect()
    const [name, setName] = useState(auth.currentUser.displayName)
    const [loading, setLoading] = useState(false)
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0,
            aspect: [1, 1],
            height: 50,
            width: 50,
            base64: true
        });

        if (!result.canceled && result.assets[0].type === 'image') {
            imageLink = result.assets[0].uri;
            setSelectedImage(result.assets[0])
        } else {
            alert('You did not select any image.');
        }
    };

    
    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress',() =>{
            if(loading){
                Alert.alert(
                    "In Data Processing State",
                    "Please Don't Terminate the app",
                    [
                      { text: "OK" }
                    ]
                  );
                return true
            }else{
                return false
            }
        });
       return () => BackHandler.removeEventListener('hardwareBackPress' , ()=>{});
    },[loading])



    const showToast = () => {
        ToastAndroid.show('Profile information updated', ToastAndroid.SHORT);
    };

    const handleOnPress = async () => {
        setLoading(true)
        const storage = getStorage(firebaseApp);
        const type = selectedImage.uri.split(".")
        const storageRef = ref(storage, `profile/${auth.currentUser.uid}.jpeg`);
        const response = await fetch(selectedImage.uri);
        const blob = await response.blob();
        try {
            await uploadBytes(storageRef, blob, { contentType: 'image/jpeg', }).then(v => getDownloadURL(v.ref).then(async (downloadURL) => {
                const updateUsersInformation = httpsCallable(functions, 'updateUsersInformation')
                await updateUsersInformation({ fullName: name, photoURL: downloadURL })
                await updateProfile(auth.currentUser, {
                    displayName: `${name}`, photoURL: downloadURL
                })
            }).catch((error) => {
                Alert.alert(
                    "Somethings went wrong",
                    "Please try again later",
                    [
                        { text: "OK" }
                    ]
                );
            }).finally(() => {
                showToast()
                setLoading(false)
                navigation.navigate("Home");
                navigation.navigate("Profile")
            }))
        } catch (error) {
            setLoading(false)
            Alert.alert(
                "Somethings went wrong",
                "Please try again later",
                [
                    { text: "OK" }
                ]
            );
        }



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
                    <TouchableOpacity disabled={loading} onPress={pickImageAsync} style={styles.sectionBlock}>
                        <Image
                            style={{
                                width: 150,
                                height: 150,
                                resizeMode: 'contain',
                                borderRadius: 100
                            }}
                            source={selectedImage ?
                                { uri: selectedImage.uri } :
                                uploadIcon
                            }
                        />
                    </TouchableOpacity>
                </View>
                
                <Button style={{
                    backgroundColor: COLORS.primary,
                    width: 150,
                    paddingVertical: 15,
                    // paddingHorizontal: 80,
                    alignSelf: 'center',
                    borderRadius: 10
                }} disabled={loading} onPress={handleOnPress}>
                    {loading ? <ActivityIndicator color="#fff" /> : "Save"}
                </Button>

            </View >
        </>
    )
}

export default ProfileUpdate