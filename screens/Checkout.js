import { useEffect, useRef, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Heading from "../components/Heading"
import ProductCard from '../components/ProductCard'
import { CheckoutCardActions } from "../constants/enum"
import { CheckoutStyle as styles } from '../styles'


const Checkout = ({setTotalItemCount ,addToCard , setAddToCard}) => {
    const [subTottalFinal ,setSubtottalFinal] = useState(0)
    const subTottal = useRef(0)

    useEffect(()=>{
        setSubtottalFinal(subTottal.current)
    },[subTottal.current])
    const updataCard = (action , key) =>{
        console.log("LImiting-un")
        if(action == CheckoutCardActions.delete){
            setAddToCard ((prv) =>{
                setTotalItemCount(prvTotalCount => prvTotalCount - Number(prv[key].itemCount))
                delete  prv[key]
                return {...prv}
            })
            return
        }
        if(action == CheckoutCardActions.increment){
            setTotalItemCount(prv => prv + 1)
            setAddToCard((prv)=>{
                prv[key].itemCount = Number(prv[key].itemCount) + 1
                return {...prv} 
              })
            return
        }
        if(action == CheckoutCardActions.decrement){
            setTotalItemCount(prv => prv - 1)
            setAddToCard((prv)=>{
                prv[key].itemCount = Number(prv[key].itemCount) - 1
                return {...prv} 
              })
            return
        }


    }
    return (
        <View style={styles.checkoutContainer}>
            <View>
                <Heading title="Order Details" />
            </View>
            <View style={styles.cardContainer}>
            <ScrollView>
                {addToCard && Object.keys(addToCard).map(key => (<ProductCard updataCard={updataCard} subTottal={subTottal} key={key} cardsType="counter" item={addToCard[key]} />))}
            </ScrollView>
            </View>
            <View style={styles.placeOrder}>
                <View style={styles.placeOrderLine}>
                    <Text style={styles.textColor}>Sub Total</Text>
                    <Text style={styles.textColor}>{subTottalFinal} ৳</Text>
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