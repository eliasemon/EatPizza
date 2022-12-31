import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Heading from '../components/Heading'
import profile from '../assets/images/profile.png'
import { FontAwesome5 } from '@expo/vector-icons';
import { ProfileStyle as styles } from '../styles';

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


export default Profile