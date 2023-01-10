import { View, Text, Image, TouchableOpacity } from 'react-native'
import Heading from '../components/Heading'
import profile from '../assets/images/profile.png'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { GlobalStyle, ProfileStyle as styles } from '../styles';
import { auth } from '../config';
import {  useStoreActions} from 'easy-peasy';
import { useEffect , useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { COLORS } from '../constants/theme';

const Profile = ({ navigation }) => {
    const LoadingChanger = useStoreActions(action => action.LoadingChanger)
    const [froce, setForce] =  useState(true)
    console.log(JSON.stringify(auth.currentUser))
    // if(auth.currentUser.displayName == "") {
    //     return 
    // }
    
    useEffect(()=>{
        onAuthStateChanged(auth ,(user)=>{
            if(!user){
                LoadingChanger({status : true , type :  "LoginUI"})
            }
            setForce(prv => !prv)
        })
        // if(!auth.currentUser){
        //     LoadingChanger({status : true , type :  "LoginUI"})
        // }
    },[])

    if(auth.currentUser){

        return (
            <View>
            <Heading navigation={navigation} title="Profile" />
            <View style={styles.profileSection}>
                <View style={styles.profileImage}>
                    <Image source={profile} />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{auth.currentUser.displayName}</Text>
                    <Text style={styles.profileEmail}>{auth.currentUser.phoneNumber}</Text>
                </View>
            </View>
                <View style={GlobalStyle.sidePadding}>
                <TouchableOpacity onPress={()=> navigation.navigate("ProfileUpdate")} style={styles.card}>
                    <View style={styles.icon}>
                            <FontAwesome5 name="pen" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.title}>Update your Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.icon}>
                            <FontAwesome5 name="list" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.title}>My Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.icon}>
                            <FontAwesome5 name="adjust" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.title}>Appearence</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.icon}>
                            <FontAwesome5 name="home" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.title}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => auth.signOut()} style={styles.card}>
                    <View style={styles.icon}>
                            <MaterialCommunityIcons name="logout" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.title}>SignOut</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    }
    return (
        <TouchableOpacity onPress={() => LoadingChanger({status : true , type :  "LoginUI"})} style={styles.card}>
                    <View style={styles.icon}>
                        <AntDesign name="enter" size={24} color="green" />
                    </View>
                    <Text style={styles.title}>Press Here To Login</Text>
        </TouchableOpacity>
    )
}


export default Profile