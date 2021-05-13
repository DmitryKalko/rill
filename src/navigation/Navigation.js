import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import Registration from '../screens/Registration';
import Goals from '../screens/Goals';
import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="Preload"
                    component={Preload}
                    options={{
                        title: 'Main',
                        headerTintColor: '#ffffff',
                    }}
                />
                <Stack.Screen
                    name="Registration"
                    component={Registration}
                    options={{
                        title: 'Познакомимся?',
                        headerTintColor: '#ffffff',
                        gestureEnabled: false
                    }}
                />
                <Stack.Screen
                    name="Goals"
                    component={Goals}
                    options={{
                        title: 'Ваша цель?',
                        headerTintColor: '#ffffff',
                        gestureEnabled: false
                    }}
                />
                {/* <Stack.Screen
              name="HiScreen"
              component={HiScreen}

              options={{
                title: '',
                headerTintColor: '#ffffff',
                // gestureEnabled: false
                // headerTitleStyle: {
                //   fontSize: 20,
                // },
                // headerStyle: {
                //   backgroundColor: 'rgb(153,204,204)',
                //   elevation: 0,
                //   shadowOpacity: 0,
                //   borderBottomWidth: 0,
                // },
              }}
            /> */}
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{
                        title: '',
                        headerTintColor: '#ffffff',
                        gestureEnabled: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;