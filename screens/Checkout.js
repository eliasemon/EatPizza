import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Heading from "../components/Heading"
import ProductCard from '../components/ProductCard'
import { styles } from '../styles/Checkout.style'

const Checkout = ({addToCard , setAddToCard}) => {
    const tottalCost = {subTottal : 0}


    return (
        <View style={styles.checkoutContainer}>
            <View>
                <Heading title="Order Details" />
            </View>
            <View style={styles.cardContainer}>
            <ScrollView>
                {addToCard && Object.keys(addToCard).map(key => (<ProductCard tottalCost={tottalCost} key={key} cardsType="counter" item={addToCard[key]} />))}
            </ScrollView>
            </View>
            <View style={styles.placeOrder}>
                <View style={styles.placeOrderLine}>
                    <Text style={styles.textColor}>Sub Total</Text>
                    <Text style={styles.textColor}>{tottalCost.subTottal} ৳</Text>
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


export default Checkout