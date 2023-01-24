import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Alert, Modal } from "react-native"
import Heading from "../components/Heading"
import { Button, NextButton } from "../components/Buttons"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { styles, stylesForAlert } from "../styles/ProductDetails.style"
import { getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise } from "../utils"
import { useStoreActions } from 'easy-peasy';
import { GlobalStyle } from "../styles"

const RadioButton = ({ product, selectedId }) => {
    return (
        <View style={styles.radioButton}>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    {/* <Ionicons name={variation[id].isSelected ? "radio-button-on" : "radio-button-off"} size={24} color="white" /> */}
                    <Ionicons name={product.id == selectedId ? "radio-button-on" : "radio-button-off"} size={24} color="white" />
                </View>
                <Text style={styles.text}>
                    {product.name}
                </Text>
            </View>
            <Text style={styles.text}>৳ {product.sellingPrice}</Text>
        </View>
    )
}

const CheckBox = ({ isSelected, product }) => {
    return (
        <View style={styles.radioButton} >
            <View style={{ flexDirection: 'row' }}>

                <View>
                    <FontAwesome name={isSelected ? "check-circle-o" : "circle-o"} size={24} color="#fff" />
                </View>
                <Text style={styles.text}>
                    {product.name}
                </Text>
            </View>
            <Text style={styles.text}>
                ৳ {product.price}
            </Text>
        </View >
    )
}


const ProductDetailsScreen = ({ navigation, route }) => {
    const addToCard = useStoreActions((actions) => actions.addToCard);
    const { item } = route.params;
    const [itemCount, setItemCount] = useState(1)

    const handleUpPress = () => {
        setItemCount(count => count + 1)
    }

    const handleDownPress = () => {
        if (itemCount <= 1) {
            return
        }
        setItemCount(count => count - 1)
    }

    const [selectedVariant, setSelectedVariant] = useState("")
    const [selectedAddonsForCard, setSelectedAddonsForCard] = useState({})
    const [specialInstructions, setSpecialInstructions] = useState("")

    const [addons, setAddons] = useState("")



    const addToCardLocalFn = () => {
        if (selectedVariant == "") {
            Alert.alert(
                "Variant Selection Requiered",
                "You have not selected any variant. Please select a variant",
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
            image: item.image,
            selectedVariant: selectedVariant,
            selectedAddonsForCard: selectedAddonsForCard,
            specialInstructions: specialInstructions,
            itemCount: itemCount
        }
        addToCard({ key: key, data: { ...data } })
        navigation.goBack()
        setSelectedVariant("")
        setSelectedAddonsForCard({})
        setSpecialInstructions("")
        setAddons("")

    }
    useEffect(() => {
        if (item?.selectedAddons?.length > 0) {

            const data = item.selectedAddons.map(async(addonId) => {
                const data = await getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise("Addons", addonId)
                delete data.selectedCatagories
                return data
            })
            Promise.all(data).then((v) => setAddons([...v]))
        }
    }, [])

    return (
        <Modal
            animationType="fade"
            // transparent={true}
            onRequestClose={() => {
                navigation.goBack()
            }}
            visible={true}
        >
            <View style={styles.checkoutContainer}>
                <Heading title="Product Details" />
                <ScrollView style={{
                    backgroundColor: 'rgba(255,255,255,0.08)'
                }}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: `${item?.image?.imageDownloadUrl}` }} />
                    </View>
                    <View style={GlobalStyle.sidePadding} >
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.description}>{item.descriptions}</Text>
                    </View>
                    <View style={[GlobalStyle.sidePadding, {
                        marginVertical: 5
                    }]}>
                        <Text style={styles.optionTitle}>Select variation</Text>
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
                    <View style={[GlobalStyle.sidePadding, {
                        marginVertical: 5
                    }]}>
                        <Text style={styles.optionTitle}>Select Addons</Text>
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
                    <View style={[GlobalStyle.sidePadding, {
                        marginVertical: 5
                    }]}>
                        <Text style={styles.optionTitle}>Special instructions</Text>
                        <TextInput value={specialInstructions} onChangeText={setSpecialInstructions} style={styles.input} multilinef />
                    </View>
                    <View style={styles.cart}>
                        <View style={styles.buttonSet}>
                            <TouchableOpacity style={{ opacity: (itemCount > 1 ? 1 : 0.4), marginHorizontal: 20 }} disabled={itemCount <= 1} onPress={handleDownPress}>
                                <FontAwesome name="minus" size={20} color="rgba(255,255,255,0.8)" />
                            </TouchableOpacity>
                            <Text style={styles.buttonNumber}>{itemCount}</Text>
                            <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={handleUpPress}>
                                <FontAwesome name="plus" size={20} color="rgba(255,255,255,0.8)" />
                            </TouchableOpacity>
                        </View>
                        <Button onPress={addToCardLocalFn} style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            backgroundColor: 'rgba(0,255,0,0.35)',
                            borderRadius: 75
                        }}>Add to cart</Button>
                    </View>
                </ScrollView>
            </View >
        </Modal>
    )
}

export default ProductDetailsScreen