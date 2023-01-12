import { View, Text } from 'react-native'
import Heading from '../components/Heading'
import { GlobalStyle, ProfileStyle as styles } from '../styles';

const ContactUs = ({ navigation }) => {
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
                }}>Your Address Here</Text>
            </View>
        </View>
    )
}


export default ContactUs