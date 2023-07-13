import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {styles} from './styles';
import showPiker from '../../assets/Reservation/icon.png';
import moment from 'moment';
import 'moment/locale/fr';
import {useDispatch, useSelector} from 'react-redux';
import {GetReservationsListByDate} from '../../Redux/Actions/Reservations/getListReservationByDate';
import {
  IS_DATE_PIKER_OPEND,
  SELECTED_DATE,
} from '../../Redux/Types/Reservations';
import {useReservation} from '../../Pages/Screens-3-Réservations/Reservation--Screen--1/Hooks/useReservation';
import {COLORS} from '../../constants/theme';

const DateHandler = ({...DateHandlerProps}) => {
  const {ActiveButton, dataList} = DateHandlerProps;
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [Mode, setMode] = useState('date');
  const [show, setshow] = useState(false);
  const [text, settext] = useState('Empty');
  const {configHead} = useReservation();

  const colorScheme = useColorScheme();
  const onChage = (event, selectedDate) => {
    // console.log('selectedDate', selectedDate)
    const currenDate = selectedDate || date;
    setshow(Platform.OS === 'ios');
    setDate(currenDate);
    let tempDate = new Date(currenDate);

    let fDate =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate();

    settext(tempDate);

    let object = {
      for_when: fDate,
    };
    dispatch({type: SELECTED_DATE, payload: fDate});
    GetReservationsListByDate(dispatch, configHead, object);
  };

  const showMode = currentMode => {
    setshow(true);
    setMode(currentMode);
  };

  useEffect(() => {
    if (!show) {
      // console.log('enter')
      dispatch({type: IS_DATE_PIKER_OPEND, payload: false});
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      // console.log('enter')
      dispatch({type: IS_DATE_PIKER_OPEND, payload: true});
    }
  }, [show]);

  // console.log('show', show);

  let showDate =
    moment(text)?.format('ll') !== 'Invalid date'
      ? moment(text)?.format('ll')
      : moment(new Date())?.format('ll');

  const getReservationsByDate = useSelector(
    state => state.getReservationsByDate,
  );

  let storedDate = getReservationsByDate.forDate
    ? moment(getReservationsByDate.forDate)?.format('ll')
    : '';

  return ActiveButton && dataList ? (
    <View style={styles.trie}>
      <TouchableOpacity style={styles.row} onPress={() => showMode('date')}>
        <View style={{marginRight: 20}}>
          <Text
            style={{
              color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
            }}>
            {getReservationsByDate.forDate ? storedDate : showDate}
          </Text>
        </View>
        <TouchableOpacity onPress={() => showMode('date')}>
          <Image source={showPiker} />
        </TouchableOpacity>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePiker"
          value={date}
          mode={Mode}
          is24Hour="default"
          onChange={onChage}
        />
      )}
    </View>
  ) : null;
};

export default DateHandler;
