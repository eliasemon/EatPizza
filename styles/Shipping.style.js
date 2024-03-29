import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default StyleSheet.create({
    locationCard: {
        width: '100%',
        // height: '30%',
        backgroundColor: '#282828',
        marginVertical: 10,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: 'center',
    },
    locationDetails: {
        flexDirection: 'row',
    },
    locationCardTitle: {
        color: 'rgba(255,255,255,0.7)',
        marginVertical: 10,
        fontSize: 17,
        marginLeft: 10,
    },
    locationCardValue: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 10
    },
    locationTextBox: {
        color: '#fff',
        width: '80%',
        marginLeft: '5%',
        paddingLeft: 15,
        fontSize: 15,
        backgroundColor: 'rgba(255,255,255,.2)',
        borderRadius: 5
    },
    setLocationButton: {
        backgroundColor: COLORS.primary,
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 15,
    },
})
