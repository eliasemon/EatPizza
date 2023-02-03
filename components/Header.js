import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Banner from '../assets/images/banner.png'
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Image , ActivityIndicator } from "react-native";

const Header = (props) => {
    const { headerHeight , categories , getCategoryArray , handleCollapseButton , isCollapse} = props;
    return (
        <>
            <View
                style={[
                    styles.subHeader,
                    {
                        height: headerHeight / 2,
                    },
                ]}>
                <View>
                    <View style={styles.heading}>
                        <Text style={styles.title}>Find Your Favorite Food</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={styles.notification}>
                            {/* <FontAwesome name="bell-o" size={32} color="white" /> */}
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image source={Banner} style={styles.banner} />
                    </View>

                </View>
            </View>
            <View
                style={[
                    styles.subHeader,
                    {
                        height: headerHeight / 2,
                    },
                ]}>
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
                                categories ? getCategoryArray(categories, isCollapse) : <ActivityIndicator size="large" color="#fff" />}
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>All Items</Text>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    subHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
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
export default Header;