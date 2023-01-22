import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
        width: '80%',
        height: 50,
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
        color: '#fff',
        fontSize: 18
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
