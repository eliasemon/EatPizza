import { useStoreActions, useStoreState } from "easy-peasy"
import { onAuthStateChanged , getAuth } from "firebase/auth"
import { useEffect, useRef, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, Alert, Modal } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Button, NextButton } from "../components/Buttons"
import CheckoutCard from "../components/CheckoutCard"
import Heading from "../components/Heading"
import { COLORS } from '../constants/theme'

import { CheckoutStyle as styles, GlobalStyle } from '../styles'
import { showDataWithOutPagination, getSingleDataWithOutRealTimeUpdates, getSingleDataWithRealTimeUpdates } from "../utils"
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

const Checkout = ({ navigation }) => {
    const auth = getAuth();


    const [isClickedPromo, setIsClickedPromo] = useState(false)
    const { LoadingChanger, addDataToCachesForOrder, clearShopingCard, UpdateCardItem } = useStoreActions(action => action)
    const [resturentOpenClosedData, setResturentOpenClosedData] = useState("")
    const [openingStatus, setOpeningStatus] = useState("")
    const [froce, setForce] = useState(true)
    const [promoCode, setPromoCode] = useState("")

    const { subTottal, shopingCard } = useStoreState(state => state)

    const [extraCostFirebaseData, setExtraCostFirebaseData] = useState(false);
    const [extraCostUI, setExtraCostUI] = useState("");
    const [discountAmmount, setDiscountAmmount] = useState(false)
    const [totalExtraCost, setTotalExtraCost] = useState(0)
    const [userInformation , setUsersInformation] = useState("")
    const disCheckRef = useRef(false)
    const TotalOrderAmmount = Number(subTottal) + Number(totalExtraCost) - Number(discountAmmount)


    const storeTheOrderCaches = () => {
        const data = {
            items: shopingCard,
            subTottal: subTottal,
            discountAmmount: discountAmmount,
            promoCode: promoCode,
            totalExtraCost: totalExtraCost,
            TotalOrderAmmount: TotalOrderAmmount

        }
        addDataToCachesForOrder({ type: "Add", data: data })
        setDiscountAmmount(false)
        setPromoCode("")
        disCheckRef.current = false;

        if(userInformation?.isRestricted){
             navigation.navigate("UserRestrictions")
        }else{
            navigation.navigate("Shipping")
        }

    }


    useEffect(() => {
        showDataWithOutPagination(setExtraCostFirebaseData, "extraCost"),
        getSingleDataWithRealTimeUpdates(setUsersInformation , "usersList" , auth.currentUser.uid);
        showDataWithOutPagination(setResturentOpenClosedData, "ResturentOpeningHr")
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                LoadingChanger({ status: true, type: "LoginUI" })
            }
            setForce(prv => !prv)
        })
    }, []);


    useEffect(() => {
        if (resturentOpenClosedData.length > 0)
            setOpeningStatus(findTheResturentStatus(resturentOpenClosedData[0].data()))
    }, [resturentOpenClosedData]);

    // useEffect(()=>{

    // },[])

    const promocodeCheck = () => {
        getSingleDataWithOutRealTimeUpdates("promoCode", promoCode).then((data) => {
            const timeStampInMsForPromo = Date.parse(data.validity)
            if (timeStampInMsForPromo < Date.now()) {
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
            if (Number(data.conditionAmmount) > subTottal) {
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
            if (data.discountType === "%") {
                const ammount = (subTottal / 100) * Number(data.discountValue)
                setDiscountAmmount(ammount)
                return
            }
            setDiscountAmmount(Number(data.discountValue))
        }).catch((error) => {
            setDiscountAmmount(false)
            disCheckRef.current = false;
            setPromoCode("")
            Alert.alert(
                "Invalid Promo Code",
                "Please enter a valid promo code",
                [
                    { text: "OK" }
                ],
            );
        })
    }

    useEffect(() => {
        if (disCheckRef.current && auth.currentUser) {
            promocodeCheck()
        }

        let costInLocalFn = 0
        if (extraCostFirebaseData.length > 0) {
            setExtraCostUI(extraCostFirebaseData.map((doc) => {
                const data = doc.data()
                if (data.costType === "%") {
                    costInLocalFn += ((subTottal / 100) * Number(data.costValue))
                } else {
                    costInLocalFn += Number(data.costValue)
                }

                return (
                    <View key={doc.id} style={styles.placeOrderLine}>
                        <Text style={styles.text}>{`${data.name}- ${(data.costType === "%") ? `${data.costValue}%` : ""}`}</Text>
                        <Text style={styles.text}>{(data.costType === "%") ? (subTottal / 100) * Number(data.costValue) : data.costValue}৳</Text>
                    </View>
                )
            }))
            setTotalExtraCost(costInLocalFn)
            // setExtraCostUI(ui)
        }

    }, [subTottal, extraCostFirebaseData])

    const amPmTimeFormat = (time) => {
        if (Number.isInteger(Number(time))) {
            time += `.00`
        }
        let hours = time.split('.')[0];

        let minutes = time.split('.')[1];
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const [skip, setSkitp] = useState(false)

    if (openingStatus && !openingStatus.status && !skip) {
        return (<Modal
            animationType="fade"
            // transparent={true}
            visible={true}
            onRequestClose={() => {navigation.navigate("Home") ; setSkitp(true) ;} }
        >
            <View style={[GlobalStyle.sidePadding, { height: '100%', backgroundColor: '#121212', justifyContent: 'center' }]}>
                <Text style={{ color: 'yellow', marginBottom: 20, marginHorizontal: 20, fontSize: 16, lineHeight: 22 }}>
                    {resturentOpenClosedData && `Restaurant Is Closed Now. For getting Delivery Please Wait Before ${amPmTimeFormat(resturentOpenClosedData[0].data().openingHR)} to open the restaurant`}
                </Text>
                <Button style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 15,
                    paddingHorizontal: 80,
                    alignSelf: 'center',
                    borderRadius: 10
                }} onPress={() => setSkitp(true)}>Order Now</Button>
                {/* <NextButton onPress={() => setSkitp(true)} title="Order Now" /> */}
            </View>
        </Modal>)
    }
    if (!openingStatus) {
        return (
            <View style={styles.checkoutContainer}>
                <Text> Loading </Text>
            </View>
        )
    }

    if (Object.keys(shopingCard).length === 0) {
        return (<View>
            <Heading title="Order Details" />
            <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', color: 'rgba(255,255,255,0.9)', fontSize: 18 }}>Cart is empty !</Text>
                <Text style={{ color: '#fff', color: 'rgba(255,255,255,0.9)', fontSize: 18 }}>Please add some item. </Text>
            </View>
        </View>
        )
    }

    return (
        <>
            <View>
                <Heading title="Order Details" />
            </View>
            <View style={styles.checkoutContainer}>
                {/* <View style={styles.cardContainer}> */}
                    <ScrollView>
                        {shopingCard && Object.keys(shopingCard).map(key => (
                            <CheckoutCard
                                UpdateCardItem={UpdateCardItem}
                                key={key}
                                cardsType="counter"
                                item={shopingCard[key]}
                            />)
                        )}
                    </ScrollView>
                {/* </View> */}
                <View style={{ marginTop: 10 }}>
                    <View style={[GlobalStyle.sidePadding,
                    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }
                    ]}>
                        {!isClickedPromo ?
                            <Text style={{ color: '#fff', fontSize: 16 }}>Do you have any promocode ?</Text> :
                            <TextInput
                                style={styles.input}
                                onChangeText={setPromoCode}
                                value={promoCode}
                                placeholder="Promo Code"
                                placeholderTextColor="#fff"
                            />
                        }
                        {/* <View> */}

                        <Button onPress={isClickedPromo ? promocodeCheck : () => setIsClickedPromo(true)} style={{ borderColor: 'yellow', borderWidth: 1, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 3 }} >{isClickedPromo ? 'apply' : 'use it'}</Button>
                        {/* </View> */}
                        {/* <Button onPress={promocodeCheck} style={{ borderColor: 'red', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 3 }} >Use it</Button> */}
                        {/* <NextButton title="Apply PromoCode" /> */}
                    </View>
                    <View style={styles.placeOrder}>
                        <View style={styles.placeOrderLine}>
                            <Text style={styles.text}>Sub Total</Text>
                            <Text style={styles.text}>{subTottal} ৳</Text>
                        </View>
                        {extraCostUI}
                        {discountAmmount && (
                            <View style={styles.placeOrderLine}>
                                <Text style={styles.text}>Discount</Text>
                                <Text style={styles.text}> -{discountAmmount}৳</Text>
                            </View>
                        )}
                        <View style={{ height: 1, width: '100%', backgroundColor: 'grey', marginVertical: 5 }} />
                        <View style={styles.placeOrderLine}>
                            <Text style={[styles.text, { fontSize: 20 }]}>Total</Text>
                            <Text style={[styles.text, { fontSize: 20 }]}>{TotalOrderAmmount}৳</Text>
                        </View>
                        {auth.currentUser ? (
                            <TouchableOpacity onPress={storeTheOrderCaches} style={styles.placeOrderButton}>
                                <Text style={styles.placeOrderButtonText}> {!openingStatus.status ? "Please Order Later" : "Place The Order"}</Text>
                            </TouchableOpacity>
                        ) : <TouchableOpacity onPress={() => LoadingChanger({ status: true, type: "LoginUI" })} style={styles.placeOrderButton}>
                            <Text style={styles.placeOrderButtonText}>Login Before Order</Text>
                        </TouchableOpacity>}

                    </View>
                </View>
            </View >
        </>
    )
}


export default Checkout