import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Keyboard,
    Animated,
    Easing,
} from 'react-native';
import LottieView from 'lottie-react-native';
import SyncStorage from 'sync-storage';
import GestureRecognizer from 'react-native-swipe-gestures';


import Glass125 from '../svg/125.svg';
import Glass250 from '../svg/250.svg';
import GlassValue from '../svg/yourValue.svg';

import ModalMenu from './modalScreens/ModalMenu';
import CompleteModal from './modalScreens/CompleteModal';
import ExplainModal from './modalScreens/ExplainModal';


class MainScreen extends Component {
    state = {
        inputMl: false,
        anotherVolume: null,
        dayVolume: null,
        currentVolume: null,
        clearInput: false,
        progress: new Animated.Value(0),
        //move: new Animated.Value(400),
        oneFrameOnMl: null,
        completeBottle: false,
        firstEnter: true,
        isModalVisible: false,
        showRightMenu: false,
        countOfDays: null,
    };

    componentDidMount() {
        let localData = JSON.parse(SyncStorage.get('registrationData'));

        let registrationDate = SyncStorage.get('registrationDate');
        console.log(registrationDate)
        this.howManyDaysInApp(registrationDate);

        //проверка на первый вход

        if(localData !== '') {
            this.setState({ firstEnter:false });
        } else {
            setTimeout(() => this.giveHelp(), 3000);
        }
        
        let currentVolume = SyncStorage.get('currentVolume') || null;
        this.setState({ currentVolume: currentVolume });

        const { male, physicalActivity, weight } = localData;
        if (male === 'Мужской') {
            let dayVolume = 1000 * (weight * 0.03 + physicalActivity * 0.5).toFixed(2);
            this.setState({ dayVolume: +dayVolume });
        } else {
            let dayVolume = 1000 * (weight * 0.025 + physicalActivity * 0.4).toFixed(2);
            this.setState({ dayVolume: +dayVolume });
        }
        setTimeout(() => this.bottleAnimation(), 150);
        this.updateDay();
    }

    howManyDaysInApp = (registrationDate) => {
        let currentDate = new Date().getTime();
        let countOfDays = Math.ceil((currentDate - +registrationDate) / 86400000);
        this.setState({countOfDays: countOfDays});
    }

    giveHelp = () => {
        this.setState({ isModalVisible: true });
        // Animated.timing(this.state.move, {
        //     toValue: 0,
        //     duration: 200,
        //     easing: Easing.linear,
        //     useNativeDriver: true,
        // }).start();
        setTimeout(() => this.hideHelp(), 5000);
    }
    hideHelp = () => {
        // Animated.timing(this.state.move, {
        //     toValue: 400,
        //     duration: 200,
        //     easing: Easing.linear,
        //     useNativeDriver: true,
        // }).start();
        this.setState({ isModalVisible: false });
    }

