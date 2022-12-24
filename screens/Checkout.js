import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import Heading from "../components/Heading"
import ProductCard from '../components/ProductCard'

const itemList = [
    {
        id: 0,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 1,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 2,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 3,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 4,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 5,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 6,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 7,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
]


const Checkout = () => {

    return (
        <View style={styles.checkoutContainer}>
            <View>
                <Heading title="Order Details" />
            </View>
            <View style={styles.cardContainer}>
                <FlatList data={itemList} renderItem={
                    ({ item }) => (<ProductCard checkoutButton title={item.title} category={item.category} price={item.price} />)
                } keyExtractor={item => item.id} />
            </View>
            <View style={styles.placeOrder}>
                <View style={styles.placeOrderLine}>
                    <Text style={styles.textColor}>Sub Total</Text>
                    <Text style={styles.textColor}>120 ৳</Text>
                </View>
                <View style={styles.placeOrderLine}>
                    <Text style={styles.textColor}>Delivery Charge</Text>
                    <Text style={styles.textColor}>10 ৳</Text>
                </View>
                <View style={styles.placeOrderLine}>
                    <Text style={styles.totalPrice}>Total</Text>
                    <Text style={styles.totalPrice}>130 ৳</Text>
                </View>
                <TouchableOpacity style={styles.placeOrderButton}>
                    <Text style={styles.placeOrderButtonText}>Place My Order</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
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

export default Checkout