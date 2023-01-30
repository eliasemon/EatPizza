import { View, Text, Image, FlatList, TouchableOpacity , ActivityIndicator } from 'react-native'
import Heading from '../components/Heading'
import avatar from '../assets/images/avatar.png'

import { GlobalStyle, ProfileOrdersStyle as styles } from '../styles'
import { useState, useRef, useEffect } from 'react'
import { getUsersOrderHistory , getCurrentOrder } from '../utils'
import CheckoutCard from '../components/CheckoutCard'
import CollapsibleCard from '../components/collapsibleCard/CollapsibleCard'
import { COLORS } from '../constants/theme'
import { getAuth} from 'firebase/auth';



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

                <View style={{
                    margin: 10,
                    marginBottom: 15
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{ color: '#fff' }}>Sub total</Text>
                        <Text style={{ color: COLORS.primary }}>{item.subTottal} ৳</Text>
                    </View>
                    {item.totalExtraCost ? (<View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{ color: '#fff' }}>Extra cost</Text>
                        <Text style={{ color: COLORS.primary }}>{item.totalExtraCost} ৳</Text>
                    </View>) : ''}

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{ fontSize: 18, color: '#fff' }}>Total amount</Text>
                        <Text style={{ fontSize: 18, color: COLORS.primary }}>{item.TotalOrderAmmount} ৳</Text>
                    </View>
                </View>

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
    const auth = getAuth();
    const [itemsSnapshot, setItemsSnapshot] = useState("");
    const [itemsDataForView, setItemsDataForView] = useState("");
    const [itemsDataForViewCurrentOrder, setItemsDataForViewCurrentOrder] = useState([]);
    const [isCurrent, setIsCurrent] = useState(true);
    const allOrders =  async () =>{
        if(!itemsDataForView){
            getUsersOrderHistory(setItemsDataForView, "ordersList", { queryField: "userID", targetItem: auth.currentUser.uid })
        }
    }

    useEffect(() => {
        
        if (!itemsSnapshot) {
            getCurrentOrder(setItemsSnapshot, "ordersList", { queryField: "userID", targetItem: auth.currentUser.uid })
        }


    }, [])


    useEffect(() => {
        if (itemsSnapshot) {
            const data = itemsSnapshot.docs.map((doc) => {
                item = doc.data()
                item.id = doc.id
                return item
            })
            data.sort((a ,b) => b.creationTime - a.creationTime)
            setItemsDataForViewCurrentOrder([...data])
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
                <TouchableOpacity onPress={() => setIsCurrent(true)} style={[styles.tabOption, {
                    backgroundColor: isCurrent ? 'rgba(0,255,0,0.1)' : 'rgba(0,0,0,0)' 
                }]}>
                    <Text style={styles.tabOptionText}>Processing</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setIsCurrent(false); allOrders();}} style={[styles.tabOption, {
                    backgroundColor: isCurrent ?  'rgba(0,0,0,0)' :  'rgba(0,255,0,0.1)'
                }]}>
                    <Text style={styles.tabOptionText}>All Orders</Text>
                </TouchableOpacity>
            </View>

            <View style={{marginBottom : 615.5}}>

            {
                (itemsDataForViewCurrentOrder && isCurrent) && (<FlatList
                    ListFooterComponent={(<ActivityIndicator color="#fff" />)}
                    style={[GlobalStyle.sidePadding]} data={itemsDataForViewCurrentOrder} renderItem={
                        ({ item }) => (<OrdersItemsCom item={item} />)
                    } keyExtractor={item => (item.id)} />)

            }
            {
                (itemsDataForView && !isCurrent) && (<FlatList
                    ListFooterComponent={(<ActivityIndicator color="#fff" />)}
                    style={[GlobalStyle.sidePadding]} data={itemsDataForView} renderItem={
                        ({ item }) => (<OrdersItemsCom item={item.data()} />)
                    } keyExtractor={item => (`itemsDataForView${item.id}`)} />)
            }
        </View>

        </View>
    )
}

export default ProfileOrders
