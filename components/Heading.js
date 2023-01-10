import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { GlobalStyle } from "../styles"

const Heading = ({ title }) => {

    const navigation = useNavigation()

    const handleBackButton = () => {
        navigation.goBack()

    }

    return (
        <View style={[styles.heading, GlobalStyle.sidePadding]}>
            <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
                <FontAwesome name="angle-left" size={45} color="lightgreen" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    title: {
        color: "white",
        fontSize: 32,
        width: "70%",
        marginVertical: 10
    },
    backButton: {
        height: 54,
        width: 54,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255, .12)",
    },
})

export default Heading