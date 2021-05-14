import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },
    titleText: {
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 10,
        color: 'black'
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20
    }, 
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
    },
    btn: {
        marginRight: 8,
        marginLeft: 8,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: "transparent",
    },
    buttonText: {
      color: 'white',
      fontSize: 18
    },
    whiteText: {
        color: 'white'
    },
    tags: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tag: {
        margin: 5,
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 5,
        backgroundColor: '#222',
        color: 'white'
    },
    tagText: {
        color: 'white'
    },
    emoji: { 
        fontSize: 35 
    },
})