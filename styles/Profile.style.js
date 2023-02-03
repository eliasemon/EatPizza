import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    profileSection: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly'
        justifyContent: 'center',
    },
    profileImage: {
        marginRight: 20,
        borderWidth: 6,
        borderColor: '#FFFFFF4C',
        borderRadius: 100
    },
    profileInfo: {
    },
    profileName: {
        color: '#fff',
        fontSize: 28
    },
    profileEmail: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16
    },
    card: {
        width: '100%',
        height: 70,
        backgroundColor: '#282828',
        marginVertical: 10,
        borderRadius: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        marginHorizontal: 20
    },
    title: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 19
    }
})