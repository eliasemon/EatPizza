import { useStoreActions, useStoreState } from "easy-peasy"
import { useEffect, useRef, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Heading from "../components/Heading"
import ProductCard from '../components/ProductCard'
import { CheckoutCardActions } from "../constants/enum"
import { CheckoutStyle as styles } from '../styles'


const Checkout = () => {
    const {UpdateCardItem} = useStoreActions(action => action)
    const {subTottal , shopingCard} = useStoreState(state => state)


    return (
        <View style={styles.checkoutContainer}>
            <View>
                <Heading title="Order Details" />
            </View>
            <View style={styles.cardContainer}>
            <ScrollView>
                {shopingCard && Object.keys(shopingCard).map(key => (<ProductCard UpdateCardItem={UpdateCardItem}  key={key} cardsType="counter" item={shopingCard[key]} />))}
            </ScrollView>
            </View>
            <View style={styles.placeOrder}>
                <View style={styles.placeOrderLine}>
                    <Text style={styles.textColor}>Sub Total</Text>
                    <Text style={styles.textColor}>{subTottal} ৳</Text>
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