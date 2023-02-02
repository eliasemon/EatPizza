import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { GlobalStyle } from "../styles"
import { StackActions } from '@react-navigation/native';

const Heading = ({isHide = true, loading  ,changeTheScreenHandle, title }) => {

    const navigation = useNavigation()

    const handleBackButton = () => {
        if (changeTheScreenHandle) {
            changeTheScreenHandle();
        } else {
            navigation.goBack()
        }
    }

    return (
        <View style={[styles.heading, GlobalStyle.sidePadding]}>
                <TouchableOpacity onPress={handleBackButton} style={styles.backButton} disabled={isHide && !loading}>
                    <FontAwesome name="angle-left" size={45} color="#fffdd0" />
                </TouchableOpacity>
            
            <Text style={styles.title}>{title}</Text>
        </View>
        // <View style={[styles.heading, GlobalStyle.sidePadding]}>
        //     {(isHide && !loading) && (
        //         <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
        //             <FontAwesome name="angle-left" size={45} color="#fffdd0" />
        //         </TouchableOpacity>
        //     ) }
            
        //     <Text style={styles.title}>{title}</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        color: "white",
        fontSize: 24,
        width: "100%",
        marginLeft: -45,
    },
    backButton: {
        zIndex: 10,
        height: 54,
        width: 54,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255, .12)",
    },
})

export default Heading