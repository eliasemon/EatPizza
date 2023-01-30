import { useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity , BackHandler} from "react-native"
import { Button } from "../components/Buttons"
import { ThankYouStyle as styles } from "../styles"
import { getSingleDataWithOutRealTimeUpdates } from "../utils"

const UserRestrictions = ({navigation}) => {
    const [brandData, setBrandData] = useEffect("")

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
            <Text style={styles.primaryText}>You are a restricted user.Please Contact to</Text>
            <Text style={styles.primaryText}>{brandData?.ShopAddress}</Text>
            <Button onPress={() => navigation.navigate("Home", { activeID: {} })} style={styles.continueButton}>Go Home</Button>

        </View>
    )
}
//Mr. Murshed Vai , You have compleate it 

export default UserRestrictions