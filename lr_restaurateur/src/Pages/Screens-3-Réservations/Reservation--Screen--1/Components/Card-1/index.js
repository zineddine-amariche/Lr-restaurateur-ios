import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';
import {
 
  useColorScheme,
 
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import group from '../../../../../assets/Accueil/Group190.png';
import group155 from '../../../../../assets/Accueil/Group1155.png';
import group156 from '../../../../../assets/Accueil/Group2.png';
import {COLORS} from '../../../../../constants/theme';
import ModalInfo from './Components/Modal--Info/index';
import {useReservation} from '../../Hooks/useReservation';
import ModalValidation from './Components/Modal--validation';
import {useSelector} from 'react-redux';

import moment from 'moment';
import 'moment/locale/fr';
import Space from '../../../../../Components/Space';

const CardAtt = ({item, navigation, AcitvePopUpV}) => {
  const colorScheme = useColorScheme();
  const {
    orders,
    Loading,
    Visible,
    DesAcitvePopUp,
    AcitvePopUp,
    VisibleV,
    // AcitvePopUpV,
    // DesAcitvePopUpV,
  } = useReservation();

  let totaleQuantity = 0;
  if (orders) {
    orders.forEach(item => {
      totaleQuantity += item._joinData.quantity;
    });
  }
  const Tablet = useSelector(state => state.IsTab);
  const {IsTab} = Tablet;
  let CustomWidth = IsTab ? 375 : 330;
  let marginLeftCus = IsTab ? 0 : 5;

  const getReservationsById = useSelector(state => state.getReservationsById);
  const {result_ById, loading} = getReservationsById;

  // console.log("getReservationsById", getReservationsById.result_ById);

  // console.log('result_ById.lenght', result_ById.customer)

  // console.log('item. "status"', item.status )

  var dt = item.for_when;
  return (
    <TouchableOpacity
      onPress={() => {
        //  AcitvePopUpV(item.id);
        // console.log('item.id', item.id)
        navigation.navigate('DetailsReservation',{idReservation:item.id})
      }}>
      <View
        style={[
          styles.container,
          {width: CustomWidth, marginLeft: marginLeftCus},
        ]}>
        {/* <TouchableOpacity
        style={styles.abs}
        onPress={() => {
          AcitvePopUp(item.id);
        }}>
        <Image source={group} />
      </TouchableOpacity> */}
        <View style={styles.BoxInfo}>
          <View style={styles.client}>
            <Text style={[styles.clientText,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]} >
              {/* {item.customer.firstname} */}
               {item.customer.lastname}
            </Text>
          </View>
          <View style={styles.price}>
            <Space space={15} />
            <View style={styles.etat}>
              <Text style={styles.TextRed}>
                {moment(dt).format('DD/MM/YYYY     ')}
              </Text>
              <Image source={group155} />
              <Text style={styles.TextRed}>{moment(dt).format(' H:mm')}</Text>
            </View>
            {/* <Text style={styles.TextArticle}>{item.customer.sum} Articles</Text> */}
            {/* <Text style={styles.TextArticle}>Total : {item.id} €</Text> */}
            {item.persons == 1 ? (
              <Text style={styles.TextArticle}>{item.persons} personne</Text>
            ) : (
              <Text style={styles.TextArticle}>{item.persons} personnes</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardAtt;
