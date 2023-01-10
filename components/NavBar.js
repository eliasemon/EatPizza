import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity , Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useStoreState } from 'easy-peasy';
import { COLORS } from '../constants/theme'
// import { COLORS } from "../constants/colors";

const NavBar = () => {
    const totalItemCount = useStoreState((state) => state.totalItemCount)
    const navigation = useNavigation();

    return (
        <View style={styles.navigation}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate("Home")}>
                <FontAwesome name="home" size={28} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('Profile')}>
                <FontAwesome name="user" size={28} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('Checkout')}>
                <View style={{position : "relative"}}>
                    {totalItemCount > 0 && (<Text style={{ zIndex: 100, position: "absolute" , top: -5, right : 0 , color : "yellow" }}>
                    {totalItemCount}
                    </Text>)}
                    <FontAwesome name="shopping-cart" size={28} color={COLORS.primary} />
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
        height: 60,
        alignSelf: 'center',
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