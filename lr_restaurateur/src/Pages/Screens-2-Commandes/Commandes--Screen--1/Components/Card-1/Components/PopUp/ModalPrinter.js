import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import React from 'react';
import pinter from '../../../../../../../assets/Info/Group173.png';
import close from '../../../../../../../assets/Info/x.png';
import PrinterModal from '../../../Modals/PrinterModal';
import {COLORS} from '../../../../../../../constants/theme';
import Space from '../../../../../../../Components/Space';
import {useNavigation} from '@react-navigation/native';

const ModalPrinter = ({DesAcitvePopUp, Visible}) => {
  const navigate = useNavigation();
  const Span = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate.navigate('Parametre');
        }}>
        <Text style={{textDecorationLine: 'underline'}}>paramètres</Text>
      </TouchableOpacity>
    );
  };
  const colorScheme = useColorScheme();

  return (
    <PrinterModal visible={Visible}>
      <TouchableOpacity
        style={{alignSelf: 'flex-end'}}
        onPress={DesAcitvePopUp}>
        <Image source={close} />
      </TouchableOpacity>
      <View style={{alignSelf: 'center'}}>
        <Image source={pinter} />
      </View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 17,
          fontWeight: 'bold',
          paddingTop: 10,
          color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
        }}>
        Imprimante non connectée
      </Text>
      <View
        style={{
          paddingTop: 10,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontWeight: '600',
            textAlign: 'center',
            color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
          }}>
          Accédez aux <Span /> pour connecter votre imprimante
        </Text>
      </View>
      <Space space={30} />
    </PrinterModal>
  );
};

export default ModalPrinter;