    bottleAnimation = () => {
        const { dayVolume } = this.state;
        console.log(dayVolume)
        let oneFrameOnMl = 0.17 / dayVolume;
        this.setState({ oneFrameOnMl: oneFrameOnMl });

        Animated.timing(this.state.progress, {
            toValue: 0.2,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
        this.bottleFilling();
    }

    showInput = () => {
        if (this.state.inputMl === false) {
            this.setState({ inputMl: true });
        } else {
            this.setState({ inputMl: false });
        }
    }
    setAnotherValue = () => {
        Keyboard.dismiss();
        const { currentVolume } = this.state;
        let myVolume = this.state.anotherVolume;
        this.setState({ inputMl: false, anotherVolume: null, currentVolume: currentVolume + +myVolume },
            () => this.bottleFilling());
    }
    setFullValue = () => {
        const { currentVolume } = this.state;
        this.setState({ currentVolume: currentVolume + 250 },
            () => this.bottleFilling());
    }

    setHalfValue = () => {
        const { currentVolume } = this.state;
        this.setState({ currentVolume: currentVolume + 125 },
            () => this.bottleFilling());
    }
    bottleFilling = () => {
        const { currentVolume, oneFrameOnMl } = this.state;
        SyncStorage.set('currentVolume', currentVolume);
        let frame = currentVolume * oneFrameOnMl;

        Animated.timing(this.state.progress, {
            toValue: 0.21 + frame,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
        this.checkFullBottle();
    }
    checkFullBottle = () => {
        const { dayVolume, currentVolume } = this.state;
        if (currentVolume === dayVolume || currentVolume > dayVolume) {
            Animated.timing(this.state.progress, {
                toValue: 0.99,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
            this.setState({ currentVolume: dayVolume }); //для корректного отображения оставшегося на сегодня количества воды (расчет в разметке)
            SyncStorage.set('currentVolume', null);
            setTimeout(() => this.setState({ completeBottle: true }), 3001);
        }
    }
    onSwipeLeft = () => {
        this.setState({ showRightMenu: true });
    }

    onSwipeRight = () => {
        this.setState({ showRightMenu: false });
    }

    updateDay = () => {
        const {currentVolume} = this.state;
        setInterval(() => {
            let date = new Date();
            let hour = date.getHours();
            if(hour === 3) {
                let allVolume = SyncStorage.get('allVolume', allVolume || null);
                SyncStorage.set('allVolume', +allVolume + currentVolume);
                this.setState({ completeBottle: false, currentVolume: null },
                    () => this.bottleFilling());
            }
        }, 3000000);
    }

    render() {
        const { 
            dayVolume, 
            isModalVisible, 
            completeBottle, 
            currentVolume, 
            showRightMenu,
            countOfDays
        } = this.state;
        console.log(this.state);

        return (
            <GestureRecognizer
                style={styles.container}
                onSwipeLeft={this.onSwipeLeft}
                onSwipeRight={this.onSwipeRight}
            >
                <View
                    style={this.state.completeBottle === false ? styles.glasses : { display: 'none' }}
                >
                    <TouchableOpacity onPress={this.setFullValue} >
                        <Glass250 />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.setHalfValue} >
                        <Glass125 />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showInput} >
                        <GlassValue />
                    </TouchableOpacity>
                </View>

                <View
                    style={this.state.inputMl === true ? styles.inputBlock : { display: 'none' }}
                >
                    <TextInput
                        style={styles.input}
                        placeholder="сколько вы выпили?"
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({ anotherVolume: value })}
                        value={!this.state.clearInput ? this.state.anotherVolume : null}
                        onSubmitEditing={() => {
                            this.setState({
                                clearInput: !this.state.clearInput
                            })
                        }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.setAnotherValue}
                    >
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>


                <LottieView
                    source={require('../animations/bottle.json')}
                    style={this.state.completeBottle === false ? styles.lottie : { display: 'none' }}
                    progress={this.state.progress}
                    resizeMode='cover'
                />

                <Text
                    style={this.state.completeBottle === false ? styles.info : { display: 'none' }}
                >Дневная норма <Text style={{ fontSize: 25 }}>{dayVolume / 1000}</Text> л</Text>
                <Text
                    style={this.state.completeBottle === false ? styles.info : { display: 'none' }}
                >Осталось на сегодня <Text style={{ fontSize: 25 }}>{(dayVolume / 1000 - currentVolume / 1000).toFixed(2)}</Text> л</Text>

                <CompleteModal completeBottle={completeBottle} />
                <ExplainModal isModalVisible={isModalVisible} />

                <View style={styles.rightLine}></View>

                <ModalMenu showRightMenu={showRightMenu} countOfDays={countOfDays}/>

            </GestureRecognizer>
        )
    }
};
export default MainScreen;

const size = Dimensions.get('window');
const h = size.height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(51,102,153,1)',
        opacity: 1,
        paddingTop: 40
    },
    glasses: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        width: 150,
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center",
    },
    inputBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontFamily: 'Arial',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        backgroundColor: "#06bcee",
        borderRadius: 10,
        marginLeft: 10
    },
    lottie: {
        marginTop: 40,
        zIndex: -1,
    },
    info: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 10
    },
    rightLine: {
        flex: 1,
        width: 6,
        height: h / 5,
        backgroundColor: '#DBDBDB',
        borderRadius: 50,
        position: 'absolute',
        right: 8,
        top: h * 0.4
    },
})
