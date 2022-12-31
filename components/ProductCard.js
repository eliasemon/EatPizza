import { useState , useRef, useEffect } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import ImagePhoto from '../assets/images/ItemPhoto.png'
import { FontAwesome } from "@expo/vector-icons"
import { MaterialIcons } from '@expo/vector-icons'; 
import { CheckoutCardActions } from '../constants/enum';


const ProductCard = ({ updataCard , subTottal, item , cardsType , pdUIAddToCardHandle }) => {
    const [itemAddonsUI, setItemAddonsUI] = useState("")
    const totalPice = useRef(Number(item?.selectedVariant?.sellingPrice));
    const unitPrice = useRef(0)
    console.log("Unlimited")
    const cardLocalAction = (action)=>{
        if(action == CheckoutCardActions.delete){
            subTottal.current = Number(subTottal.current) - totalPice.current
            
        }else if(action == CheckoutCardActions.increment){
            totalPice.current += Number(unitPrice.current )
            subTottal.current += Number(unitPrice.current)

        }else if(action == CheckoutCardActions.decrement){
            totalPice.current -= Number(unitPrice.current)
            subTottal.current -= Number(unitPrice.current)
        }

        updataCard(action , item.key)
    }

    useEffect(()=>{
        if(item?.selectedAddonsForCard){
            setItemAddonsUI(
            Object.keys(item?.selectedAddonsForCard).map((key=>{
                const data = item?.selectedAddonsForCard[key]
                totalPice.current+=Number(data.price)
                return (
                    <View key={key} style={{display : "flex" ,  flexDirection: 'row' ,justifyContent : "space-between"}}> 
                        <Text style={styles.cardTextTitle}>{data.name}</Text>
                        <Text style={styles.cardTextTitle}>{data.price}৳</Text>
                    </View>
                )
            }))
            )
            unitPrice.current = totalPice.current;
            totalPice.current *= Number(item.itemCount)
            subTottal.current = Number(subTottal.current) + totalPice.current
        }
    },[])

    
    const cardType = {
        button: (<TouchableOpacity onPress={()=> pdUIAddToCardHandle(item)}>
            <FontAwesome name="cart-plus" size={26} color="#fff" />
        </TouchableOpacity>),
        chip: (<View style={styles.chip}>
            <Text style={styles.chipText}>Done</Text>
        </View>),
        counter: (<View style={styles.buttonSet}>
            <TouchableOpacity onPress={()=> cardLocalAction(CheckoutCardActions.increment)}>
                <FontAwesome name="chevron-up" size={20} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>
            <Text style={styles.buttonNumber}>{item.itemCount}</Text>
            {item.itemCount > 1 ? 
                (<TouchableOpacity onPress={() =>  cardLocalAction(CheckoutCardActions.decrement)}>
                    <FontAwesome name="chevron-down" size={20} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>) :
                (<TouchableOpacity onPress={() => cardLocalAction(CheckoutCardActions.delete)}>
                   <MaterialIcons name="delete-forever" size={20} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>)

            }
            
        </View>)
    }

    return (
        <View style={styles.card}>
            <View style={styles.cardProduct}>
                <Image source={{uri : `${item?.image?.imageDownloadUrl}`}} style={styles.cardImage} />
                <View style={styles.cardTextBox}>
                    <Text style={styles.cardTextTitle}>{item?.name}</Text>
                    {cardsType == "counter" && (
                        <>
                            <View style={{display : "flex" ,  flexDirection: 'row' ,justifyContent : "space-between"}}> 
                                <Text style={styles.cardTextTitle}>{item?.selectedVariant?.name}</Text>
                                <Text style={styles.cardTextTitle}>{item?.selectedVariant?.sellingPrice}৳</Text>
                            </View>
                            <View > 
                                { itemAddonsUI }
                                {/* <Text style={styles.cardTextTitle}>{item?.selectedVariant?.sellingPrice}৳</Text> */}
                            </View>
                            <Text style={styles.cardTextPrice}> {totalPice.current}৳</Text>
                        </>
                    )}
                    {/* <Text style={styles.cardTextCategory}>{category}</Text> */}
                    <Text style={styles.cardTextPrice}>৳ {item?.defualtVariant?.sellingPrice}</Text>
                </View>
            </View>
            {cardType[cardsType]}
        </View>
    )
}

const styles = StyleSheet.create({
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
    buttonSet: {
        alignItems: 'center',
    },
    buttonNumber: {
        color: '#ffff',
        fontSize: 25
    },
    chip: {
        backgroundColor: 'rgba(255,255,255,.1)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20
    },
    chipText: {
        color: "#fff"
    },
})

export default ProductCard