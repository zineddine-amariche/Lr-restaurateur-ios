import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Drawer from '../Navigations/drawer';
import {useSelector} from 'react-redux';
import RestaurantstackScreen from './RestaurantFemré';
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
  const Commandes = useSelector(state => state.Commandes);
  const {isOpen} = Commandes;
  return isOpen ? (
    <RootStack.Navigator
      // screenOptions={{
      //   headerMode: 'none',
      // }}
      screenOptions={{
        headerShown: false, // this hides the header for all screens in the drawer
      }}
      >
      <RootStack.Screen name="Drawer" component={Drawer}     />
    </RootStack.Navigator>
  ) : (
    <RestaurantstackScreen />
  );
};
export default RootStackScreen;
