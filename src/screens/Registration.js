import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    StatusBar,
    Dimensions,
    Alert 
 } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import SyncStorage from 'sync-storage';

// import h from './constants';
// import w from './constants';

const placeholder = {
    label: 'Пол',
    value: null,
    color: '#9EA0A4',
};
class Registration extends Component {
    state = {
        name: '',
        male: '',
        age: null,
        weight: null,
        physicalActivity: null,
    };

    checkAllFields = () => {
        const { name, male, age, weight, physicalActivity } = this.state;
        if( name === '' 
        || male === '' 
        || age === null 
        || weight === null 
        || physicalActivity === null) {
            this.failAlert();
        } else {
           this.setRegistrationData(); 
        }
        
    }

    failAlert = () => {
        Alert.alert(
          'ОЙ!',
          'Кажется вы не заполнили все поля...',
          [{ text: 'Заполнить' }],
          { cancelable: false }
        );
      };

    setRegistrationData = () => {
        let data = JSON.stringify(this.state);
        SyncStorage.set('registrationData', data);
        console.log(SyncStorage.get('registrationData'));

        let time = new Date().getTime();
        SyncStorage.set('registrationDate', time);

        this.setState({
            name: '',
            male: '',
            age: null,
            weight: null,
            physicalActivity: null
        });
        this.props.navigation.navigate('Goals');
    }


    render() {
        console.log(this.state)
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['rgb(153,204,204)', 'transparent']}
                    style={styles.background}
                />
                <Text style={styles.title}>Познакомимся?</Text>
                <KeyboardAvoidingView style={styles.inputs} behavior="padding">
                    <StatusBar
                        barStyle="light-content"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Имя"
                        onChangeText={(value) => this.setState({ name: value })}
                    />
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={(value) => this.setState({ male: value })}
                        placeholder={placeholder}
                        items={[
                            { label: 'Мужской', value: 'Мужской' },
                            { label: 'Женский', value: 'Женский' },
                        ]}
                        InputAccessoryView={() => null}
                    //doneText='OK'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Возраст"
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({ age: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Вес"
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({ weight: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Физическая активность(часов)"
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({ physicalActivity: value })}
                    />
                </KeyboardAvoidingView>

                <TouchableOpacity
                    style={styles.button}
                    //onPress={() => this.props.navigation.navigate('Goals')}
                    onPress={this.checkAllFields}
                >
                    <Text style={styles.buttonText}>Далее</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Registration;

const size = Dimensions.get('window');
const h = size.height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 30,
        backgroundColor: 'rgba(51,102,153,1)',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: h,
    },
    title: {
        fontSize: 20,
        color: "white",
        marginBottom: 20,
        marginTop: 40
    },
    input: {
        height: 50,
        width: 300, //в зависимости от ширины экрана и дальше тоже самое!!
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center",
        marginBottom: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 150,
        backgroundColor: "#06bcee",
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 50,
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center",
        marginBottom: 20
    },
    inputAndroid: {
        height: 50,
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center",
        marginBottom: 20
    },
});


