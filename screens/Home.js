import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Banner from '../assets/images/banner.png'
import { itemList, categories as categoriesList } from '../constants/dummy'
import ProductCard from '../components/ProductCard';
import BackgroundContainer from '../components/BackgroundContainer';



const Home = ({navigation}) => {
    const [categories, setCategories] = useState(categoriesList)

    const handleChipPress = (id) => {
        setCategories((prev) => {
            const temp = [...prev];
            temp[id].activeStatus = !temp[id].activeStatus;
            return temp;
        })
    }

    return (
        <BackgroundContainer>
        <ScrollView>
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
                        categories.map((item) => (
                            <TouchableOpacity onPress={() => { handleChipPress(item.id) }} style={item.activeStatus ?
                                styles.activeChip
                                : styles.chip} key={item.id}>
                                <Text style={styles.chipText}>{item.title}</Text>
                            </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>All Items</Text>
                <View style={styles.cardContainer}>
                    {itemList.map((item) => (
                        <ProductCard title={item.title} category={item.category} price={item.price} key={item.id} />
                    ))}
                </View>
            </View>
        </ScrollView>
            <View style={styles.navigation}>
                <TouchableOpacity>
                    <FontAwesome name="home" size={36} color="green" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome name="user" size={36} color="green" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome name="shopping-cart" size={36} color="green" />
                </TouchableOpacity>
            </View>
        </BackgroundContainer>
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
    },
    navigation: {
        elevation: 10,
        backgroundColor: '#333333',
        width: '100%',
        marginBottom: 5,
        height: 70,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderRadius: 15,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default Home;
