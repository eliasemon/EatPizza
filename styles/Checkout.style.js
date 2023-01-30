import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default StyleSheet.create({
    checkoutContainer: {
        height: '90%',
        justifyContent: 'space-between'

    },
    cardContainer: {
        paddingVertical: 20,
    },
    card: {
        width: '100%',
        height: 120,
        backgroundColor: '#252525',
        borderRadius: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    cardProduct: {
        flexDirection: 'row'
    },
    cardImage: {
        width: "30%",
        height: 80,
    },
    cardTextBox: {
        marginLeft: 20,
        justifyContent: 'space-between'
    },
    cardTextTitle: {
        fontSize: 20,
        color: '#fff'
    },
    cardTextCategory: {
        fontSize: 16,
        color: '#808080'
    },
    cardTextPrice: {
        fontSize: 18,
        color: 'rgba(21,190,119,1)'
    },
    placeOrder: {
        alignSelf: 'center',
        width: '95%',
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 15
    },
    placeOrderLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white',
        fontSize: 16
    },
    totalPrice: {
        marginTop: 5,
        color: 'white',
        fontSize: 20
    },
    placeOrderButton: {
        margin: 5,
        padding: 12,
        maxWidth: '50%',
        backgroundColor: 'white',
        borderRadius: 15,
        alignSelf: 'center'
    },
    placeOrderButtonText: {
        textAlign: 'center',
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        color: "white",
        backgroundColor: "#252525",
        flex: 1,
        alignSelf: 'center',
        borderRadius: 10,
        // height: 60,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 10
    },
})