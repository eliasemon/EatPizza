import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

const Heading = ({ title }) => {
    return (
        <View style={styles.heading}>
            <TouchableOpacity style={styles.backButton}>
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