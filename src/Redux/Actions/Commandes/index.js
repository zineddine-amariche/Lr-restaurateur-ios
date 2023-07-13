import axios from 'axios';
import {
  CLOSE_COMMANDES,
  COMMANDES_BY_DATES,
  COMMANDES_FAILED,
  COMMANDES_OTHERS,
  COMMANDES_SUCCESS,
  COMMANDES_TOCONFIRM,
  DELETE_ORDERS,
  DES_REFRESH,
  LOADING,
  OPEN_COMMANDES,
  STOP_COMMANDES_LOADING,
} from '../../Types/Commandes';
import {DELETE_MESSAGES} from '../../Types/Login';
import {API_URL_PROD, API_URL_DEV} from '@env';

export const GetAllCommandes = async (dispatch, configHead) => {
  let API_BASE_URL;


  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }

  let url = `${API_BASE_URL}/orders`;


  await axios
    .get(url, configHead)
    .then(response => {
      let Commandes = response.data;
      // console.log('Commandes', Commandes)
      return (
        Commandes,
        dispatch({type: COMMANDES_SUCCESS, payload: Commandes.orders}),
        dispatch({
          type: COMMANDES_TOCONFIRM,
          payload: Commandes.orders.toConfirm,
        }),
        dispatch({type: COMMANDES_OTHERS, payload: Commandes.orders.others}),
        dispatch({type: DELETE_MESSAGES}),
        dispatch({type: DES_REFRESH})
      );
    })
    .catch(error => {
      return (
        error,
        dispatch({type: COMMANDES_FAILED, payload: 'échec get all !'}),
        console.log('error.GetAllCommandes', error.message)
      );
    });
};

export const GetCommandesByDate = async (dispatch, configHead, debut, fin) => {
  let API_BASE_URL;

  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }

  let url = `${API_BASE_URL}/orders`;

  let body = JSON.stringify({
    start: debut,
    end: fin,
  });
  dispatch({type: LOADING});
  await axios
    .post(url, body, configHead)
    .then(response => {
      let Commandes = response.data;
      return (
        Commandes,
        // console.log('start res', JSON.stringify(Commandes.orders)),
        dispatch({type: COMMANDES_BY_DATES, payload: Commandes.orders}),
        dispatch({
          type: COMMANDES_TOCONFIRM,
          payload: Commandes.orders.toConfirm,
        }),
        dispatch({type: COMMANDES_OTHERS, payload: Commandes.orders.others}),
        dispatch({type: DELETE_MESSAGES}),
        dispatch({type: DES_REFRESH})
      );
    })
    .catch(error => {
      return (
        error,
        dispatch({type: COMMANDES_FAILED, payload: 'échec by date 2!'}),
        console.log('error.GetCommandesByDate', error.message)
      );
    });
};

export const CloseCommandes = dispatch => {
  dispatch({type: STOP_COMMANDES_LOADING});
  dispatch({type: CLOSE_COMMANDES});
};

export const OpenCommandes = dispatch => {
  dispatch({type: LOADING});
  dispatch({type: OPEN_COMMANDES});
};

export const cleanOrders = dispatch => {
  dispatch({type: DELETE_ORDERS});
};
