import { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from "react-native";
import ProductCard from '../components/ProductCard';
import { getDataWithOutRealTimeUpdates, getDataWithInfinityScroll } from '../utils';
import { AntDesign } from '@expo/vector-icons';



const FilteredProduct = ({ route, navigation }) => {
    const { activeID } = route.params;
    const [categories, setCategories] = useState("")
    const [isCollapse, setIsCollapse] = useState(true)
    const [isActiveCategoriesId, setisActiveCategoriesId] = useState(activeID)
    const [itemsSnapshot, setItemsSnapshot] = useState("")
    const [itemsDataForView , setItemsDataForView] = useState("")

    


    const infinityScrollHandle = () => {
        const isActiveCatArr = Object.keys(isActiveCategoriesId)
        if (itemsSnapshot && !!itemsSnapshot[4]) {
            if (isActiveCatArr.length > 0) {
                getDataWithInfinityScroll(setItemsSnapshot, "productlist", 5, itemsSnapshot[4], { queryField: "selectedCatagories", queryArray: isActiveCatArr }).catch(v => console.log(v))
                // return;
            } else {
                getDataWithInfinityScroll(setItemsSnapshot, "productlist", 5, itemsSnapshot[4]).catch(v => console.log(v))
            }
        }
    }


    if (itemsSnapshot.length > 0) {
        console.log(itemsSnapshot[0].data())
    }

    useEffect(() => {
        // getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5)
        getDataWithOutRealTimeUpdates(setCategories, "catagories");
    }, []);


    useEffect(() => {
        const isActiveCatArr = Object.keys(isActiveCategoriesId)
        if (isActiveCatArr.length > 0) {
            getDataWithInfinityScroll(setItemsSnapshot, "productlist", 5, false, { queryField: "selectedCatagories", queryArray: isActiveCatArr }).catch(v => console.log(v))
            return;
        }
        else {
            getDataWithInfinityScroll(setItemsSnapshot, "productlist", 5).catch(v => console.log(v))
        }
    }, [isActiveCategoriesId])


    useEffect(()=>{
        if(itemsSnapshot && itemsSnapshot.length > 0){
           const data =  itemsSnapshot.map(doc => doc.data())
           setItemsDataForView(prv => ([...prv , ...data]))
        //    if(Object.keys(isActiveCategoriesId).length > 0){
        //         // (async()=>{
        //         //    await flatListRef.current.scrollToOffset({offset : 70 , animated : true})
        //         //     setHomeHeader(false)
        //         // })()
        //         // await flatListRef.current.scrollToOffset({offset : 276 , animated : true})
        //         setHomeHeader(false)
                  
        //    }
        }
        
    },[itemsSnapshot])

    const handleChipPress = (id) => {
        setItemsDataForView("")
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
            <View style={{ backgroundColor: '#0D0D0D' }}>
                <View style={styles.section}>
                    <View style={styles.categoriesHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <TouchableOpacity onPress={handleCollapseButton} style={styles.collapseButton}>
                            <AntDesign name={isCollapse ? 'down' : 'up'} size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chipContainer}>
                        {
                            categories ? getCategoryArray(categories, isCollapse) : <ActivityIndicator size="large" color="#fff" />
                        }
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>All Items</Text>
                </View>
            </View>
            {itemsDataForView && (<FlatList
                onEndReached={infinityScrollHandle}
                data={itemsDataForView}
                renderItem={({ item }) => (<ProductCard cardsType="button" item={item} />)}
                keyExtractor={item => item.id}
            />) }
            
        </View>
    );
};
{/* <View style={styles.cardContainer}>
    {itemList.map((item) => (
        <ProductCard cardsType="button" title={item.title} category={item.category} price={item.price} key={item.id} />
        ))}
    </View> */}

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 32,
        width: '70%'
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'left',
    },
    categoriesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    collapseButton: {
        paddingHorizontal: 20
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 10,
    },
    chip: {
        backgroundColor: 'rgba(255,255,255,.1)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        margin: 5,
        borderRadius: 20
    },
    activeChip: {
        backgroundColor: 'rgba(0,255,0,.125)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        margin: 5,
        borderRadius: 20
    },
    chipText: {
        color: "#fff"
    },
    cardContainer: {
        // paddingBottom: '20%'
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
});

export default FilteredProduct;
