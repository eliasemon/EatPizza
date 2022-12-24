import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Banner from '../assets/images/banner.png'
import ImagePhoto from '../assets/images/ItemPhoto.png'

const itemList = [
    {
        id: 0,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 1,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 2,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 3,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 4,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 5,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 6,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
    {
        id: 7,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
    },
]

const Home = () => {
    const [categories, setCategories] = useState([
        {
            id: 0,
            title: 'Ice Cream',
            activeStatus: false,
        },
        {
            id: 1,
            title: 'Burgers',
            activeStatus: false,
        },
        {
            id: 2,
            title: 'Pizza',
            activeStatus: false,
        },
        {
            id: 3,
            title: 'Sandwich',
            activeStatus: false,
        },
        {
            id: 4,
            title: 'Chips',
            activeStatus: false,
        },
        {
            id: 5,
            title: 'Pitas',
            activeStatus: false,
        },
        {
            id: 6,
            title: 'Fried Cicken',
            activeStatus: false,
        },
        {
            id: 7,
            title: 'Onion Rings',
            activeStatus: false,
        },
        {
            id: 8,
            title: 'Hot Dogs',
            activeStatus: false,
        },
        {
            id: 9,
            title: 'Tacos',
            activeStatus: false,
        },
        {
            id: 10,
            title: 'Nuggets',
            activeStatus: false,
        },
    ])

    const handleChipPress = (id) => {
        setCategories((prev) => {
            const temp = [...prev];
            temp[id].activeStatus = !temp[id].activeStatus;
            return temp;
        })
    }

    return (
        <ScrollView>
            <View style={styles.heading}>
                <Text style={styles.title}>Find Your Favorite Food</Text>
                <TouchableOpacity style={styles.notification}>
                    <FontAwesome5 name="bell" size={32} color="green" />
                </TouchableOpacity>
            </View>
            <View>
                <Image source={Banner} style={styles.banner} />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <View style={styles.chipContainer}>
                    {categories.map((item) => <TouchableOpacity onPress={() => { handleChipPress(item.id) }} style={item.activeStatus ? styles.activeChip : styles.chip} key={item.id}><Text style={styles.chipText}>{item.title}</Text></TouchableOpacity>)}
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>All Items</Text>
                <View style={styles.cardContainer}>
                    {itemList.map((item) => (
                        <View style={styles.card} key={item.id}>
                            <View style={styles.cardProduct}>
                                <Image source={ImagePhoto} style={styles.cardImage} />
                                <View style={styles.cardTextBox}>
                                    <Text style={styles.cardTextTitle}>Spacy fresh crab</Text>
                                    <Text style={styles.cardTextCategory}>Waroenk kita</Text>
                                    <Text style={styles.cardTextPrice}>$ 35</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <FontAwesome5 name="cart-plus" size={26} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

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
        marginVertical: 10
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18
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
    }
});

export default Home;
