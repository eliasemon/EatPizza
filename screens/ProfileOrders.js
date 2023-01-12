import { View, Text, Image, FlatList } from 'react-native'
import Heading from '../components/Heading'
import profile from '../assets/images/profile.png'
import ProductCard from '../components/ProductCard'
import { GlobalStyle, ProfileOrdersStyle as styles } from '../styles'
import { itemList } from './../constants/dummy';


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
                <Text style={styles.tabOptionText}>Last 5 Orders</Text>
            </View>
            {/* <ScrollView>
                {
                    // console.log(itemList.length)
                    // itemList.map((item) => <Text key={item.id} style={{ color: '#fff' }}>Hello</Text>)
                    itemList.map((item) => <ProductCard title={item.title} />)
                    // itemList.map((item) => <ProductCard cardsType="chip" title={item.title} category={item.category} price={item.price} />)
                }
            </ScrollView> */}
            <FlatList style={[GlobalStyle.sidePadding, styles.cardContainer]} data={itemList} renderItem={
                ({ item }) => (<ProductCard cardsType="chip" item={item} />)
            } keyExtractor={item => item.id} />
            {/* <FlatList style={styles.cardContainer} data={itemList} renderItem={
                ({ item }) => {
                    return (
                        <ProductCard
                        // cardsType="chip"
                        // title={item.title}
                        // category={item.category}
                        // price={item.price}
                        />
                    )
                }
            }
             keyExtractor={item => item.id}
            /> */}
            {/* <FlatList
                data={itemList}
                renderItem={<Text>Hello</Text>}
                keyExtractor={item => item.id}
            /> */}

        </View>
    )
}

export default ProfileOrders