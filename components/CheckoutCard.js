import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { CheckoutCardActions } from '../constants/enum';
import { GlobalStyle } from '../styles';

const CheckoutCard = ({ UpdateCardItem, item, cardsType }) => {

    const cardLocalAction = (action) => {
        UpdateCardItem({ action: action, key: item.key })
    }

    return (
        <View style={styles.card}>
            <View style={styles.cardProduct}>
                <View style={{ minWidth: '25%', justifyContent: 'space-between' }}>
                    <Image source={{ uri: `${item?.image?.imageDownloadUrl}` }} style={styles.cardImage} />
                    <View style={styles.buttonSet}>

                        {cardsType === "nonInteractive" ? (<Text style={styles.buttonNumber}>{item?.itemCount}</Text>) : (
                            <>
                                <TouchableOpacity onPress={() => cardLocalAction(CheckoutCardActions.increment)}>
                                    <FontAwesome name="plus" size={20} color="rgba(255,255,255,0.8)" />
                                </TouchableOpacity>
                                <Text style={styles.buttonNumber}>{item?.itemCount}</Text>
                                {item?.itemCount > 1 ?
                                    (<TouchableOpacity onPress={() => cardLocalAction(CheckoutCardActions.decrement)}>
                                        <FontAwesome name="minus" size={20} color="rgba(255,255,255,0.8)" />
                                    </TouchableOpacity>) :
                                    (<TouchableOpacity onPress={() => cardLocalAction(CheckoutCardActions.delete)}>
                                        <FontAwesome name="trash-o" size={20} color="rgba(255,255,255,0.8)" />
                                    </TouchableOpacity>)
                                }
                            </>

                        )}

                    </View>
                </View>
                <View style={styles.cardTextBox}>
                    <Text style={styles.cardTextTitle}>{item?.name}</Text>

                    <View style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Text style={styles.cardText}>{item?.selectedVariant?.name}</Text>
                        <Text style={styles.cardTextPrice}>{item?.selectedVariant?.sellingPrice} ৳</Text>
                    </View>
                    <View >
                        {Object.keys(item?.selectedAddonsForCard).map((key => {
                            const data = item?.selectedAddonsForCard[key]
                            return (
                                <View key={key} style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={styles.cardText}>+ {data?.name}</Text>
                                    <Text style={styles.cardTextPrice}>{data?.price} ৳</Text>
                                </View>
                            )
                        }))}
                        {/* <Text style={styles.cardTextTitle}>{item?.selectedVariant?.sellingPrice}৳</Text> */}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={styles.cardText}> {`${item?.itemCount} x ${item?.unitPrice} `} ৳</Text>
                        <Text style={styles.cardTextPrice}>{Number(item?.unitPrice) * Number(item?.itemCount)} ৳</Text>

                    </View>
                    {/* <Text style={styles.cardTextCategory}>{category}</Text> */}
                    {/* <Text style={styles.cardTextPrice}>৳ {item?.defualtVariant?.sellingPrice}</Text> */}
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        width: '100%',
        // height: 120,
        backgroundColor: '#252525',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    cardProduct: {
        flexDirection: 'row'
    },
    cardImage: {
        width: "100%",
        height: 80,
        borderRadius: 10
    },
    cardTextBox: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'space-between'
    },
    cardTextTitle: {
        fontSize: 20,
        color: '#fff'
    },
    cardText: {
        fontSize: 16,
        color: '#fff'
    },
    cardTextCategory: {
        fontSize: 16,
        color: '#808080'
    },
    cardTextPrice: {
        fontSize: 16,
        color: 'rgba(21,190,119,1)'
    },
    buttonSet: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonNumber: {
        color: '#ffff',
        fontSize: 25,
        marginHorizontal: 15
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

export default CheckoutCard