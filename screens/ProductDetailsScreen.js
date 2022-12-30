import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, TextInput, Alert } from "react-native"
import Heading from "../components/Heading"
import product from '../assets/images/product.png'
import { NextButton } from "../components/Buttons"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"

import { getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise } from "../utils"
const RadioButton = ({ product, selectedId }) => {
    return (
        <View>
            <View>
                {/* <Ionicons name={variation[id].isSelected ? "radio-button-on" : "radio-button-off"} size={24} color="white" /> */}
                <Ionicons name={product.id == selectedId ? "radio-button-on" : "radio-button-off"} size={24} color="white" />
            </View>
            <Text style={styles.text}>
                {product.name}
            </Text>
            <Text style={styles.text}>{product.sellingPrice}</Text>
        </View>
    )
}

const CheckBox = ({ isSelected, product }) => {
    return (
        <View style={styles.radioButton} >
            <View>
                <FontAwesome name={isSelected ? "check-circle-o" : "circle-o"} size={24} color="#fff" />
            </View>
            <Text style={styles.text}>
                {product.name}
            </Text>
            <Text style={styles.text}>
                {product.price}
            </Text>
        </View >
    )
}


const ProductDetailsScreen = ({ disCard, addToCardHandle, item }) => {

    const [itemCount, setItemCount] = useState(0)

    const handleUpPress = () => {
        setItemCount(count => count + 1)
    }

    const handleDownPress = () => {
        setItemCount(count => count - 1)
    }

    const demoData = {
        "defualtVariant": {
            "id": "d110689c-3c52-42b8-9df6-8a5fdf4883b1",
            "name": "8\"",
            "regularPrice": "389",
            "sellingPrice": "350"
        },
        "descriptions": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
        "id": "EatPizza-0a-331-a4b-75b",
        "image": {
            "imageDownloadUrl": "https://firebasestorage.googleapis.com/v0/b/eatpizza-cdcd6.appspot.com/o/product%2FEatPizza-fb-b4a-a8a-6e8.jpeg?alt=media&token=4487f439-aad8-478b-8bf7-1dd248b6c7ef",
            "imgRef": "product/EatPizza-fb-b4a-a8a-6e8.jpeg"
        },
        "name": "BBQ Chicken Pizza",
        "selectedAddons": [
            "65xtKxCPzqAy2L0Ou9Z6",
            "8Y7qrfFklgKEyVq6sy8E",
            "GPu0R9VkaLUpoHPtl9Cc",
            "YTGJ6wDEMw37Ux3hvD6B",
            "j4IMQlq4Mp7ifvlAj5VD",
            "kddwJfTaBvQbsK62J1Rl"
        ],
        "selectedCatagories": [
            "e19325gDx6dKFUqAU0aw"
        ],
        "variants": {
            "a43d9df0-e527-4aa5-94aa-1716216d00ba": {
                "id": "a43d9df0-e527-4aa5-94aa-1716216d00ba",
                "name": "10\"",
                "regularPrice": "461",
                "sellingPrice": "450"
            },
            "d110689c-3c52-42b8-9df6-8a5fdf4883b1": {
                "id": "d110689c-3c52-42b8-9df6-8a5fdf4883b1",
                "name": "8\"",
                "regularPrice": "389",
                "sellingPrice": "350"
            },
            "d8fff207-b8b4-466b-9062-c90fa07643ac": {
                "id": "d8fff207-b8b4-466b-9062-c90fa07643ac",
                "name": "12\"",
                "regularPrice": "519",
                "sellingPrice": "500"
            }
        }
    }

    const [selectedVariant, setSelectedVariant] = useState("")
    const [selectedAddonsForCard, setSelectedAddonsForCard] = useState({})
    const [specialInstructions, setSpecialInstructions] = useState("")

    const [addons, setAddons] = useState("")



    const addToCardLocalFn = () => {
        if (selectedVariant == "") {
            Alert.alert(
                "Variant Selection Requiered",
                "You haven't select a variant .Please select a variant",
                [
                    { text: "OK" }
                ],
                {
                    cancelable: false,
                    overlayStyle: stylesForAlert.overlay,
                    alertContainerStyle: stylesForAlert.alertContainer,
                    titleStyle: stylesForAlert.text,
                    messageStyle: stylesForAlert.text,
                    buttonStyle: stylesForAlert.buttonContainer,
                    buttonTextStyle: stylesForAlert.buttonText,
                }
            );
            return
        }
        const key = `${item.id}+${selectedVariant.id}+${Object.keys(selectedAddonsForCard).toString()}+${specialInstructions}`
        const data = {
            key: key,
            id: item.id,
            name: item.name,
            image : item.image,
            selectedVariant: selectedVariant,
            selectedAddonsForCard: selectedAddonsForCard,
            specialInstructions: specialInstructions,
            itemCount: itemCount
        }
        addToCardHandle(key, data)

    }
    useEffect(() => {
        if (item?.selectedAddons?.length > 0) {

            const data = item.selectedAddons.map((addonId) => {
                return (getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise("Addons", addonId))
            })
            Promise.all(data).then((v) => setAddons([...v]))
        }
    }, [])

    return (
        <View style={styles.checkoutContainer}>
            <Heading disCard={disCard} title="Product Details" />
            <ScrollView >

                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: `${item?.image?.imageDownloadUrl}` }} />
                </View>
                <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description}>{item.descriptions}</Text>
                </View>
                <View>
                    <Text style={styles.title}>Select variation</Text>
                    <ScrollView>
                        {Object.keys(item.variants).map((key) => {
                            const data = item.variants[key]
                            data.id = key
                            return (
                                <TouchableOpacity key={data.id} onPress={() => setSelectedVariant(data)}>
                                    <RadioButton selectedId={selectedVariant?.id} product={data} key={data.id} />
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
                <View>
                    <Text style={styles.title}>Select Addons</Text>
                    <ScrollView>
                        {addons && addons.map(addon => {
                            return (
                                <TouchableOpacity key={addon.id} onPress={() => {
                                    setSelectedAddonsForCard((prv) => {
                                        if (prv[`${addon.id}`]) {
                                            delete prv[`${addon.id}`]
                                        } else {
                                            prv[`${addon.id}`] = addon
                                        }
                                        return { ...prv }
                                    })
                                }}>
                                    <CheckBox isSelected={selectedAddonsForCard[`${addon.id}`] ? true : false} product={addon} key={addon.id} />
                                </TouchableOpacity>
                            )
                        })}

                        {/* // (<CheckBox setAddons={setAddons} id={item.id} product={item} addons={addons} key={item.id} />)) */}
                    </ScrollView>
                </View>
                <View>
                    <Text style={styles.title}>Special instructions</Text>
                    <TextInput value={specialInstructions} onChangeText={setSpecialInstructions} style={styles.input} multilinef />
                </View>
                <View style={styles.cart}>
                    <NextButton onPress={addToCardLocalFn} title="Add to Cart" />
                    <View style={styles.buttonSet}>
                        <TouchableOpacity onPress={handleUpPress}>
                            <FontAwesome name="chevron-up" size={20} color="rgba(255,255,255,0.8)" />
                        </TouchableOpacity>
                        <Text style={styles.buttonNumber}>{itemCount}</Text>
                        <TouchableOpacity onPress={handleDownPress}>
                            <FontAwesome name="chevron-down" size={20} color="rgba(255,255,255,0.8)" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    checkoutContainer: {
        height: '100%',
        backgroundColor: "#000"
        // justifyContent: 'space-between'
    },
    cardContainer: {
        paddingVertical: 20,
        height: '60%'
    },
    imageContainer: {
        width: '100%',
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: 250
    },
    text: {
        color: '#fff',
        marginHorizontal: 10
    },
    title: {
        color: '#fff',
        fontSize: 28,
        marginVertical: 10
    },
    description: {
        color: '#fff'
    },
    buttonSet: {
        alignItems: 'center',
    },
    buttonNumber: {
        color: '#ffff',
        fontSize: 25
    },
    cart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 30
    },
    addonList: {
        color: '#fff'
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        color: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 20
    }
})


const stylesForAlert = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    alertContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    buttonContainer: {
        backgroundColor: 'red',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
});
export default ProductDetailsScreen