import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import Modal from 'react-native-modal';

import Explain from '../../svg/explaining.svg'

const widthHi = '100%';
const heightHi = '80%';

const ExplainModal = (props) => {
    return (
        <Modal
            isVisible={props.isModalVisible}
            hasBackdrop={true}
            backdropOpacity={1}
            backdropColor={'rgba(51,102,153,1)'}
            animationIn={"slideInRight"}
            animationOut={"slideOutRight"}
        >
            <View style={{ flex: 0.8 }}>
                <Text style={styles.explainText}>Чтобы отметить количество выпитой воды, нажимай на нужный стаканчик и бутылка будет постепенно пополняться</Text>
                <Explain width={widthHi} height={heightHi} />
            </View>
        </Modal>
    )
};

export default ExplainModal;

const styles = StyleSheet.create({
    explainText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25,
    },
})