import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import Heading from '../components/Heading'
import profile from '../assets/images/profile.png'
import ProductCard from '../components/ProductCard'
import { ProfileOrders as styles } from '../styles'

const itemList = [
    {
        id: 0,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
        status: 'pending'
    },
    {
        id: 1,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
        status: 'done'
    },
    {
        id: 2,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
        status: 'failed'
    },
    {
        id: 3,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
        status: 'pending'
    },
    {
        id: 4,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
        status: 'done'
    },
    {
        id: 5,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
        status: 'failed'
    },
    {
        id: 6,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
        status: 'pending'
    },
    {
        id: 7,
        title: 'Spacy fresh crab',
        category: 'Wareonk kita',
        price: '35',
        status: 'done'
    },
]

const ProfileOrders = ({ navigation }) => {
    return (
        <View>
            <Heading navigation={navigation} title="Profile" />
            <View style={styles.profileSection}>
                <View style={styles.profileImage}>
                    <Image source={profile} />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileEmail}>anamsingho@gmail.com</Text>
                </View>
            </View>
            <View style={styles.tab}>
                <TouchableOpacity style={styles.tabOption}>
                    <Text style={styles.tabOptionText}>All Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabOption}>
                    <Text style={styles.tabOptionText}>Processing</Text>
                </TouchableOpacity>
            </View>
            <FlatList style={styles.cardContainer} data={itemList} renderItem={
                ({ item }) => (<ProductCard cardsType="chip" title={item.title} category={item.category} price={item.price} />)
            } keyExtractor={item => item.id} />

        </View>
    )
}

export default ProfileOrders