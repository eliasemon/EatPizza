import { useState, useEffect, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import ProductCard from '../components/ProductCard';
import { getDataWithOutRealTimeUpdates, getDataWithInfinityScroll, getSingleDataWithRealTimeUpdates } from '../utils';
import { FilterProductStyle as styles } from '../styles'

import { GlobalStyle } from '../styles';

const FilteredProduct = ({ navigation, route }) => {
    const { activeID } = route.params;
    const [categories, setCategories] = useState("")
    const [isCollapse, setIsCollapse] = useState(true)
    const [isActiveCategoriesId, setisActiveCategoriesId] = useState(activeID)
    const [itemsSnapshot, setItemsSnapshot] = useState("")
    const [itemsDataForView, setItemsDataForView] = useState("")
    const dataLoading = useRef(false)
    const [forceRender, setForceRender] = useState("");
    const firstAttemp = useRef(0)

    const infinityScrollHandle = () => {
        if (dataLoading.current) return;
        const isActiveCatArr = Object.keys(isActiveCategoriesId)
        if (itemsSnapshot && !!itemsSnapshot[4]) {
            dataLoading.current = true;
            if (isActiveCatArr.length > 0) {
                getDataWithInfinityScroll(setItemsSnapshot, "productlist", 5, itemsSnapshot[4], { queryField: "selectedCatagories", queryArray: isActiveCatArr }).catch(() => {
                    Alert.alert(
                        "Connection Failed !",
                        "Server connection failed after trying",
                        [
                            { text: "OK" }
                        ],
                    );
                })
                // return;
            } else {
                getDataWithInfinityScroll(setItemsSnapshot, "productlist", 5, itemsSnapshot[4]).catch(() => {
                    Alert.alert(
                        "Connection Failed !",
                        "Server connection failed after trying",
                        [
                            { text: "OK" }
                        ],
                    );
                })
            }
        }
    }


    useEffect(() => {
        getDataWithOutRealTimeUpdates(setCategories, "catagories");
        getSingleDataWithRealTimeUpdates(setForceRender, "totalSummery", "updateByAdmin")
    }, []);


    useEffect(() => {
        setItemsDataForView([])
        const isActiveCatArr = Object.keys(isActiveCategoriesId)
        if (isActiveCatArr.length > 0) {
            dataLoading.current = true;
            getDataWithInfinityScroll(setItemsSnapshot, "productlist", 5, false, { queryField: "selectedCatagories", queryArray: isActiveCatArr }).catch(() => {
                Alert.alert(
                    "Connection Failed !",
                    "Server connection failed after trying",
                    [
                        { text: "OK" }
                    ],
                );
            })
            return;
        }
        else {

            dataLoading.current = true;
            getDataWithInfinityScroll(setItemsSnapshot, "productlist", 5).catch(() => {
                Alert.alert(
                    "Connection Failed !",
                    "Server connection failed after trying",
                    [
                        { text: "OK" }
                    ],
                );
            })
        }
    }, [isActiveCategoriesId])


    useEffect(() => {
        if (itemsSnapshot && itemsSnapshot.length > 0) {
            const data = itemsSnapshot.map((doc) => {
                const item = doc.data()
                item.id = doc.id
                return item
            })
            setItemsDataForView(prv => ([...prv, ...data]))
            dataLoading.current = false;
        }

    }, [itemsSnapshot])


    useEffect(() => {
        if (firstAttemp.current >= 2) {
            setItemsDataForView([])
            const isActiveCatArr = Object.keys(isActiveCategoriesId)
            if (isActiveCatArr.length > 0) {
                dataLoading.current = true;
                getDataWithInfinityScroll(setItemsSnapshot, "productlist", 5, false, { queryField: "selectedCatagories", queryArray: isActiveCatArr }).catch(() => {
                    Alert.alert(
                        "Connection Failed !",
                        "Server connection failed after trying",
                        [
                            { text: "OK" }
                        ],
                    );
                })
                return;
            }
            else {

                dataLoading.current = true;
                getDataWithInfinityScroll(setItemsSnapshot, "productlist", 5).catch(() => {
                    Alert.alert(
                        "Connection Failed !",
                        "Server connection failed after trying",
                        [
                            { text: "OK" }
                        ],
                    );
                })
            }
        } else {
            firstAttemp.current += 1;
        }

    }, [forceRender])

    const handleChipPress = (id) => {
        setisActiveCategoriesId((prv) => {
            if (prv[`${id}`]) {
                delete prv[`${id}`]
            } else {
                prv[`${id}`] = true
            }
            return ({ ...prv })
        })
    }

    const handleCollapseButton = () => {
        setIsCollapse(!isCollapse)
    }

    const getCategoryArray = (inputArray, isCollapse) => {
        let outputArray = [];
        if (inputArray.length >= 5 && isCollapse) {
            outputArray = categories.slice(0, 5).map((doc) => {
                const item = doc.data()
                item.id = doc.id
                return (
                    <TouchableOpacity onPress={() => { handleChipPress(item.id) }} style={isActiveCategoriesId[`${item.id}`] ?
                        styles.activeChip
                        : styles.chip} key={item.id}>
                        <Text style={styles.chipText}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })
            outputArray.push(
                <TouchableOpacity onPress={() => { setIsCollapse((prev) => !prev) }} style={styles.chip} key="more">
                    <Text style={styles.chipText}>...{inputArray.length - 5} more</Text>
                </TouchableOpacity>
            )
        }
        else {
            outputArray = outputArray = inputArray.map((doc) => {
                const item = doc.data()
                item.id = doc.id
                return (
                    <TouchableOpacity onPress={() => { handleChipPress(item.id) }} style={isActiveCategoriesId[`${item.id}`] ?
                        styles.activeChip
                        : styles.chip} key={item.id}>
                        <Text style={styles.chipText}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })
        }
        return outputArray
    }


    return (
        <View style={styles.cardContainer}>
            <View style={{ backgroundColor: '#0D0D0D', height: '23%' }}>
                <ScrollView style={styles.section}>
                    <View style={[styles.categoriesHeader , GlobalStyle.sidePadding]}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <TouchableOpacity hidden={categories.length <= 5} onPress={handleCollapseButton} style={styles.collapseButton}>
                            <AntDesign name={isCollapse ? 'down' : 'up'} size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.chipContainer,  GlobalStyle.sidePadding]}>
                        {
                            categories ? getCategoryArray(categories, isCollapse) : <ActivityIndicator size="large" color="#fff" />
                        }
                    </View>
                </ScrollView>
                <View style={[styles.section,  GlobalStyle.sidePadding]}>
                    <Text style={styles.sectionTitle}>All Items</Text>
                </View>
            </View>
            <View style={[{ height: '77%' },  GlobalStyle.sidePadding]}>

                {itemsDataForView && (<FlatList
                    ListFooterComponent={itemsSnapshot[4] ? <ActivityIndicator color="#fff" /> : (<Text style={{ color: "white", textAlign: 'center' }}>No more items found ! </Text>)}
                    onEndReached={infinityScrollHandle}
                    data={itemsDataForView}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("ProductDetailsScreen", { item: item })}>
                            <ProductCard pdUIAddToCardHandle={() => navigation.navigate("ProductDetailsScreen", { item: item })} cardsType="button" item={item} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />)
                }
            </View>
        </View>
    );
};
{/* <View style={styles.cardContainer}>
    {itemList.map((item) => (
        <ProductCard cardsType="button" title={item.title} category={item.category} price={item.price} key={item.id} />
        ))}
    </View> */}


export default FilteredProduct;
