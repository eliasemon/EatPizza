import { StyleSheet, View } from "react-native";
import Background from "./Background";


const BackgroundContainer = ({ children }) => {
    return (
        <View>
            <Background />
            <View style={styles.container}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingVertical: 30
    }
})

export default BackgroundContainer