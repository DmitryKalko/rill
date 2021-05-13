import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import SyncStorage from 'sync-storage';
import Modal from 'react-native-modal';


import Man from '../../svg/man.svg';
import Woman from '../../svg/woman.svg';

class ModalMenu extends Component {
    state = {
        name: '',
        age: null,
        weight: null,
        male: '',
        physicalActivity: null,
        showPersonalData: false,
        allVolume: 0,
    };

    componentDidMount() {
        let localData = JSON.parse(SyncStorage.get('registrationData'));
        let allVolume = SyncStorage.get('allVolume', allVolume || 0);
        console.log(allVolume)
        this.setState({
            name: localData.name,
            age: localData.age,
            weight: localData.weight,
            male: localData.male,
            physicalActivity: localData.physicalActivity,
            allVolume: allVolume,
        });
    }

    setRegistrationData = () => {
        let data = JSON.stringify(this.state);
        SyncStorage.set('registrationData', data);
        console.log(SyncStorage.get('registrationData'));
        this.showPesronalBlock();
    }

    showPesronalBlock = () => {
        const { showPersonalData } = this.state;
        this.setState({ showPersonalData: !showPersonalData })
    }

    render() {
        const { name, age, weight, physicalActivity, male, showPersonalData, allVolume } = this.state;
        return (
            <Modal
                isVisible={this.props.showRightMenu}
                hasBackdrop={true}
                backdropOpacity={1}
                coverScreen={false}
                backdropColor={'rgba(51,102,153,1)'}
                animationIn={"slideInRight"}
                animationOut={"slideOutRight"}
            >
                <View style={styles.leftLine}></View>

                <View style={styles.menu} >
                    <View style={styles.avatar}>
                        {male === 'Мужской'
                            ? <Man width={widthHi} height={heightHi} />
                            : <Woman width={widthHi} height={heightHi} />
                        }
                    </View>

                    <View style={showPersonalData === false ? styles.info : { display: 'none' }}>
                        <Text style={styles.text}>Дней в приложении: {this.props.countOfDays}</Text>
                        <Text style={styles.text}>Всего выпито воды: {allVolume / 1000} л</Text>
                    <Text style={styles.text}>Среднее потребление: {allVolume / this.props.countOfDays / 1000} л/день</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.showPesronalBlock}
                        >
                            <Text style={styles.text}>Личные данные</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={showPersonalData === false ? styles.personalBlock : { display: 'block' }} >
                        <TextInput
                            placeholder={name}
                            placeholderTextColor='black'
                            onChangeText={(value) => this.setState({ name: value })}
                            style={styles.input} />
                        <TextInput
                            placeholder={`${age} лет`}
                            placeholderTextColor='black'
                            style={styles.input}
                            onChangeText={(value) => this.setState({ age: value })}
                            keyboardType="numeric" />
                        <TextInput
                            placeholder={`${weight} кг`}
                            placeholderTextColor='black'
                            style={styles.input}
                            onChangeText={(value) => this.setState({ weight: value })}
                            keyboardType="numeric" />
                        <TextInput
                            placeholder={`${physicalActivity} ч активности`}
                            placeholderTextColor='black'
                            style={styles.input}
                            onChangeText={(value) => this.setState({ physicalActivity: value })}
                            keyboardType="numeric" />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.setRegistrationData}
                        >
                            <Text
                                style={styles.text}
                            >OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}
export default ModalMenu;

const size = Dimensions.get('window');
const h = size.height;
const w = size.width;
const widthHi = '100%';
const heightHi = '80%';

const styles = StyleSheet.create({
    leftLine: {
        flex: 1,
        width: 6,
        height: h / 5,
        backgroundColor: '#DBDBDB',
        borderRadius: 50,
        position: 'absolute',
        left: -5,
        top: h * 0.4
    },
    menu: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 100,
        width: 200,
        height: 200,
        marginBottom: 20,
        paddingTop: 10
    },
    input: {
        height: 50,
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center",
        marginBottom: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#06bcee",
        borderRadius: 10,
        marginTop: 10
    },
    text: {
        color: "white",
        fontSize: 20,
        fontFamily: 'Arial',
        padding: 15
    },
    info: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    personalBlock: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'none'
    }
});
