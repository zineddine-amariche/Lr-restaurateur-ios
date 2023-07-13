import axios from 'axios';
import {COMMANDES_FAILED, COMMANDES_SUCCESS} from '../../Types/Commandes';
import {DELETE_MESSAGES, LOADING} from '../../Types/TimeOrders';
import {API_URL_PROD, API_URL_DEV} from '@env';

export const getCommandesByTime = async (dispatch, configHead, values) => {
  let API_BASE_URL;

  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }

  let url = `${API_BASE_URL}/orders`;

  dispatch({type: LOADING});
  await axios
    .post(url, values, configHead)
    .then(res => {
      return (
        res,
        console.log('COMMANDES_SUCCESS_ByTime'),
        dispatch({type: COMMANDES_SUCCESS, payload: res.data}),
        dispatch({type: DELETE_MESSAGES})
      );
    })
    .catch(error => {
      return (
        error,
        dispatch({type: COMMANDES_FAILED, payload: 'échec by dates !'}),
        console.log('error.getCommandesByTime', error.message)
      );
    });
};
