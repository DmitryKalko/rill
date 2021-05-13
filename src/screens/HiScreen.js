import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Hi from '../svg/hi.svg';

const widthHi = '100%';
const heightHi = '60%';

const HiScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.firstRow}>Привет!</Text>
            <Text style={styles.secondRow}>Меня зовут Мэри</Text>
            <Text style={styles.thirdRow}>Я буду помогать тебе правильно пить воду</Text>
            <Hi width={widthHi} height={heightHi} />
            <TouchableOpacity 
            style={styles.button}
            onPress={() => props.navigation.navigate('MainScreen')}
            >
                <Text style={styles.buttonText}>Привет Мэри!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HiScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(51,102,153,1)'
    },
    firstRow: {
        marginTop: 20,
        color: 'white',
        fontSize: 30,
        fontFamily: 'Arial',
    },
    secondRow: {
        marginTop: 10,
        color: 'white',
        fontSize: 20,
        fontFamily: 'Arial',
    },
    thirdRow: {
        marginTop: 10,
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Arial',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 150,
        backgroundColor: "#06bcee",
        borderRadius: 10,
        marginTop: 50,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontFamily: 'Arial',
    },
})