import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, TextInput } from "react-native"
import Heading from "../components/Heading"
import product from '../assets/images/product.png'
import { NextButton } from "../components/Buttons"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { useState } from "react"

const RadioButton = ({ product, id, variation, setVariation }) => {
    return (
        <TouchableOpacity onPress={() => handleRadioButtonPress(id, variation, setVariation)} style={styles.radioButton}>

            <View>
                {/* <Ionicons name={variation[id].isSelected ? "radio-button-on" : "radio-button-off"} size={24} color="white" /> */}
                <Ionicons name={product.isSelected ? "radio-button-on" : "radio-button-off"} size={24} color="white" />
            </View>
            <Text style={styles.text}>
                {product.name}
            </Text>
            <Text>$100</Text>
        </TouchableOpacity>
    )
}

const CheckBox = ({ id, product, addons, setAddons }) => {
    return (
        <TouchableOpacity onPress={() => handleCheckboxPress(product, id, addons, setAddons)} style={styles.radioButton} >
            <View>
                <FontAwesome name={product.isSelected ? "check-circle-o" : "circle-o"} size={24} color="#fff" />
            </View>
            <Text style={styles.text}>
                {product.name}
            </Text>
        </TouchableOpacity >
    )
}

const handleRadioButtonPress = (id, variation, setVariation) => {
    let updateState = variation.map((addon) => addon.id === id ? { ...addon, isSelected: true } : { ...addon, isSelected: false })
    setVariation(updateState)
}

const handleCheckboxPress = (product, id, addons, setAddons) => {
    let updateState = [];
    addons.find((item) => {
        if (item.id === id) {
            updateState.push({
                ...item,
                isSelected: !(item.isSelected)
            })
        } else {
            updateState.push(item)
        }
    })
    setAddons(updateState)
}


const ProductDetailsScreen = () => {

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

    const [variation, setVariation] = useState([
        {
            id: 1,
            name: 'holud',
            price: 10,
            isSelected: false
        },
        {
            id: 2,
            name: 'morich',
            price: 20,
            isSelected: false
        },
        {
            id: 3,
            name: 'jira',
            price: 30,
            isSelected: false
        },
        {
            id: 4,
            name: 'pach foron',
            price: 40,
            isSelected: false
        },
        {
            id: 5,
            name: 'adha bata',
            price: 50,
            isSelected: false
        },
    ])
    const [addons, setAddons] = useState([
        {
            id: 1,
            name: 'holud',
            price: 10,
            isSelected: false
        },
        {
            id: 2,
            name: 'morich',
            price: 20,
            isSelected: false
        },
        {
            id: 3,
            name: 'jira',
            price: 30,
            isSelected: false
        },
        {
            id: 4,
            name: 'pach foron',
            price: 40,
            isSelected: false
        },
        {
            id: 5,
            name: 'adha bata',
            price: 50,
            isSelected: false
        },
    ])

    return (
        <ScrollView style={styles.checkoutContainer}>
            <View>
                <Heading title="Product Details" />
            </View >
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={product} />
            </View>
            <View>
                <Text style={styles.title}>Title</Text>
                <Text style={styles.description}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</Text>
            </View>
            <View>
                <Text style={styles.title}>Select variation</Text>
                <ScrollView>
                    {variation.map((item) => (
                        <RadioButton variation={variation} setVariation={setVariation} id={item.id} product={item} key={item.id} />
                    ))}
                </ScrollView>
            </View>
            <View>
                <Text style={styles.title}>Select Addons</Text>
                <ScrollView>
                    {addons.map((item) => (<CheckBox setAddons={setAddons} id={item.id} product={item} addons={addons} key={item.id} />))}
                </ScrollView>
            </View>
            <View>
                <Text style={styles.title}>Special instructions</Text>
                <TextInput style={styles.input} multilinef />
            </View>
            <View style={styles.cart}>
                <NextButton title="Add to Cart" />
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
    )
}

const styles = StyleSheet.create({
    checkoutContainer: {
        height: '100%',
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

export default ProductDetailsScreen