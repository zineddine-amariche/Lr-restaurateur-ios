import axios from 'axios';
import {
  GET_RESR_BYDATE_FAILED,
  GET_RESR_BYDATE_SUCCESS,
} from '../../../Types/Reservations';
import {API_URL_PROD, API_URL_DEV} from '@env';

export const GetReservationsListByDate = async (
  dispatch,
  configHead,
  object,
) => {
  let API_BASE_URL;
  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }
  let url = `${API_BASE_URL}/bookings`;
  await axios
    .post(url, object, configHead)
    .then(response => {
      let result = response.data;
      return result, dispatch({type: GET_RESR_BYDATE_SUCCESS, payload: result});
    })
    .catch(error => {
      return (
        error,
        dispatch({type: GET_RESR_BYDATE_FAILED, payload: 'échec post !'}),
        console.log('error.GetReservationsListByDate', error.message)
      );
    });
};
