import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        width: '100%',
        height: 100,
        backgroundColor: '#333333',
        marginVertical: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    statusBox: {
        width: '15%',
    },
    messageBox: {
        width: '80%',
        margin: 10
    },
    message: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 20
    },
    time: {
        color: 'rgba(255,255,255,.5)',
        fontSize: 15
    }
});