
import {styles} from './Hooks/styles';
import React, {useEffect, useState} from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import Header from '../../../Components/Headers/header-1-Primary';
import {COLORS} from '../../../constants/theme';
import SectionButton from './Components/Buttons';
import ButtonListe from './Components/Lists';
import SectionType from './Components/SectionType';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useReservation} from './Hooks/useReservation';
// import Sound from 'react-native-sound';
import moment from 'moment';

import {
  GetReservationsData,
  GetTokenReservations,
} from '../../../Redux/Actions/Reservations/reservationsActions';
import ModalInfo from './Components/Modals/Modal_Info';
import Laoder from '../../../Components/Laoder';
import ModalValidation from '../Screens_Details_Reservations/Render_Itemes';
import {GetReservationsById} from '../../../Redux/Actions/Reservations/GetResrvation';
import ModalCardList from './Components/Modals/model_card2';
import ButtonsTabsMenue from '../../../Components/Buttons/TabsButtons/ButtonsTabsMenue';
import DateHandler from '../../../Components/date';

import OneSignal from 'react-native-onesignal';


const Reservation = ({navigation, route}) => {
  // const {Token} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {configHead, ToReservation, ToCommandes} = useReservation();


  const {result_ById, isLoading} = useSelector(state => state.getReservationsById);
  const {list_reservation_pending, list_reservation, loading} = useSelector(
    state => state.getReservations,
  );
  const getReservationsByDate = useSelector(
    state => state.getReservationsByDate,
  );

  const dateObject = moment(
    list_reservation[0]?.for_when,
    'YYYY-MM-DD HH:mm:ss',
  );

  useEffect(() => {
    if (!getReservationsByDate.isPikerOpend) {
      const interval = setInterval(() => {
        // if (establishment_id) {
        GetReservationsData(dispatch, configHead);
        // }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [getReservationsByDate.isPikerOpend]);
  

  // useEffect(() => {
  //   // OneSignal.setNotificationOpenedHandler(notificationResult => {

  //   //   console.log("OneSignal: notification opened:", notificationResult);
  //   //   // let data = notificationResult.notification().payload
      
  //   //   const { action, notification } = notificationResult;
  //   //   const data=notification.additionalData
  //   //   // const item=data.booking_id
  //   //   console.log(notification,'notification resa')
  //   //   console.log(data,'data resa')
  //   //   if(data.type=="new_booking" && !getReservationsByDate.isPikerOpend){
  //   //     navigation.navigate("Reservation")
  //   //     GetReservationsData(dispatch, configHead);
  //   //   }else if(data.type=="canceled_booking" && !getReservationsByDate.isPikerOpend){
  //   //   navigation.navigate("DetailsReservation",{item})
  //   //   GetReservationsData(dispatch, configHead);
  //   // } else if(data.type=="new_order"){
  //   //   navigation.navigate("Commandes")
  //   // }
     
      
  //   // });
  //   if(!getReservationsByDate.isPikerOpend){
  //     GetReservationsData(dispatch, configHead);
  //   }
    
  // }, [getReservationsByDate.isPikerOpend]);

  const [ActiveButton, setActiveButton] = useState(false);

  const toggleToWait = () => {
    setActiveButton(false);
  };

  const toggleToList = () => {
    setActiveButton(true);
  };
  const [Visible2, setVisible2] = useState(false);

  const openMenu = () => {
    setVisible2(true);
  };

  const closeMenu = () => {
    setVisible2(false);
  };


  const [VisibleV, setVisibleV] = useState(false);

  const AcitvePopUpV = id => {
    // setVisibleV(true);
    // GetReservationsById(dispatch, configHead, id);
  };

  const DesAcitvePopUpV = () => {
    setVisibleV(false);
  };
  // card2
  const [Visible, setVisible] = useState(false);
  const AcitvePopUp = id => {
    setVisible(true);
    GetReservationsById(dispatch, configHead, id);
  };
  const DesAcitvePopUp = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (list_reservation_pending?.length !== 0) {
      // const sound = new Sound('son.mp3', Sound.MAIN_BUNDLE, error => {
      //   if (error) {
      //     console.log('failed to load the sound', error);
      //     return;
      //   }
      //   sound.play(() => {
      //     sound.release();
      //   });
      // });
      console.log('sound is running', )
    }
  }, [list_reservation_pending]);

  let dataList = getReservationsByDate.list_reservation_bydate.length
    ? getReservationsByDate.list_reservation_bydate
    : dateObject.format('YYYY-MM-DD') === getReservationsByDate.forDate ||
      !getReservationsByDate.forDate
    ? list_reservation
    : [];

  // console.log('dataList', dataList)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondary} barStyle='dark-content' />
      <Header
        navigation={navigation}
        Color={COLORS.secondary}
        Visible={Visible2}
        openMenu={openMenu}
        closeMenu={closeMenu}
      />
      <ButtonsTabsMenue
        ToReservation={ToReservation}
        ToCommandes={ToCommandes}
        navigation={navigation}
      />
      <ButtonListe
        toggleToWait={toggleToWait}
        toggleToList={toggleToList}
        ActiveButton={ActiveButton}
      />

      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Laoder />
        </View>
      ) : (
        <>
          <View style={styles.trie}>
            {ActiveButton && dataList ? <DateHandler /> : null}
          </View>

          <SectionType
            navigation={navigation}
            ActiveButton={ActiveButton}
            dataList={
              getReservationsByDate.list_reservation_bydate.length
                ? getReservationsByDate.list_reservation_bydate
                : dateObject.format('YYYY-MM-DD') ===
                    getReservationsByDate.forDate ||
                  !getReservationsByDate.forDate
                ? list_reservation
                : []
            }
            pending={list_reservation_pending}
            openMenu={openMenu}
            AcitvePopUpV={AcitvePopUpV}
            AcitvePopUp={AcitvePopUp}
          />
        </>
      )}

      <ModalInfo
        DesAcitvePopUp={DesAcitvePopUp}
        Visible={Visible}
        loading={isLoading}
        // result_ById={result_ById}
      />
      {/* <ModalValidation
        DesAcitvePopUp={DesAcitvePopUpV}
        Visible={VisibleV}
        loading={isLoading}
        result_ById={result_ById}
      /> */}

      {/* {result_ById && (
        <ModalCardList
          DesAcitvePopUp={DesAcitvePopUp}
          Visible={Visible}
          item={result_ById}
          loading={isLoading}
          result_ById={result_ById}
        />
      )} */}
    </SafeAreaView>
  );
};

export default Reservation;
 