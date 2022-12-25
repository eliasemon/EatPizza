import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


const NavBar = () => {
    const navigation = useNavigation();

    const handleNavButton = () => {
        console.log('Clicked');
    }

    return (
        <View style={styles.navigation}>
            <TouchableOpacity onPress={() => handleNavButton('Home')}>
                <FontAwesome name="home" size={36} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavButton('Notification')}>
                <FontAwesome name="user" size={36} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavButton('Home')}>
                <FontAwesome name="shopping-cart" size={36} color="green" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navigation: {
        elevation: 10,
        backgroundColor: '#333333',
        width: '100%',
        marginBottom: 5,
        height: 70,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderRadius: 15,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default NavBar