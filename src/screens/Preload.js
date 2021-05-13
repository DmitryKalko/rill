//import React from 'react';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from "react-native";
import LottieView from 'lottie-react-native';
import SyncStorage from 'sync-storage';

// import h from './constants';
// import w from './constants';

class Preload extends Component {
    state = {
        data: '',
    };

    componentDidMount() {
        setTimeout(() => {
            this.checkRegistrationData();
            if (this.state.data === undefined || this.state.data === '') {
                this.props.navigation.navigate('Registration');
            } else {
                this.props.navigation.navigate('MainScreen');
            }
        }, 2000);
    }
    checkRegistrationData = () => {
        let localData = SyncStorage.get('registrationData');
         //SyncStorage.remove('registrationData');
        this.setState({ data: localData });
    }
    render() {
        return (
            <View style={styles.container}>

                <LottieView
                    source={require('../animations/water.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                />
                <Text style={styles.rill}>Rill</Text>
                <Text style={styles.tagline}>Make your health stronger</Text>
            </View>
        )
    }
}
export default Preload;

// const widthLottie = '70%';
// const heightLottie = '70%';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    rill: {
        fontSize: 100,
        color: "#06bcee",
        fontWeight: "bold",
        fontFamily: "Arial"
    },
    tagline: {
        fontSize: 25,
        color: "#06bcee",
        fontFamily: "Arial"
    },
    lottie: {
        width: 350,
    }
});