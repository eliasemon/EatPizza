import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    profileSection: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    profileImage: {
        marginRight: 20,
        borderWidth: 4,
        borderColor: "green",
        borderRadius: 100
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
        width: '60%',
        borderRadius: 10,
        height: 65,
        backgroundColor: '#282828',
        marginVertical: 20,
        borderRadius: 15,
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    tabOption: {
        padding: 10,
        borderRadius: 10,
        // backgroundColor: 'rgba(0,255,0,0.1)'
    },
    tabOptionText: {
        color: '#fff'
    },
    cardContainer: {
        marginBottom: 30
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
