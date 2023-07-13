import axios from 'axios';
import {
  GET_RESR_DATA_FAILED,
  GET_RESR_DATA_SUCCESS,
  
} from '../../Types/Reservations/index.js';
import {API_URL_PROD, API_URL_DEV} from '@env';

export const GetReservationsData = async (dispatch, configHead) => {
  let API_BASE_URL;

  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }
  let url = `${API_BASE_URL}/bookings`;


  await axios
    .get(url, configHead)
    .then(response => {
      let result = response.data;
      return (
        result,
        dispatch({type: GET_RESR_DATA_SUCCESS, payload: result})
      );
    })
    .catch(error => {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return (
        error,
        dispatch({type: GET_RESR_DATA_FAILED, payload: 'échec post !'}),
        console.log('error.GetReservationsData', message.message)
      );
    });
};

 
