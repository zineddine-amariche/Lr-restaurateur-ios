import axios from 'axios';
import {COMMANDES_FAILED} from '../../Types/Commandes';
import {API_URL_PROD, API_URL_DEV} from '@env';

export const GetAll = async (dispatch, configHead) => {
  let API_BASE_URL;

//   if (__DEV__) {
//     API_BASE_URL = API_URL_DEV;
//   } else {
//     API_BASE_URL = API_URL_PROD;
//   }

//   let url = `${API_BASE_URL}/orders`;

//   await axios
//     .get(url, configHead)
//     .then(response => {
//       let data = response.data;
//       console.log('Commandes', Commandes);
//       return (
//         data, console.log('data', data)
//         // dispatch({type: COMMANDES_SUCCESS, payload: Commandes.orders})
//       );
//     })
//     .catch(error => {
//       return (
//         error,
//         // dispatch({type: COMMANDES_FAILED, payload: 'échec get all !'}),
//         console.log('error.GetAllCommandes', error.message)
//       );
//     });
try {
    
} catch (error) {
    
}
};
