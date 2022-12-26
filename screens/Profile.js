import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Heading from '../components/Heading'
import profile from '../assets/images/profile.png'
import { FontAwesome5 } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
    return (
        <View>
            <Heading navigation={navigation} title="Profile" />
            <View style={styles.profileSection}>
                <View style={styles.profileImage}>
                    <Image source={profile} />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileEmail}>anamsingho@gmail.com</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.icon}>
                        <FontAwesome5 name="pen" size={24} color="green" />
                    </View>
                    <Text style={styles.title}>Update your Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.icon}>
                        <FontAwesome5 name="list" size={24} color="green" />
                    </View>
                    <Text style={styles.title}>My Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.icon}>
                        <FontAwesome5 name="adjust" size={24} color="green" />
                    </View>
                    <Text style={styles.title}>Appearence</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.icon}>
                        <FontAwesome5 name="home" size={24} color="green" />
                    </View>
                    <Text style={styles.title}>Contact Us</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileSection: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    profileImage: {

    },
    profileInfo: {

    },
    profileName: {
        color: '#fff',
        fontSize: 28
    },
    profileEmail: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16
    },
    card: {
        width: '100%',
        height: 70,
        backgroundColor: '#282828',
        marginVertical: 10,
        borderRadius: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        marginHorizontal: 20
    },
    title: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 19
    }
})

export default Profile