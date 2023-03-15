import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import group from '../../../../../assets/Accueil/Group190.png';
import group155 from '../../../../../assets/Accueil/Group1155.png';
import {useReservation} from '../../Hooks/useReservation';
import ModalPrinter from './Components/ModalPrinter';
import {useDispatch, useSelector} from 'react-redux';
import {GetReservationsById} from '../../../../../Redux/Actions/Reservations/GetResrvation';
import moment from 'moment';
import 'moment/locale/fr';
import {COLORS} from '../../../../../constants/theme';

const CardEn = ({item,navigation, AcitvePopUp}) => {
  const {Token, Visible, Loading, orders, OnPrete, DesAcitvePopUp, set} =
    useReservation();

  let totaleQuantity = 0;
  const {configHead, refresh} = useReservation();

  const getReservationsById = useSelector(state => state.getReservationsById);
  const {result_ById, loading} = getReservationsById;

  // console.log("getReservationsById", getReservationsById);

  // console.log('result_ById.lenght', result_ById.customer)

  // useEffect(() => {
  //   if (result_ById.customer) {
  //     set();
  //   }
  // }, [result_ById]);
  // console.log('item. "status"', item.status )

  if (orders) {
    orders.forEach(item => {
      totaleQuantity += item._joinData.quantity;
    });
  }
  const Tablet = useSelector(state => state.IsTab);
  const {IsTab} = Tablet;
  let CustomWidth = IsTab ? 375 : 330;
  let marginLeftCus = IsTab ? 0 : 5;
  var dt = item.for_when;
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={() => {
        // AcitvePopUp(item.id);
        // console.log('item.id', item.id)
        navigation.navigate('DetailsReservation',{idReservation:item.id})

      }}>
      <View
        style={[
          styles.container,
          ,
          {
            width: CustomWidth,
            marginLeft: marginLeftCus,
            backgroundColor: '#5DBCA330',
            borderColor: COLORS.secondary,
          },
        ]}>
        <View style={styles.BoxInfo}>
          <View style={styles.client}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.clientText,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>
                {/* {item.customer.firstname}  */}
                {item.customer.lastname}
              </Text>

              {/* <Text style={{fontSize:11}}>{item.status === 3 ? 'valider':'decliner'}</Text> */}
            </View>
          </View>
          <View style={styles.etat}>
            <Text
              style={[styles.clientText, {color: item.bookings_status.color}]}>
              {item.bookings_status.label}
            </Text>
          </View>
          <View style={styles.etat}>
            <View style={styles.row}>
              <Image source={group155} style={styles.img} />
              <Text style={[styles.TextRed, {color: COLORS.secondary}]}>
                {moment(dt).format('HH:mm')}
              </Text>
            </View>

            <View>
              {item.persons == 1 ? (
                <Text style={[styles.TextRed, {color: '#FF5937'}]}>
                  {item.persons} personne
                </Text>
              ) : (
                <Text style={[styles.TextRed, {color: COLORS.secondary}]}>
                  {item.persons} personnes
                </Text>
              )}
            </View>
          </View>
        </View>
        {/* {result_ById && (
        <ModalPrinter
          DesAcitvePopUp={DesAcitvePopUp}
          Visible={Visible}
          item={result_ById}
          loading={loading}
          result_ById={result_ById}
        />
      )} */}
      </View>
    </TouchableOpacity>
  );
};

export default CardEn;
