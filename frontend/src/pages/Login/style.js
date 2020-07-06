import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#3FB55D',
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        flex: 2,
        flexDirection: "column",
        backgroundColor: '#3FB55D',
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
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
    logoImage: {
        flex: 0,
        opacity: 1,
        //backgroundColor: 'pink',
        position: "absolute",
        left: -20, 
        bottom: -20
    }
    
});
