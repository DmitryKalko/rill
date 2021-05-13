import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Modal from 'react-native-modal';

import Hi from '../../svg/hi.svg';

const widthHi = '100%';
const heightHi = '70%';

const HiModal = (props) => {
    const { onPress } = props;
    return (
        <Modal
            isVisible={props.showHi}
            hasBackdrop={true}
            backdropOpacity={1}
            backdropColor={'rgba(51,102,153,1)'}
            animationIn={"slideInRight"}
            animationOut={"slideOutRight"}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.firstRow}>Привет, {props.name}!</Text>
                <Text style={styles.secondRow}>Меня зовут Мэри</Text>
                <Text style={styles.thirdRow}>Я буду помогать тебе правильно пить воду</Text>
                <Hi width={widthHi} height={heightHi} />
                <TouchableOpacity
                    style={styles.buttonHi}
                    onPress={onPress}
                >
                    <Text style={styles.buttonText}>Привет Мэри!</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    )
};

export default HiModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstRow: {
        marginTop: 10,
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
    buttonHi: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 150,
        backgroundColor: "#06bcee",
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontFamily: 'Arial',
    },
});