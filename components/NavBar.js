import { FontAwesome } from "@expo/vector-icons";
import { useState , useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text  } from "react-native";
import { useNavigation  } from '@react-navigation/native';
import { useStoreState } from 'easy-peasy';``
import { COLORS } from '../constants/theme';


const uiActiveState = {
    Checkout : 2,
    ConfirmUploadPhoto : 1,
    ContactUs : 1,
    FilteredProduct : 0,
    Home : 0,
    Payment : 2,
    ProductDetailsScreen : 0,
    Profile : 1,
    ProfileOrders : 1,
    ProfileUpdate : 1,
    Shipping : 2 ,
    ThankYou : 0,
    UploadPhoto : 1,
    UserRestrictions: 1,
}



const NavBar = () => {
    const {totalItemCount , unexpectedBackHandle } = useStoreState((state) => state)
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState(0)




    useEffect(() => {
        navigation.addListener('state', ({ data }) => {
            const {state} = data;
            if(state){
                const currentRoute = state.routes[state.index]
                setActiveButton(uiActiveState[`${currentRoute.name}`])
            }
        });
      }, [navigation]);

    const navButtonList = [
        {
            id: 0,
            icon: 'home',
            link: "Home",
            name: "Home",
        },
        {
            id: 1,
            icon: 'user',
            link: "Profile",
            name: "Profile",
        },
        {
            id: 2,
            icon: 'shopping-cart',
            link: "Checkout",
            name: "Shoping",
            children: <View style={{ zIndex: 100, position: "absolute", top: -5, lef: 0, }}>
                {totalItemCount > 0 && (
                    <Text style={{  backgroundColor: 'red', paddingVertical: 1.5, paddingHorizontal: 5, borderRadius: 50, color: "white", fontSize: 12 }}>
                        {totalItemCount}
                    </Text>
                )}
            </View >,
        },
    ]

    return (
        <View style={styles.navigation}>
            {navButtonList.map((item) => <TouchableOpacity style={{ flex: 1, padding : 6, borderRadius : 15, alignItems: 'center', backgroundColor : (activeButton === item.id ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 0, 0, 0)') }} onPress={() => { navigation.navigate(item.link); setActiveButton(item.id) }} key={item.id} >
                {activeButton == item.id ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 255, 0, 0.1)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
                        <View style={{ position: "relative"}}>
                            {item.children && item.children}
                            < FontAwesome name={item.icon} size={28} color={COLORS.white} />
                        </View>
                        <Text style={{ marginLeft: '7%', color: '#fff' }}>{item.name}</Text>
                    </View>
                    :
                    <>
                        {item.children && item.children}
                        < FontAwesome name={item.icon} size={28} color={COLORS.white} />
                    </>
                }
            </TouchableOpacity>)}
        </View>
    );
}

const styles = StyleSheet.create({
    navigation: {
        // display : "none",
        backgroundColor: '#333333',
        height: '8%',
        alignSelf: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        paddingHorizontal : 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        flex: 1
    }
})

export default NavBar