import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Txt} from '../../utils';
import checked from '../../../assets/TrierPar/check.png';
import notChecked from '../../../assets/TrierPar/uncheck.png';

const UseCheck = ({item, HandelChangeCheck}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        marginVertical: 7,
        marginHorizontal: 20,
      }}
      onPress={() => {
        HandelChangeCheck(item);
      }}>
      <Txt fontSize={16} color={item.color}>
        {item.name}
      </Txt>
      <Image source={item.isCheck ? checked : notChecked} />
    </TouchableOpacity>
  );
};

export default UseCheck;

const styles = StyleSheet.create({});
