import { useStoreActions, useStoreState } from "easy-peasy"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useRef, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity , TextInput, Alert , Modal} from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { NextButton } from "../components/Buttons"
import Heading from "../components/Heading"
import ProductCard from '../components/ProductCard'
import { auth } from "../config"
import { CheckoutCardActions } from "../constants/enum"
import { CheckoutStyle as styles } from '../styles'
import { showDataWithOutPagination , getSingleDataWithOutRealTimeUpdates } from "../utils"
import { findTheResturentStatus } from "../utils/ResturentOpenCloseStatus"

// key: key,
//             id: item.id,
//             name: item.name,
//             image : item.image,
//             selectedVariant: selectedVariant,
//             selectedAddonsForCard: selectedAddonsForCard,
//             specialInstructions: specialInstructions,
//             itemCount: itemCount
//         }

const Checkout = ({navigation}) => {
    const {LoadingChanger , addDataToCachesForOrder , clearShopingCard , UpdateCardItem} = useStoreActions(action => action)
    const [resturentOpenClosedData , setResturentOpenClosedData] = useState("")
    const [openingStatus , setOpeningStatus] = useState("")
    const [froce, setForce] =  useState(true)
    const [promoCode , setPromoCode] = useState("")

    const {subTottal , shopingCard} = useStoreState(state => state)
    
    const [extraCostFirebaseData , setExtraCostFirebaseData] = useState(false);
    const [extraCostUI , setExtraCostUI] = useState("");
    const [discountAmmount , setDiscountAmmount] = useState(false)
    const [totalExtraCost , setTotalExtraCost] = useState(0)

    const disCheckRef = useRef(false)
    const TotalOrderAmmount = Number(subTottal) + Number(totalExtraCost) - Number(discountAmmount) 
    

    const storeTheOrderCaches = () =>{
        const data = {
            items : shopingCard,
            subTottal : subTottal,
            discountAmmount : discountAmmount,
            promoCode : promoCode,
            totalExtraCost : totalExtraCost,
            TotalOrderAmmount : TotalOrderAmmount

        }
        addDataToCachesForOrder({type : "Add" ,data : data })
        setDiscountAmmount(false)
        setPromoCode("")
        disCheckRef.current = false;
        clearShopingCard()
        navigation.navigate("Shipping")
    }


    useEffect(() => {
      showDataWithOutPagination(setExtraCostFirebaseData, "extraCost")
      showDataWithOutPagination(setResturentOpenClosedData, "ResturentOpeningHr")
      onAuthStateChanged(auth ,(user)=>{
            if(!user){
                LoadingChanger({status : true , type :  "LoginUI"})
            }
            setForce(prv => !prv)
        })
    }, []);


    useEffect(() => {
      if(resturentOpenClosedData.length > 0)
      setOpeningStatus(findTheResturentStatus(resturentOpenClosedData[0].data()))
    }, [resturentOpenClosedData]);

    // useEffect(()=>{
        
    // },[])

    const promocodeCheck = () =>{
        getSingleDataWithOutRealTimeUpdates("promoCode" , promoCode ).then((data)=>{
            const timeStampInMsForPromo = Date.parse(data.validity)
            if(timeStampInMsForPromo < Date.now()){
                setDiscountAmmount(false)
                setPromoCode("")
                disCheckRef.current = false;
                Alert.alert(
                    "Validation Error",
                    "The Validation of Promotion is over",
                    [
                        { text: "OK" }
                    ],
                );
                return
            }
            if(Number(data.conditionAmmount) > subTottal){
                setDiscountAmmount(false)
                disCheckRef.current = false;
                setPromoCode("")
                Alert.alert(
                    "PromoCode Not Applicable",
                    `You Have to order more than ${Number(data.conditionAmmount)}`,
                    [
                        { text: "OK" }
                    ],
                );
                return
            }

            disCheckRef.current = true;
            if(data.discountType === "%"){
                const ammount = (subTottal / 100 ) * Number(data.discountValue)
                setDiscountAmmount(ammount)
                return
            }
            setDiscountAmmount(Number(data.discountValue))
        }).catch((error) =>{
            setDiscountAmmount(false)
            disCheckRef.current = false;
            setPromoCode("")
            Alert.alert(
                "PromoCode isn't Valid",
                `Please Enter the Valid PromoCode`,
                [
                    { text: "OK" }
                ],
            );
        })
    }

    useEffect(()=>{
        if(disCheckRef.current && auth.currentUser){
            promocodeCheck()
        }

        let costInLocalFn = 0
        if(extraCostFirebaseData.length > 0 ){
         setExtraCostUI(extraCostFirebaseData.map((doc)=>{
                const data = doc.data()
                if(data.costType === "%"){
                    costInLocalFn+= ((subTottal / 100) * Number(data.costValue) )
                }else{
                    costInLocalFn+= Number(data.costValue)
                }
                
                return (
                    <View key={doc.id} style={styles.placeOrderLine}>
                        <Text style={styles.totalPrice}>{`${data.name}- ${(data.costType === "%") ? `${data.costValue}%` : "" }`}</Text>
                        <Text style={styles.totalPrice}>{(data.costType === "%") ? (subTottal / 100) * Number(data.costValue) : data.costValue }৳</Text>
                    </View>
                )
            }))
            setTotalExtraCost(costInLocalFn)
            // setExtraCostUI(ui)
        }

    },[subTottal ,extraCostFirebaseData])

    const  amPmTimeFormat = (time) => {
        let hours = time.split('.')[0];
        let minutes = time.split('.')[1];
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
      const [skip , setSkitp] = useState(false)

      if(openingStatus && !openingStatus.status && !skip){
        return(<Modal 
            animationType="fade"
            // transparent={true}
            visible={true}
            >
            <View>
                <Text>
                    {resturentOpenClosedData && `Resturent IS Closed Now. For getting Delivary Plz Wait Before ${amPmTimeFormat(resturentOpenClosedData[0].data().openingHR)} to open the resturent`}
                </Text>
                <NextButton onPress={()=> setSkitp(true)} title="Order Now" />
            </View>
            </Modal>)
      }
      if(!openingStatus){
        return (
            <View style={styles.checkoutContainer}> 
                <Text> Loading </Text>
            </View>
        )
      }

      if(Object.keys(shopingCard).length === 0){
           return( <View>
                <Heading title="Card Is Empty ,Please Add Some Items" />
            </View>
           )
      }

    return (
        <View style={styles.checkoutContainer}>
            <View>
                <Heading title="Order Details" />
            </View>
            <View style={styles.cardContainer}>
            <ScrollView>
                {shopingCard && Object.keys(shopingCard).map(key => (<ProductCard UpdateCardItem={UpdateCardItem}  key={key} cardsType="counter" item={shopingCard[key]} />))}


                <View>
                    <Text>Place The PromoCode If You Have</Text>
                    <TextInput
                    // style={styles.input}
                    onChangeText={setPromoCode}
                    value={promoCode}
                    placeholder="Promo Code"
                    placeholderTextColor="#fff"
                    />
                <NextButton onPress={promocodeCheck} title="Apply PromoCode" />


                </View>





            </ScrollView>
            </View>
            <View style={styles.placeOrder}>
                <View style={styles.placeOrderLine}>
                    <Text style={styles.textColor}>Sub Total</Text>
                    <Text style={styles.textColor}>{subTottal} ৳</Text>
                </View>
                {extraCostUI}
                {discountAmmount && (
                    <View style={styles.placeOrderLine}>
                        <Text style={styles.totalPrice}>Discount</Text>
                        <Text style={styles.totalPrice}> -{discountAmmount}৳</Text>
                    </View>
                )}
                <View style={styles.placeOrderLine}>
                    <Text style={styles.totalPrice}>Total</Text>
                    <Text style={styles.totalPrice}>{TotalOrderAmmount}৳</Text>
                </View>
                {auth.currentUser ? (
                    <TouchableOpacity  onPress={storeTheOrderCaches} style={styles.placeOrderButton}>
                        <Text style={styles.placeOrderButtonText}> {!openingStatus.status ? "Order For Latter" : "Place My Order"}</Text>
                    </TouchableOpacity>
                ) : <TouchableOpacity onPress={()=> LoadingChanger({status : true , type :  "LoginUI"})} style={styles.placeOrderButton}>
                        <Text style={styles.placeOrderButtonText}>Login Before Order</Text>
                    </TouchableOpacity>}
                
            </View>
        </View >
    )
}


export default Checkout