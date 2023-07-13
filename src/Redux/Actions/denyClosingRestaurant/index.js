import axios from 'axios';
import {
  DENY_CLOSING_SUCCESS,
  LOADING,
  DENY_CLOSING_FAILED,
} from '../../Types/closingRestaurant';

import {API_URL_PROD, API_URL_DEV} from '@env';

export const dispatchDenyClosingRestaurant = async (
  dispatch,
  configHead,
  values,
) => {
  let API_BASE_URL;
  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }

  let url = `${API_BASE_URL}/closings/delete`;
  dispatch({type: LOADING});
  await axios
    .post(url, values, configHead)
    .then(res => {
      let Data = res.data;
      console.log(Data, 'dispatchDenyClosingRestaurant');
      return res, dispatch({type: DENY_CLOSING_SUCCESS, payload: Data});
    })
    .catch(error => {
      return (
        error,
        dispatch({
          type: DENY_CLOSING_FAILED,
          payload: 'échec de fermeture de restaurant',
        }),
        console.log('fermeture errone', error)
      );
    });
};
