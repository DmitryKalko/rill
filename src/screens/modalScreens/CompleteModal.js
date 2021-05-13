import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import Modal from 'react-native-modal';

import Sucsess from '../../svg/sucsess2.svg';

const widthHi = '100%';
const heightHi = '80%';

const CompleteModal = (props) => {
    return (
        <Modal
            isVisible={props.completeBottle}
            hasBackdrop={true}
            backdropOpacity={1}
            backdropColor={'rgba(51,102,153,1)'}
            animationIn={"slideInRight"}
            animationOut={"slideOutRight"}
        >
            <View style={styles.sucsess} >
                <Text style={styles.sucsessText}>У тебя получилось!</Text>
                <Text style={styles.sucsessText}>Увидимся завтра</Text>
                <Sucsess width={widthHi} height={heightHi} />
            </View>
        </Modal>
    )
};

export default CompleteModal;

const styles = StyleSheet.create({
    sucsess: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sucsessText: {
        color: 'white',
        fontSize: 30
    },
})