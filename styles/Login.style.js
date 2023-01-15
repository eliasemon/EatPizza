import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%",
        zIndex: 2,
    },
    image: {
        width: 162,
        height: 202,
        alignSelf: 'center'
    },
    input: {
        color: "white",
        backgroundColor: "#252525",
        width: "80%",
        alignSelf: 'center',
        borderRadius: 10,
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 20,
    },
});