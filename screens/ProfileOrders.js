import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import Heading from '../components/Heading'
import profile from '../assets/images/profile.png'
import avatar from '../assets/images/avatar.png'

import { GlobalStyle, ProfileOrdersStyle as styles } from '../styles'
import { useState, useRef, useEffect } from 'react'
import { auth } from '../config'
import { getUsersOrderHistory, getCurrentOrder } from '../utils'
import { Button } from '../components/Buttons'
import CheckoutCard from '../components/CheckoutCard'
import CollapsibleCard from '../components/collapsibleCard/CollapsibleCard'


const OrdersItemsCom = ({ item }) => {
    return (
        <CollapsibleCard
            item={item}
            style={[{ marginBottom: 16 }, GlobalStyle.sidePadding]}>

            <View>

                {item.items && Object.keys(item.items).map(key => (
                    <CheckoutCard
                        key={key}
                        cardsType="nonInteractive"
                        item={item.items[key]}
                    />)
                )}

                {/*
                all the properties can accessable by item fragment , Like item.paymentType
                "paymentType":"cashon",
                "promoCode":"",
                "shipingAddress":"Dhaka",
                "status":"pending",
                "subTottal":730,
                "totalExtraCost":0,
                "userID":"lfXGfoGOoXg6YoGeqVhBuSITIhB2",
                "userName":"Elias ",
                "userPhoneNumber":"+8801792269420" */}

            </View>
        </CollapsibleCard>)
}





const ProfileOrders = ({ navigation }) => {
    const [itemsSnapshot, setItemsSnapshot] = useState("");
    const [itemsDataForView, setItemsDataForView] = useState([]);
    const [itemsDataForViewCurrentOrder, setItemsDataForViewCurrentOrder] = useState([]);
    const [isCurrent, setIsCurrent] = useState(false);
    useEffect(() => {
        if (!itemsSnapshot) {
            getUsersOrderHistory(setItemsSnapshot, "ordersList", { queryField: "userID", targetItem: auth.currentUser.uid })
        }
    }, [])


    useEffect(() => {

        if (itemsSnapshot) {

            const currentOrderData = []
            const data = itemsSnapshot.map((doc) => {
                item = doc.data()
                item.id = doc.id
                if (item.status !== "compleate" || item.status !== "cencel") currentOrderData.unshift(item)
                return item
            })

            setItemsDataForView([...data])
            setItemsDataForViewCurrentOrder([...currentOrderData])

        }
    }, [itemsSnapshot])

    return (
        <View>
            <Heading navigation={navigation} title="User's Orders" />
            <View style={styles.profileSection}>
                <View style={styles.profileImage}>
                    <Image style={{
                                width: 120,
                                height: 120,
                                resizeMode: 'contain',
                                borderRadius: 100
                            }}
                        source={auth.currentUser.photoURL ? { uri: auth.currentUser.photoURL } : avatar} />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{auth.currentUser.displayName}</Text>
                    <Text style={styles.profileEmail}>{auth.currentUser.phoneNumber}</Text>
                </View>
            </View>
            {/* <View style={styles.tab}>
                <Button } >Current Order</Button>
            <Button } >All Orders</Button>
            </View > */}
            <View style={styles.tab}>
                <TouchableOpacity onPress={() => setIsCurrent(false)} style={[styles.tabOption, {
                    backgroundColor: isCurrent ? 'rgba(0,0,0,0)' : 'rgba(0,255,0,0.1)'
                }]}>
                    <Text style={styles.tabOptionText}>Processing</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsCurrent(true)} style={[styles.tabOption, {
                    backgroundColor: isCurrent ? 'rgba(0,255,0,0.1)' : 'rgba(0,0,0,0)'
                }]}>
                    <Text style={styles.tabOptionText}>All Orders</Text>
                </TouchableOpacity>
            </View>

            {
                (itemsDataForView || itemsDataForViewCurrentOrder) && (<FlatList
                    style={[GlobalStyle.sidePadding, styles.cardContainer]} data={isCurrent ? itemsDataForViewCurrentOrder : itemsDataForView} renderItem={
                        ({ item }) => (<OrdersItemsCom item={item} />)
                    } keyExtractor={item => (itemsDataForView ? `itemsDataForView${item.id}` : item.id)} />)

            }

        </View>
    )
}

export default ProfileOrders

{/* <ProductCard cardsType="chip" item={item} /> */ }