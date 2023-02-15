import axios from 'axios';
import {
  CLOSING_SUCCESS,
  LOADING,
  CLOSING_FAILED,
} from '../../Types/closingRestaurant';
import {ADD_SECONDS} from '../../Types/Timer';
// import { CloseCommandes } from '../Commandes';

export const dispatchClosingRestaurant = async (
  dispatch,
  configHead,
  values,
  close,
  dispatchTimeclose,
) => {
  let url = 'https://devgab.live-resto.fr/apiv2e/closings/add-simplified';

  // console.log(values,'values')
  // {"data": {"id": 4342, "time": 502}, "result": true}
  // console.log(configHead,'config')
  dispatch({type: LOADING});
  await axios
    .post(url, values, configHead)
    .then(res => {
      let Data = res.data;
      //  console.log(Data,'my data')

      console.log('Data', Data);
      console.log('Data.time ', Data.data.time);

      if (Data.data.time) {
        dispatchTimeclose(Data.data.time * 60);
      }

      return (
        res,
        // console.log('response closing restaurant'),
        // dispatch({type:ADD_SECONDS,payload:Data?.time * 60})
        dispatch({type: CLOSING_SUCCESS, payload: Data}),
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
