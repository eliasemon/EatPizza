import { useEffect, useState } from 'react';
import { View, Text , Button, Linking  } from 'react-native'
import Heading from '../components/Heading'
import { GlobalStyle, ProfileStyle as styles } from '../styles';
import { getSingleDataWithOutRealTimeUpdates } from '../utils';

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
                height: '80%',
                alignItems: 'center',
                justifyContent: 'center'
            }]}>
                <Text style={{
                    color: '#fff',
                    fontSize: 20,
                }}></Text>

                <Text style={{
                    color: '#fff',
                    fontSize: 20,
                }}>{brandData?.ShopAddress}</Text>




                <Button
                    title="Get in Touch"
                    onPress={handlePress}
                />

            </View>
        </View>
    )
}


export default ContactUs