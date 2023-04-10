import {styles} from './Hooks/styles';
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import Header from '../../../Components/Headers/header-1-Primary';
import {COLORS} from '../../../constants/theme';
import ButtonListe from './Components/Lists';
import SectionType from './Components/SectionType';
import {useDispatch, useSelector} from 'react-redux';
import {useReservation} from './Hooks/useReservation';
import Sound from 'react-native-sound';
import moment from 'moment';
import close from '../../../assets/Info/x.png';

import {GetReservationsData} from '../../../Redux/Actions/Reservations/reservationsActions';
import ModalInfo from './Components/Modals/Modal_Info';
import Laoder from '../../../Components/Laoder';
import {GetReservationsById} from '../../../Redux/Actions/Reservations/GetResrvation';
import ButtonsTabsMenue from '../../../Components/Buttons/TabsButtons/ButtonsTabsMenue';
import DateHandler from '../../../Components/date';

const Reservation = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {configHead, ToReservation, ToCommandes} = useReservation();
  const [search, setsearch] = useState();

  const handleSearch = text => {
    setsearch(text);
  };

  const handleClearText = () => {
    setsearch('');
  };

  const {isLoading} = useSelector(state => state.getReservationsById);
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
        GetReservationsData(dispatch, configHead);
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [getReservationsByDate.isPikerOpend]);

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


  // card2
  const [Visible, setVisible] = useState(false);
  const AcitvePopUp = id => {
    setVisible(true);
    GetReservationsById(dispatch, configHead, id);
  };
  const DesAcitvePopUp = () => {
    setVisible(false);
  };
  let soundUrl = require('../../../../android/app/src/main/res/raw/son.mp3');

  useEffect(() => {
    if (list_reservation_pending?.length !== 0) {
      const sound = new Sound(soundUrl, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        sound.play(() => {
          sound.release();
        });
      });
    }
  }, [list_reservation_pending]);

  let dataList = getReservationsByDate.list_reservation_bydate.length
    ? getReservationsByDate.list_reservation_bydate
    : dateObject.format('YYYY-MM-DD') === getReservationsByDate.forDate ||
      !getReservationsByDate.forDate
    ? list_reservation
    : [];

  const searchTermLowercase = search?.toLowerCase();

  const filteredData = dataList.filter(
    item =>
      item?.customer?.lastname?.toLowerCase().includes(searchTermLowercase) ||
      item.customer.firstname.toLowerCase().includes(searchTermLowercase) ||
      item.customer.email.toLowerCase().includes(searchTermLowercase) ||
      item.customer.mobile_phone.toLowerCase().includes(searchTermLowercase),
  );

  // console.log('dataList', dataList);
  // console.log('filteredData.length', filteredData.length);

  // console.log('filteredData', filteredData);
  // console.log('search?.length', search);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondary} barStyle="light-content" />
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
          {ActiveButton && dataList ? (
            <View
              style={{
                backgroundColor: COLORS.white,
                width: '100%',
                padding: 20,
                height: 90,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  placeholder="Cherchcer"
                  onChangeText={handleSearch}
                  value={search}
                  style={styles.Input}
                  placeholderTextColor={COLORS.darkGris}
                />
                {search?.length > 0 && (
                  <TouchableOpacity
                    onPress={handleClearText}
                    style={{position: 'absolute', right: 10}}>
                    <Image source={close} />
                  </TouchableOpacity>
                )}
                {!search && (
                  <View style={{position: 'absolute', right: 10}}>
                    <Text>🔍</Text>
                  </View>
                )}
              </View>
            </View>
          ) : null}
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
            FiltredList={filteredData}
            pending={list_reservation_pending}
            onSearch={search?.length ? true : false}
            onFilter={filteredData?.length ? true : false}
            openMenu={openMenu}
            AcitvePopUp={AcitvePopUp}
          />
        </>
      )}

      <ModalInfo
        DesAcitvePopUp={DesAcitvePopUp}
        Visible={Visible}
        loading={isLoading}
      />
    </SafeAreaView>
  );
};

export default Reservation;
