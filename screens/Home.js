import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Banner from '../assets/images/banner.png'
import { itemList, categories as categoriesList } from '../constants/dummy'
import ProductCard from '../components/ProductCard';
import { showDataWithOutPagination } from '../utils';



const Home = ({ navigation }) => {
    const [categories, setCategories] = useState("")
    const [isCollapse, setIsCollapse] = useState(true)

    useEffect(() => {
        showDataWithOutPagination(setCategories, "catagories");
    }, []);
    const handleChipPress = (id) => {
        // setCategories((prev) => {
        //     const temp = [...prev];
        //     temp[id].activeStatus = !temp[id].activeStatus;
        //     return temp;
        // })
    }

    const getCategoryArray = (inputArray, isCollapse) => {
        let outputArray = [];
        if (inputArray.length >= 5 && isCollapse) {
            outputArray = categories.slice(0, 5).map((doc) => {
                const item = doc.data()
                item.id = doc.id
                return (
                    <TouchableOpacity onPress={() => { handleChipPress(item.id) }} style={item.activeStatus ?
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
                    <TouchableOpacity onPress={() => { handleChipPress(item.id) }} style={item.activeStatus ?
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
        <View>
            <View style={styles.heading}>
                <Text style={styles.title}>Find Your Favorite Food</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={styles.notification}>
                    <FontAwesome name="bell-o" size={32} color="green" />
                </TouchableOpacity>
            </View>
            <View>
                <Image source={Banner} style={styles.banner} />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <View style={styles.chipContainer}>
                    {
                        categories ? getCategoryArray(categories, isCollapse) : <ActivityIndicator size="large" color="#fff" />}
                </View>
            </View>

        </View>
    )

    return (
        <View style={styles.cardContainer}>
            <FlatList
                stickyHeaderIndices={[1]}
                onEndReached={() => { console.log('ho vai kaj kore') }}
                ListHeaderComponent={PageUi}
                data={itemList}
                renderItem={({ item }) => {
                    if (item.type) {
                        return (<View style={styles.section}>
                            <Text style={styles.sectionTitle}>All Items</Text>
                        </View>)
                    }
                    return (
                        <ProductCard cardsType="button" title={item.title} category={item.category} price={item.price} />
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
        marginVertical: 30
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        paddingVertical: 10,
        backgroundColor: 'rgba(0,0,0,.7)',
        textAlign: 'center'
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
});

export default Home;
