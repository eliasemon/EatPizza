import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default StyleSheet.create({
    inputGroup: {
        marginVertical: 25
    },
    input: {
        color: "white",
        backgroundColor: "#252525",
        width: "90%",
        alignSelf: 'center',
        borderRadius: 10,
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 20,
    },
    sectionBlock: {
        width: '50%',
        height: 180,
        backgroundColor: '#252525',
        marginVertical: 5,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 80,
        alignSelf: 'center',
        borderRadius: 10
    },
})
