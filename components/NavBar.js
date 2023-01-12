import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useStoreState } from 'easy-peasy';
import { COLORS } from '../constants/theme'
// import { COLORS } from "../constants/colors";

const NavBar = () => {
    const totalItemCount = useStoreState((state) => state.totalItemCount)
    const navigation = useNavigation();

    const [activeButton, setActiveButton] = useState(0)

    const navButtonList = [
        {
            id: 0,
            icon: 'home',
            link: "Home",
        },
        {
            id: 1,
            icon: 'user',
            link: "Profile",
        },
        {
            id: 2,
            icon: 'shopping-cart',
            link: "Checkout",
            children: <View style={{ position: "relative" }}>
                {totalItemCount > 0 && (
                    <Text style={{ zIndex: 100, position: "absolute", top: -5, lef: 0, backgroundColor: 'red', paddingVertical: 1.5, paddingHorizontal: 5, borderRadius: 50, color: "white", fontSize: 12 }}>
                        {totalItemCount}
                    </Text>
                )}
            </View >,
        },
    ]

    return (
        <View style={styles.navigation}>
            {navButtonList.map((item) => <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => { navigation.navigate(item.link); setActiveButton(item.id) }} key={item.id} >
                {activeButton == item.id ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 255, 0, 0.1)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
                        <View>
                            {item.children && item.children}
                            < FontAwesome name={item.icon} size={28} color={COLORS.primary} />
                        </View>
                        <Text style={{ marginLeft: '10%', color: '#fff' }}>{item.link}</Text>
                    </View>
                    :
                    <>
                        {item.children && item.children}
                        < FontAwesome name={item.icon} size={28} color={COLORS.primary} />
                    </>
                }
            </TouchableOpacity>)}
        </View>
    );
}

const styles = StyleSheet.create({
    navigation: {
        elevation: 1,
        backgroundColor: '#333333',
        width: '100%',
        height: '8%',
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