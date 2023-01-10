import { useState, useEffect , useRef} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Banner from '../assets/images/banner.png'
import { itemList, categories as categoriesList } from '../constants/dummy'
import ProductCard from '../components/ProductCard';
import { getDataWithOutRealTimeUpdates, getDataWithInfinityScroll } from '../utils';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStoreActions } from 'easy-peasy';
import { GlobalStyle } from '../styles';


const dataHeadinforUi = [
    {
        id : "type",
        type : "ui"
    }
]


const Home = ({navigation}) => {
    const LoadingChanger = useStoreActions(actions => actions.LoadingChanger)

    const [categories, setCategories] = useState("")
    const [isCollapse, setIsCollapse] = useState(true)
    const [isActiveCategoriesId, setisActiveCategoriesId] = useState({})
    const [itemsSnapshot, setItemsSnapshot] = useState("")
    const [itemsDataForView , setItemsDataForView] = useState(dataHeadinforUi)
    const flatListRef = useRef(null)
    const dataLoading = useRef(false)
    

    const infinityScrollHandle = () =>{
        if(dataLoading.current) return;
        const isActiveCatArr = Object.keys(isActiveCategoriesId)
        if(!itemsSnapshot[4]){
            console.log("Items List End")
        }
        if(itemsSnapshot && !!itemsSnapshot[4]){
            dataLoading.current = true;
            if(isActiveCatArr.length > 0){
                getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5 , itemsSnapshot[4] , {queryField : "selectedCatagories" , queryArray : isActiveCatArr}).catch(v => console.log(v))
                // return;
            }else{
                getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5 , itemsSnapshot[4]).catch(v => console.log(v))
            }
        }
    }


    // if (itemsSnapshot.length > 0) {
    //     console.log(itemsSnapshot[0].data())
    // }

    useEffect(() => {
        // getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5)
        getDataWithOutRealTimeUpdates(setCategories, "catagories").then(()=>{
            LoadingChanger({status : false , type : "BootLoaderUi"})
        });
    }, []);
    

    useEffect(()=>{
        if(itemsSnapshot && itemsSnapshot.length > 0){
            const data =  itemsSnapshot.map((doc) =>{
            const item = doc.data()
            item.id = doc.id
            return item
           })
           setItemsDataForView(prv => ([...prv , ...data]))
           dataLoading.current = false;
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

    useEffect(() => {
        const isActiveCatArr = Object.keys(isActiveCategoriesId)
            if(isActiveCatArr.length > 0){
                getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5 , false , {queryField : "selectedCatagories" , queryArray : isActiveCatArr}).catch(v => console.log(v))
                return;
            }
            else{ 
                getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5 ).catch(v => console.log(v))
            }
    }, [isActiveCategoriesId])

    const handleChipPress = (id) => {
        const activeID = {}
        activeID[`${id}`] = true
        navigation.navigate("FilteredProduct", {activeID : activeID})
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

    
    const PageUi = (
        <View style={{height : 270 }}>
            <View style={[styles.heading, GlobalStyle.sidePadding]}>
                <Text style={styles.title}>Find Your Favorite Food</Text>
                <TouchableOpacity  style={styles.notification} onPress={()=> navigation.navigate("Notification")}>
                    <FontAwesome name="bell-o" size={32} color="white" />
                </TouchableOpacity>
            </View>
            <View>
                <Image source={Banner} style={styles.banner} />
            </View>

        </View>
    )

    return (
        <View style={styles.cardContainer}>
            <FlatList
                onEndReached={infinityScrollHandle}
                stickyHeaderIndices={[1]}
                ListHeaderComponent={PageUi}
                data={itemsDataForView}
                ref={flatListRef}
                renderItem={({ item }) => {
                    if (item.type) {
                        return (
                            <View style={[{ backgroundColor: '#0D0D0D' }, GlobalStyle.sidePadding]}>
                                <View style={styles.section}>
                                    <View style={styles.categoriesHeader}>
                                        <Text style={styles.sectionTitle}>Categories</Text>
                                        <TouchableOpacity onPress={handleCollapseButton} style={styles.collapseButton}>
                                            <AntDesign name={isCollapse ? 'down' : 'up'} size={22} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.chipContainer}>
                                        {
                                            categories ? getCategoryArray(categories, isCollapse) : <ActivityIndicator size="large" color="#fff" />}
                                    </View>
                                </View>
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>All Items</Text>
                                </View>
                            </View>
                        )
                    }
                    return (
                        <TouchableOpacity style={GlobalStyle.sidePadding} onPress={() => navigation.navigate("ProductDetailsScreen", { item: item })}>
                            <ProductCard pdUIAddToCardHandle={()=> navigation.navigate("ProductDetailsScreen", {item : item})} cardsType="button" item={item}/>
                        </TouchableOpacity>
                        )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    );
};
{/* <View style={styles.cardContainer}>
    {itemList.map((item) => (
        <ProductCard cardsType="button" title={item.title} category={item.category} price={item.price} key={item.id} />
        ))}
    </View> */}

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: "white",
        fontSize: 32,
        width: '70%'
    },
    notification: {
        height: 54,
        width: 54,
        margin: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255, .12)'
    },
    banner: {
        width: '100%',
        marginVertical: 5,
        // display : "none",
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

export default Home;
