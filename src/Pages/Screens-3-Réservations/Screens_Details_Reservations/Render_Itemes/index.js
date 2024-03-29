import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React, {forwardRef, useEffect, useRef} from 'react';
import VectorStroke from '../../../../assets/paramètres/VectorStroke.png';
import pinter from '../../../../assets/Info/Group173(2).png';
import date from '../../../../assets/Info/Calendrier366.png';
import persone from '../../../../assets/Info/Vector366.png';
import valider from '../../../../assets/Info/Group3666.png';
import profile from '../../../../assets/Info/Vector22.png';
import decline from '../../../../assets/Info/Group83.png';
import phone from '../../../../assets/Info/Group366.png';
import sale from '../../../../assets/Info/Vector(3).png';
import aide from '../../../../assets/Info/Aide.png';
import {styles} from './Styles';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../../../constants/theme';
import {useReservation} from '../../Reservation--Screen--1/Hooks/useReservation';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useState} from 'react';

import moment from 'moment';
import 'moment/locale/fr';

import {Linking} from 'react-native';
import {postReservations} from '../../../../Redux/Actions/Reservations/accepte_decline_reservations';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Space from '../../../../Components/Space';
import Reservation from '../../../../assets/Info/resa.png';
import {Modalize} from 'react-native-modalize';
import {Txt} from '../../../../Components/utils';
import { GetReservationsListByDate } from '../../../../Redux/Actions/Reservations/getListReservationByDate';

const RenderItemes = ({navigation}) => {
  const [Select, setSelect] = useState('Intérieur');
  const {result_ById, isLoading} = useSelector(
    state => state.getReservationsById,
  );
  const modalRef = useRef(null);
  const onOpen = () => {
    modalRef.current?.open();
  };

  const {loadingPost} = useSelector(state => state.postReservationsSlice);

  const {configHead, dispatch} = useReservation();

  const acceptOrDecline = (establishment_id, booking_id, status) => {
    let objectAccept = {
      establishment_id,
      booking_id,
      status,
      room_assigned: result_ById.room_requested
        ? result_ById.room_requested
        : Select,
    };

    postReservations(dispatch, configHead, objectAccept);
  };

  const isFoused = useIsFocused();
  useEffect(() => {
    if (!isFoused) {
      setSelect('Intérieur');
    }
  }, [isFoused]);

  return (
    <>
      <>
        {isLoading || loadingPost ? (
          <Loader />
        ) : (
          <CReservation
            result_ById={result_ById}
            Select={Select}
            navigation={navigation}
            acceptOrDecline={acceptOrDecline}
            onOpen={onOpen}
            ref={modalRef}
            setSelect={setSelect}
          />
        )}
      </>
    </>
  );
};

export default RenderItemes;

/// create a function Contents  that i can passe ref to it

