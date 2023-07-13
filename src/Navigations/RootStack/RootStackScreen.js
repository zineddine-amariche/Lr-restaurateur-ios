import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../../src/SplashScreen';
import SignInScreen from '../../src/SignInScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator   screenOptions={{
        headerLeft: null, // this hides the menu icon for all screens
      }} >
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    </RootStack.Navigator>
);

export default RootStackScreen;