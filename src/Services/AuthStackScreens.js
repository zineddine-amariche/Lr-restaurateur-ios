import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../Pages/Screens-1-AUTH/Login/SignInScreen'
import  SplashScreen from '../Pages/Screens-1-AUTH/Splash/SplashScreen'
import Welcome from '../Pages/Screens-1-AUTH/Welcome';
const RootStack = createStackNavigator();

function SwitchHome ({navigation}) {
    setTimeout(() => {
    navigation.replace('Welcome')
    },2000);
    return(
      
        <SplashScreen/>
      
      )
  }


  
const AuthStackScreen = ({navigation}) => (
    <RootStack.Navigator    screenOptions={{
        headerShown: false, // this hides the header for all screens in the drawer
      }}>
        <RootStack.Screen name="SplashScreen" component={SwitchHome}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="Welcome" component={Welcome}/>
    </RootStack.Navigator>
);

export default AuthStackScreen;