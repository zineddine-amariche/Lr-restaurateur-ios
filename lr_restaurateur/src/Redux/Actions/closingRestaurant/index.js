import axios from 'axios';
import {
  CLOSING_SUCCESS,
  LOADING,
  CLOSING_FAILED,
} from '../../Types/closingRestaurant';
import {API_URL_PROD, API_URL_DEV} from '@env';

export const dispatchClosingRestaurant = async (
  dispatch,
  configHead,
  values,
  close,
  dispatchTimeclose,
) => {
  let API_BASE_URL;

  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }

  let url = `${API_BASE_URL}/closings/add-simplified`;

  dispatch({type: LOADING});
  await axios
    .post(url, values, configHead)
    .then(res => {
      let Data = res.data;

      if (Data?.data?.time) {
        dispatchTimeclose(Data?.data?.time * 60);
      }

      return (
        res,
        // dispatch({type:ADD_SECONDS,payload:Data?.time * 60})
        dispatch({type: CLOSING_SUCCESS, payload: Data}),
        console.log('response closing restaurant success'),
        close()
      );
    })
    .catch(error => {
      return (
        error,
        dispatch({
          type: CLOSING_FAILED,
          payload: 'échec de fermeture de restaurant',
        }),
        console.log('deny close errone', error),
        close()
      );
    });
};
