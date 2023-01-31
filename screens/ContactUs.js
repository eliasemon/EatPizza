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
            console.log(data);
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
                height: '80%',
                alignItems: 'center',
                justifyContent: 'center'
            }]}>
                <Image source={logo} style={{ width: 120, height: 150, marginVertical: 50 }} />
                <View style={{ gap: 10, alignItems: 'center' }}>

                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                    }}>Helpline : 0167898765</Text>

                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                    }}>Helpline : 0167898766</Text>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                    }}> 69, 71 New Elephant Rd, Dhaka 1205</Text>
                </View>

                <Text style={{
                    color: '#fff',
                    fontSize: 20,
                }}>{brandData?.ShopAddress}</Text>


                <TouchableOpacity onPress={handlePress}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                        color: 'skyblue'
                    }}>App develop by Elias Emon</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


export default ContactUs