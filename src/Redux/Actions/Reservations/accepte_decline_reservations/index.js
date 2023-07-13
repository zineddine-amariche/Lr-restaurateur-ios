import axios from 'axios';
import moment from 'moment';
import {
  LOADING_BYID_POST,
  POST_RESRBYID_SUCCESS,
  POST_RESRBYID_FAILED,
} from '../../../Types/Reservations';
import {GetReservationsListByDate} from '../getListReservationByDate';
import {GetReservationsData} from '../reservationsActions';
import {API_URL_PROD, API_URL_DEV} from '@env';

export const postReservations = async (dispatch, configHead, object) => {
  let API_BASE_URL;

  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }
  let url = `${API_BASE_URL}/bookings/handleConfirm`;

  dispatch({type: LOADING_BYID_POST});
  await axios
    .post(url, object, configHead)
    .then(response => {
      let result = response.data;
      return (
        result,
        dispatch({type: POST_RESRBYID_SUCCESS, payload: result.booking}),
        GetReservationsData(dispatch, configHead),
        GetReservationsListByDate(dispatch, configHead, {
          for_when: moment(new Date()).format('YYYY-MM-DD'),
        })
      );
    })
    .catch(error => {
      return (
        error,
        dispatch({type: POST_RESRBYID_FAILED, payload: 'échec request !'}),
        console.log('error.postReservations', error.message)
      );
    });
};
