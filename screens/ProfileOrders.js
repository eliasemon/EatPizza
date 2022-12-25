import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import Heading from '../components/Heading'
import profile from '../assets/images/profile.png'
import ProductCard from '../components/ProductCard'

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

const styles = StyleSheet.create({
    profileSection: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    profileName: {
        color: '#fff',
        fontSize: 28
    },
    profileEmail: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16
    },
    tab: {
        width: '65%',
        height: 65,
        backgroundColor: '#282828',
        marginVertical: 20,
        borderRadius: 15,
        paddingHorizontal: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    tabOption: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0,255,0,0.1)'
    },
    tabOptionText: {
        color: '#fff'
    },
    cardContainer: {
        marginBottom: '20%'
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

})

export default ProfileOrders