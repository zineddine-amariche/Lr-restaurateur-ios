import {View, Text, TouchableOpacity, Image, useColorScheme} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import Fermer from '../../../../../../assets/paramètres/Group217.png';
import { COLORS } from '../../../../../../constants/theme';
const DaysList = ({days, index,open}) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <View style={[styles.Midi,{alignItems:'flex-start',}]}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            width: 93,
            padding: 2,
            justifyContent: 'center',
            color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
          }}>
          {days.jour}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('DetailsSetTime', days ={days} ,index={index})
          console.log(`index`, index);
          open()
          //   setVisible(true);
        }}
        style={styles.Midi}>
        <View style={{flexDirection: 'row', width: 80, marginRight: 10}}>
          {days.isOpen ? (
            <>
              <Text style={{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}}> {days.debutj} -</Text>
              <Text style={{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}}> {days.finj} </Text>
            </>
          ) : (
            <Image source={Fermer} />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('DetailsSetTime', days ={days} ,index={index})
          console.log(`index`, index);
          // setVisible(true);
          open()

        }}
        style={styles.Midi}>
        <View style={{flexDirection: 'row', width: 80, marginRight: 15}}>
          {days.isOpen ? (
            <>
              <Text style={{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}}> {days.debuts} -</Text>
              <Text style={{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}}> {days.fins} </Text>
            </>
          ) : (
            <Image source={Fermer} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DaysList;
