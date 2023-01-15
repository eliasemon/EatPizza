import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default StyleSheet.create({
    container: {
        marginVertical: '30%',
        alignItems: 'center'
    },
    primaryText: {
        marginVertical: 15,
        color: 'green',
        fontSize: 36
    },
    secondaryText: {
        color: '#fff',
        fontSize: 28
    },
    continueButton: {
        backgroundColor: COLORS.primary,
        marginTop: '20%',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10
    },
    continueButtonText: {
        fontSize: 18,
        color: '#fff'
    }
})