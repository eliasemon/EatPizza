import { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity , BackHandler} from "react-native"
import { Button } from "../components/Buttons"
import { getSingleDataWithOutRealTimeUpdates } from "../utils"
import { COLORS } from "../constants/theme"

const UserRestrictions = ({navigation}) => {
    const [brandData, setBrandData] = useState("")

    useEffect(()=>{
        getSingleDataWithOutRealTimeUpdates("banner" , "banner1").then((data)=>{
            setBrandData(data);
        });

        BackHandler.addEventListener('hardwareBackPress',() =>{
            navigation.navigate('Home');
            return true
        });
       return () => BackHandler.removeEventListener('hardwareBackPress');
    },[])


    return (
        <View style={styles.container}>
            <View style={styles.singleDiv}>
                <Text style={styles.primaryText}>You are </Text>
                <Text style={[styles.primaryText, { color: 'red' }]}>restricted</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.secondaryText}>Please Contact to</Text>
                <Text style={styles.secondaryText}>{brandData?.ShopAddress}</Text>
            </View>
            <Button onPress={() => navigation.navigate("Home", { activeID: {} })} style={styles.continueButton}>Go Home</Button>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    singleDiv: {
        flexDirection: 'row'
    },
    primaryText: {
        marginVertical: 15,
        color: '#fff',
        fontSize: 30
    },
    secondaryText: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center'
    },
    continueButton: {
        backgroundColor: COLORS.primary,
        marginTop: '20%',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10
    },
    continueButtonText: {
        fontSize: 16,
        color: '#fff'
    }
})
//Mr. Murshed Vai , You have compleate it 

export default UserRestrictions