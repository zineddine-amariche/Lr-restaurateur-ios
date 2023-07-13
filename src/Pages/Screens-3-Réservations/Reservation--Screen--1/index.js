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
  useColorScheme,
} from 'react-native';
import Header from '../../../Components/Headers/header-1-Primary';
import {COLORS} from '../../../constants/theme';
import ButtonListe from './Components/Lists';
import List from './Components/SectionType';
import {useDispatch, useSelector} from 'react-redux';
import {useReservation} from './Hooks/useReservation';
import Sound from 'react-native-sound';
import moment from 'moment';
import close from '../../../assets/Info/x.png';

import {GetReservationsData} from '../../../Redux/Actions/Reservations/reservationsActions';
import Laoder from '../../../Components/Laoder';
import ButtonsTabsMenue from '../../../Components/Buttons/TabsButtons/ButtonsTabsMenue';
import DateHandler from '../../../Components/date';
import {GetAllCommandes} from '../../../Redux/Actions/Commandes';
import {useIsFocused} from '@react-navigation/native';

let soundUrl = require('../../../../android/app/src/main/res/raw/son.mp3');

const Reservation = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [ActiveButton, setActiveButton] = useState(false);
  const [search, setsearch] = useState();
  const [Visible2, setVisible2] = useState(false);

  const {configHead, ToReservation, ToCommandes} = useReservation();
  const {isLoading} = useSelector(state => state.getReservationsById);
  const getReservationsByDate = useSelector(
    state => state.getReservationsByDate,
  );
  const {list_reservation_pending, list_reservation, loading} = useSelector(
    state => state.getReservations,
  );

  const handleSearch = text => {
    setsearch(text);
  };

  const handleClearText = () => {
    setsearch('');
  };

  const dateObject = moment(
    list_reservation[0]?.for_when,
    'YYYY-MM-DD HH:mm:ss',
  );

  const toggleToWait = () => {
    setActiveButton(false);
  };

  const toggleToList = () => {
    setActiveButton(true);
  };

  const openMenu = () => {
    setVisible2(true);
  };

  const closeMenu = () => {
    setVisible2(false);
  };

  useEffect(() => {
    if (isFocused) {
      GetReservationsData(dispatch, configHead);
      GetAllCommandes(dispatch, configHead);
    }
  }, [isFocused]);

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


console.log('getReservationsByDate.forDate', getReservationsByDate.forDate)
  const searchTermLowercase = search?.toLowerCase();

  const filteredData = dataList.filter( // filter from the last data 
    item =>
      item?.customer?.lastname?.toLowerCase().includes(searchTermLowercase) ||
      item.customer.firstname.toLowerCase().includes(searchTermLowercase) ||
      item.customer.email.toLowerCase().includes(searchTermLowercase) ||
      item.customer.mobile_phone.toLowerCase().includes(searchTermLowercase),
  );

  const props = {
    closeMenu,
    openMenu,
    Visible2,
    ToReservation,
    ToCommandes,
    toggleToWait,
    toggleToList,
    ActiveButton,
    isLoading,
  };

  const SearchProps = {
    dataList,
    ActiveButton,
    search,
    handleClearText,
    handleSearch,
  };

  const DateHandlerProps = {
    ActiveButton,
    dataList,
  };

  const ListProps = {
    ActiveButton,
    pending: list_reservation_pending,
    onFilter: filteredData?.length ? true : false,
    onSearch: search?.length ? true : false,
    FiltredList: filteredData,
    openMenu,
    dataList: getReservationsByDate.list_reservation_bydate.length
      ? getReservationsByDate.list_reservation_bydate
      : dateObject.format('YYYY-MM-DD') === getReservationsByDate.forDate ||
        !getReservationsByDate.forDate
      ? list_reservation
      : [],
  };

  return (
    <Layout loading={loading} {...props}>
      <DateHandler {...DateHandlerProps} />
      <SearchInput {...SearchProps} />
      <List {...ListProps} />
    </Layout>
  );
};

export default Reservation;

const Layout = ({children, loading, ...props}) => {
  const {
    closeMenu,
    openMenu,
    ToReservation,
    ToCommandes,
    toggleToWait,
    toggleToList,
    ActiveButton,
    Visible2,
  } = props;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondary} barStyle="light-content" />
      <Header
        Color={COLORS.secondary}
        openMenu={openMenu}
        closeMenu={closeMenu}
        Visible={Visible2}
      />
      <ButtonsTabsMenue
        ToReservation={ToReservation}
        ToCommandes={ToCommandes}
      />
      <ButtonListe
        toggleToWait={toggleToWait}
        toggleToList={toggleToList}
        ActiveButton={ActiveButton}
      />
      {loading ? <Laoder /> : children}
    </SafeAreaView>
  );
};

const SearchInput = ({
  dataList,
  ActiveButton,
  search,
  handleClearText,
  handleSearch,
}) => {
  const colorScheme = useColorScheme();

  return ActiveButton && dataList ? (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          placeholder="Rechercher parmi la liste"
          onChangeText={handleSearch}
          value={search}
          style={[
            styles.Input,
            {
              color: colorScheme == 'dark' ? COLORS.darkGris : COLORS.darkGris,
            },
          ]}
          placeholderTextColor={
            colorScheme == 'dark' ? COLORS.darkGris : COLORS.darkGris
          }
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
  ) : null;
};

// useEffect(() => {
//   if (!getReservationsByDate.isPikerOpend) {
//     const interval = setInterval(() => {
//       // GetReservationsData(dispatch, configHead);
//        GetAllCommandes(dispatch, configHead);

//     }, 30000);
//     return () => clearInterval(interval);
//   }
// }, [getReservationsByDate.isPikerOpend]);
