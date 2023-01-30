import { View, Text, Image, TouchableOpacity } from 'react-native'
import Heading from '../components/Heading'
import avatar from '../assets/images/avatar.png'
import profile from '../assets/images/profile.png'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { GlobalStyle, ProfileStyle as styles } from '../styles';

import {  useStoreActions} from 'easy-peasy';
import { useEffect , useState } from 'react';
import { COLORS } from '../constants/theme';
import { onAuthStateChanged   , getAuth} from 'firebase/auth';


const Profile = ({ navigation }) => {
    const auth = getAuth();

    const LoadingChanger = useStoreActions(action => action.LoadingChanger)
    const [authenticated , setAuthenticated] = useState("")
    
    useEffect(()=>{
        onAuthStateChanged(auth ,(user)=>{
            if(!user){
                LoadingChanger({status : true , type :  "LoginUI"})
                setAuthenticated(false)
            }else{
                setAuthenticated(true)
            }
        })
    },[])

    if(authenticated){

        return (
            <View>
            <Heading navigation={navigation} title="Profile" />
            <View style={styles.profileSection}>
                <View style={styles.profileImage}>
                    <Image style={{
                                width: 120,
                                height: 120,
                                resizeMode: 'contain',
                                borderRadius: 100
                            }}
                            source={auth.currentUser.photoURL ? { uri: auth.currentUser.photoURL } : avatar} />
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
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileOrders")} style={styles.card}>
                    <View style={styles.icon}>
                            <FontAwesome5 name="list" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.title}>My Orders</Text>
                </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.card}>
                    <View style={styles.icon}>
                            <FontAwesome5 name="adjust" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.title}>Appearence</Text>
                </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => navigation.navigate("ContactUs")} style={styles.card}>
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
}


export default Profile