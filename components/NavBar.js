import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const NavBar = () => {
    return (
        <View style={styles.navigation}>
            <TouchableOpacity>
                <FontAwesome name="home" size={36} color="green" />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="user" size={36} color="green" />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="shopping-cart" size={36} color="green" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navigation: {
        elevation: 10,
        backgroundColor: '#333333',
        width: '90%',
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