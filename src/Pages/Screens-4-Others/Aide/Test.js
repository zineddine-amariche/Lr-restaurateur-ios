import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BluetoothEscposPrinter} from '@brooons/react-native-bluetooth-escpos-printer';
import {Txt} from '../../../Components/utils';
import {COLORS} from '../../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Test = () => {
  const print = async () => {
    try {
      await BluetoothEscposPrinter.printerInit();
      await BluetoothEscposPrinter.printerLeftSpace(0);
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.setBlob(0);
      await BluetoothEscposPrinter.printText('______________________\r\n', {
        fonttype: 3,
        widthtimes: 1,
        heigthtimes: 1,
      });

      await BluetoothEscposPrinter.printText(
        'Live Resto OEM857 : Espèce x\r\n',
        {
          encoding: 'OEM857',
          codepage: 61,
        },
      );
      await BluetoothEscposPrinter.printText('______________________\r\n', {
        fonttype: 3,
        widthtimes: 1,
        heigthtimes: 1,
      });

      await BluetoothEscposPrinter.printText('Live Resto 857 : Espèce\r\n', {
        encoding: '857',
        codepage: 61,
      });
      await BluetoothEscposPrinter.printText('______________________\r\n', {
        fonttype: 3,
        widthtimes: 1,
        heigthtimes: 1,
      });

      await BluetoothEscposPrinter.printText(
        'Live Resto WIN1254 sans code page : Espèce\r\n',
        {
          encoding: 'WIN1254',
        },
      );
      await BluetoothEscposPrinter.printText('______________________\r\n', {
        fonttype: 3,
        widthtimes: 1,
        heigthtimes: 1,
      });
      await BluetoothEscposPrinter.printText(' Live Resto 858 : Espèce \r\n', {
        encoding: '858',
        codepage: 25,
      });
      await BluetoothEscposPrinter.printText('______________________\r\n', {
        fonttype: 3,
        widthtimes: 1,
        heigthtimes: 1,
      });
      await BluetoothEscposPrinter.printText(
        ' Live Resto windows-1251 : Espèce \r\n',
        {
          encoding: 'windows-1251',
          codepage: 25,
        },
      );

      await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
      await BluetoothEscposPrinter.printText('  \r\n', {
        encoding: 'windows-1250',
        codepage: 25,
        widthtimes: 3,
        heigthtimes: 3,
        fonttype: 1,
      });
    } catch (error) {
      alert(error);
    }

    await BluetoothEscposPrinter.cutOnePoint();
  };

  const [Rsr, setRsr] = useState(null);
  const [Rsr2, setRsr2] = useState(null);
  const funnn = async () => {
    let res = await AsyncStorage.getItem('lastDevice');
    let lastDeviceName = await AsyncStorage.getItem('lastDeviceName');

    setRsr(res);
    setRsr2(lastDeviceName);
  };

  useEffect(() => {
    if(!Rsr&&!Rsr2){

      funnn()
    }
  }, [Rsr,Rsr2])
  

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        style={{
          backgroundColor: '#121',
          padding: 10,
          borderRadius: 9,
          paddingHorizontal: 30,
        }}
        onPress={() => {
          print();
        }}>
        <Txt color={COLORS.white}>Print</Txt>
      </TouchableOpacity>

      <Txt>{Rsr ? Rsr : 'adresse : unddifined'}</Txt>
      <Txt>{Rsr2 ? Rsr2 : ' lastname: unddifined'}</Txt>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
