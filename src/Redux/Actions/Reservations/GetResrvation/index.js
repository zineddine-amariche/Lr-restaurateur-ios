import axios from 'axios';
import {
  GET_RESRBYID_FAILED,
  GET_RESRBYID_SUCCESS,
  LOADING_BYID,
} from '../../../Types/Reservations';
import {API_URL_PROD, API_URL_DEV} from '@env';

export const GetReservationsById = async (dispatch, configHead, id) => {
  let API_BASE_URL;

  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }
  let url = `${API_BASE_URL}/bookings/details/${id}`;

  dispatch({type: LOADING_BYID});
  await axios
    .get(url, configHead)
    .then(response => {
      let result = response.data;
      return (
        result,
        dispatch({type: GET_RESRBYID_SUCCESS, payload: result.booking})
      );
    })
    .catch(error => {
      return (
        error,
        dispatch({type: GET_RESRBYID_FAILED, payload: 'échec request !'}),
        console.log('error.GetReservationsById', error.message)
      );
    });
};
