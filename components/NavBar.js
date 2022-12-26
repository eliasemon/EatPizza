import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


const NavBar = () => {
    const navigation = useNavigation();

    const handlePressHome = () => {

    }

    const handlePressProfile = () => {

    }

    const handlePressCart = () => {
        navigation.navigate('Checkout')
    }

    return (
        <View style={styles.navigation}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome name="home" size={36} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <FontAwesome name="user" size={36} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
                <FontAwesome name="shopping-cart" size={36} color="green" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navigation: {
        elevation: 1,
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
    },
    button: {
        flex: 1
    }
})

export default NavBar