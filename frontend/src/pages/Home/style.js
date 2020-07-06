import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#3FB55D',
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        width: '70%',
        borderRadius: 100,
        margin: 10,
    },
    button: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: 'white',
        width: '70%',
        padding: 10,
        alignItems: "center",
        margin: 10,
    },
    whiteText: {
        color: 'white',
    },
    header: {
        fontSize: 48,
        margin: 10,
        fontWeight: 'bold'
    },
    title: {
        fontWeight: 'bold',
        margin: 10,
    },
    petImage: {
        width: 125,
        height: 95,
        backgroundColor: 'grey'
    },
    card: {
        height: 120, 
        margin: 10,
        alignItems: 'center',
    },
    ongImage: {
        width: 110,
        height: 110,
        backgroundColor: 'grey',
        borderRadius: 100,
    },
});
