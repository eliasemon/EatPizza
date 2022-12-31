import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    checkoutContainer: {
        height: '100%',
        justifyContent: 'space-between'
    },
    cardContainer: {
        paddingVertical: 20,
        height: '60%'
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'green',
        borderRadius: 15
    },
    placeOrderLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textColor: {
        color: 'white'
    },
    totalPrice: {
        marginTop: 5,
        color: 'white',
        fontSize: 20
    },
    placeOrderButton: {
        margin: 10,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
    },
    placeOrderButtonText: {
        textAlign: 'center',
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold'
    }
})