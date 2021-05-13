import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { LinearGradient } from 'expo-linear-gradient';
import SyncStorage from 'sync-storage';

import HiModal from './modalScreens/HiModal';


var radio_props = [
    { label: 'Поддерживаю здоровье', value: 0 },
    { label: 'Хочу похудеть', value: 1 }
];

class Goals extends Component {
    state = {
        goal: null,
        showHi: false,
        name: '',
    };

    // componentDidMount() {  // БЫЛ НЕПЛАВНЫ ПЕРЕХОД
    //     let localData = JSON.parse(SyncStorage.get('registrationData'));
    //     this.setState({ name: localData.name });
    // }
    checkField = () => {
        const { goal } = this.state;
        let localData = JSON.parse(SyncStorage.get('registrationData'));
        this.setState({ name: localData.name });
        if (goal === null) {
            this.failAlert();
        } else {
            this.setGoalsData();
        }
    }

    failAlert = () => {
        Alert.alert(
            'ОЙ!',
            'Пожалуйста, выберите вашу цель',
            [{ text: 'Выбрать' }],
            { cancelable: false }
        );
    };

    setGoalsData = () => {
        let data = JSON.stringify(this.state);
        SyncStorage.set('goalsData', data);
        this.setState({ goal: null, showHi: true });
        //this.props.navigation.navigate('HiScreen');
    }

    toMain = () => {
        setTimeout(() => this.setState({ showHi: false }), 400);
        this.props.navigation.navigate('MainScreen');
    }

    render() {
        const { showHi, name } = this.state;
        console.log(this.state)
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    colors={['rgb(153,204,204)', 'transparent']}
                    style={styles.background}
                />
                <Text style={styles.title}>Ваша цель?</Text>
                <View>
                    <RadioForm
                        radio_props={radio_props}
                        labelStyle={{ fontSize: 20, color: '#fff' }}
                        initial={-1}
                        buttonColor={'#06bcee'}
                        selectedButtonColor={'#06bcee'}
                        animation={true}
                        onPress={(value) => { this.setState({ goal: value }) }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        //onPress={() => this.props.navigation.navigate('HiScreen')}
                        onPress={this.checkField}
                    >
                        <Text style={styles.buttonText}>Далее</Text>
                    </TouchableOpacity>
                </View>
                <HiModal
                    showHi={showHi}
                    name={name}
                    onPress={this.toMain}
                />
            </SafeAreaView>
        )
    }
};

export default Goals;

const size = Dimensions.get('window');
const h = size.height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(51,102,153,1)',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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
    title: {
        color: "white",
        fontSize: 20,
        marginBottom: 50,
        textAlign: "center"
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: h,
    },
});


