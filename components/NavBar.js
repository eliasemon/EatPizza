import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity , Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useStoreState } from 'easy-peasy';

const NavBar = () => {
    const totalItemCount = useStoreState((state) => state.totalItemCount)
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
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <FontAwesome name="home" size={26} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <FontAwesome name="user" size={26} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
                <View style={{position : "relative"}}>
                    {totalItemCount > 0 && (<Text style={{ zIndex: 100, position: "absolute" , top: -5, right : 0 , color : "yellow" }}>
                    {totalItemCount}
                    </Text>)}
                    <FontAwesome name="shopping-cart" size={26} color="green" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navigation: {
        elevation: 1,
        backgroundColor: '#333333',
        width: '100%',
        height: 50,
        // position: 'absolute',
        // bottom: 0,
        alignSelf: 'center',
        // borderTopLeftRadius: 25,
        // borderTopRightRadius: 25,
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