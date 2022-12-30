import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


const NavBar = ({setHomeHeader}) => {
    const navigation = useNavigation();

    const handlePressHome = () => {
        setHomeHeader(true)
        navigation.navigate("Home")
    }

    const handlePressProfile = () => {

    }

    const handlePressCart = () => {
        navigation.navigate('Checkout')
    }

    return (
        <View style={styles.navigation}>
            <TouchableOpacity onPress={handlePressHome}>
                <FontAwesome name="home" size={26} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <FontAwesome name="user" size={26} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
                <FontAwesome name="shopping-cart" size={26} color="green" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navigation: {
        elevation: 1,
        zIndex : 100,
        backgroundColor: '#333333',
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
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