const CReservation = forwardRef((props, ref) => {
  const [IsVisible, setIsVisible] = useState(false);

  const {result_ById, Select, navigation, acceptOrDecline, setSelect, onOpen} =
    props;
  const Tablet = useSelector(state => state.IsTab);

  const {IsTab} = Tablet;
  let CustomWidth = IsTab ? '60%' : '100%';

  const colorScheme = useColorScheme();
  var dt = result_ById?.for_when;

  // reanimated styles
  const rStyels = useAnimatedStyle(() => ({
    height: IsVisible ? withTiming(60, 1000) : withTiming(0, 1000),
    backgroundColor: '#FFF',
    paddingHorizontal: IsVisible ? withTiming(10, 1000) : withTiming(0, 1000),
  }));

 const dispatch = useDispatch()
  return (
    <>
      <View style={{position: 'relative', flex: 1}}>
        <View style={{flex: 1}}>
          <Space space={20} />

          <View style={{alignSelf: 'center'}}>
            {result_ById?.status == 1 ? <Image source={pinter} /> : null}
          </View>

          <Space space={20} />

          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.imageBox}>
                <Image source={profile} />
              </View>
              <Text
                style={[
                  styles.Textbold,
                  {
                    color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                  },
                ]}>
                {/* {result_ById?.customer?.firstname} */}
                {result_ById?.customer?.lastname}
              </Text>
            </View>

            <View style={styles.row}>
              <View style={styles.imageBox}>
                <Image source={Reservation} style={{width: 25, height: 25}} />
              </View>
              <Text
                style={[
                  styles.Textbold,
                  {color: result_ById?.bookings_status?.color},
                ]}>
                {result_ById?.bookings_status?.label}
              </Text>
            </View>

            <View style={styles.row}>
              <View style={styles.imageBox}>
                <Image source={date} />
              </View>
              <Text
                style={[
                  styles.TextSemibold,
                  {
                    color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                  },
                ]}>
                {moment(dt).format('DD/MM/YYYY    H:mm')}{' '}
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.imageBox}>
                <Image source={persone} />
              </View>
              {result_ById?.persons == 1 ? (
                <Text
                  style={[
                    styles.TextSemibold,
                    {
                      color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                    },
                  ]}>
                  {result_ById?.persons} personne
                </Text>
              ) : (
                <Text
                  style={[
                    styles.TextSemibold,
                    {
                      color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                    },
                  ]}>
                  {result_ById?.persons} personnes
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${result_ById?.customer?.mobile_phone}`);
              }}>
              <View style={styles.row}>
                <View style={styles.imageBox}>
                  <Image source={phone} />
                </View>
                <Text
                  style={[
                    styles.TextSemibold,
                    {
                      color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                    },
                  ]}>
                  {result_ById?.customer?.mobile_phone}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.row}>
              <View style={styles.imageBox}>
                <Image source={aide} />
              </View>

              <Text
                numberOfLines={1}
                style={[
                  styles.TextSemibold,
                  {
                    color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                  },
                ]}>
                {result_ById?.customer_comment
                  ? result_ById?.customer_comment
                  : 'Pas de commentaire'}
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.imageBox}>
                <Image source={sale} />
              </View>

              <Text
                style={[
                  styles.TextSemibold,
                  {
                    color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                  },
                ]}>
                Salle demandé :{' '}
                {result_ById?.room_requested ? (
                  result_ById?.room_requested
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisible(!IsVisible);
                    }}>
                    <Text style={{color: COLORS.green}}>{Select}</Text>
                  </TouchableOpacity>
                )}
              </Text>

              {result_ById?.status == 1 ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisible(!IsVisible);
                    }}
                    style={{marginLeft: 10}}>
                    <Image source={VectorStroke} />
                  </TouchableOpacity>
                  <Animated.View style={[styles.select, rStyels]}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsVisible(!IsVisible);
                        setSelect('Intérieur');
                      }}>
                      <Text
                        style={{
                          color:
                            colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                        }}>
                        Intérieur
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsVisible(!IsVisible);
                        setSelect('Extérieur');
                      }}>
                      <Text
                        style={{
                          color:
                            colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                        }}>
                        Extérieur
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                </>
              ) : (
                <>
                  <Text>{result_ById?.room_requested}</Text>
                </>
              )}
            </View>
          </View>
        </View>

        {result_ById?.bookings_status?.label == 'Confirmée' ? (
          <View style={[styles.rowBtn, {width: CustomWidth}]}>
            <TouchableOpacity style={styles.Btn1} onPress={onOpen}>
              <Image source={decline} />
              <Text style={styles.Textbtn1}>Décliner</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {result_ById?.status == 1 ? (
          <View style={[styles.rowBtn, {width: CustomWidth}]}>
            <TouchableOpacity style={styles.Btn1} onPress={onOpen}>
              <Image source={decline} />
              <Text style={styles.Textbtn1}>Décliner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Btn2}
              onPress={() => {
                acceptOrDecline(
                  result_ById.establishment_id,
                  result_ById.id,
                  3,
                );
                navigation.navigate('Reservation');
              }}>
              <Image source={valider} />
              <Text style={styles.Textbtn2}>Valider</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <Modalize
          snapPoint={200}
          ref={ref}
          overlayStyle={{
            backgroundColor: COLORS.transparentPrimray,
          }}
          adjustToContentHeight={false}>
          <Contents
            HandelChangeCheck={() => {
              acceptOrDecline(result_ById.establishment_id, result_ById.id, 4);
              // GetReservationsListByDate(dispatch, configHead, {
              //   for_when: moment(new Date()).format('YYYY-MM-DD'),
              // })
            }}
            handleClose={() => {
              ref.current?.close();
            }}
          />
        </Modalize>
      </View>
    </>
  );
});

const Contents = ({handleClose, HandelChangeCheck}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
      }}>
      <Txt fontSize={18}>Voulez-vous décliner cette réservation ? </Txt>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: 30,
        }}>
        <TouchableOpacity
          style={styles.Btn1}
          onPress={() => {
            handleClose();
          }}>
          <Image source={decline} />
          <Text style={styles.Textbtn1}>non</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Btn2}
          onPress={() => {
            HandelChangeCheck();
            navigation.navigate('Reservation');
          }}>
          <Image source={valider} />
          <Text style={styles.Textbtn2}>oui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={COLORS.Jaune} />
      <Space />
      <Text style={{fontSize: 17, color: COLORS.Jaune}}>Chargement ...</Text>
    </View>
  );
};
