import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    checkoutContainer: {
        height: '100%',
        backgroundColor: "#000"
        // justifyContent: 'space-between'
    },
    cardContainer: {
        paddingVertical: 20,
        height: '60%'
    },
    imageContainer: {
        width: '100%',
    },
    image: {
        width: '100%',
        height: 250
    },
    text: {
        color: '#fff',
        marginHorizontal: 10
    },
    title: {
        color: '#fff',
        fontSize: 28,
        marginVertical: 10
    },
    description: {
        color: '#fff'
    },
    buttonSet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonNumber: {
        color: '#ffff',
        fontSize: 25,
    },
    cart: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 30
    },
    addonList: {
        color: '#fff'
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        color: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 20
    }
})


export const stylesForAlert = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    alertContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    buttonContainer: {
        backgroundColor: 'red',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
});