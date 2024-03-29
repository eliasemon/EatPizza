import { useEffect, useState } from 'react';
import { View, Text, Linking, Image, TouchableOpacity } from 'react-native'
import Heading from '../components/Heading'
import { GlobalStyle, ProfileStyle as styles } from '../styles';
import { getSingleDataWithOutRealTimeUpdates } from '../utils';
import logo from '../assets/images/logo.png'

const ContactUs = ({ navigation }) => {
    const [brandData, setBrandData] = useState("")
    const handlePress = () => {
        Linking.openURL('https://www.eliasemon.com');
      };

    useEffect(()=>{
        getSingleDataWithOutRealTimeUpdates("banner" , "banner1").then((data)=>{
            setBrandData(data);
        });
    },[])
    return (
        <View>
            <Heading navigation={navigation} title="Contact Us" />
            {/* <View style={styles.profileSection}>
                <View style={styles.profileImage}>
                    <Image source={profile} />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{auth.currentUser.displayName}</Text>
                    <Text style={styles.profileEmail}>{auth.currentUser.phoneNumber}</Text>
                </View>
            </View> */}

            <View style={[GlobalStyle.sidePadding, {
                height: '90%',
                alignItems: 'center',
                justifyContent: 'center'
            }]}>
                <Image source={logo} style={{ width: 120, height: 150, marginVertical: 50 }} />
                <View style={{ width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#fff', padding: 20 }}>

                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                    }}>Helpline : {brandData?.hotline}</Text>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                    }}>{brandData?.ShopAddress}</Text>
                </View>

                <TouchableOpacity onPress={handlePress} style={{ marginTop: 200 }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 14,
                        textAlign: 'center'
                    }}>Designed & Developed by</Text>
                    <Text style={{
                        color: '#fff',
                        fontSize: 14,
                        color: 'skyblue'
                    }}>Elias Emon, Tapu Mojumder & MH Murshed</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


export default ContactUs