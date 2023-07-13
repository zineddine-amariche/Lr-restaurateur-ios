import axios from 'axios';
import {
  DELETE_MESSAGES,
  LOADING,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_INFORMATIONS,
} from '../../Types/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Logout = async dispatch => {
  dispatch({type: LOGOUT});
  AsyncStorage.setItem('login', ''), AsyncStorage.setItem('password', '');
};
import {API_URL_PROD, API_URL_DEV} from '@env';

export const dispatchLogin = async (dispatch, configHead, values) => {

  let API_BASE_URL;
// console.log('__DEV__', __DEV__)
  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }
  let url = `${API_BASE_URL}/establishments/authenticate`;
  dispatch({type: LOADING});
  await axios
    .post(url, values, configHead)

    .then(res => {
      let Data = res.data;
      // console.log('Data', Data);

      let headers = {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fr',
          accept: 'application/json',
          Authorization: 'Bearer ' + Data.token,
          login: Data.login,
          establishment: Data.establishments[0].id,
        },
      };
      return (
        res,
        dispatch({type: LOGIN_SUCCESS, payload: Data}),
        dispatch({type: DELETE_MESSAGES}),
        AsyncStorage.setItem('login', Data.login),
        AsyncStorage.setItem('password', values.password),
        dispatchGetInformation(dispatch, headers, Data.establishments[0].id)
      );
    })
    .catch(error => {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return (
        message,
        dispatch({
          type: LOGIN_FAILED,
          payload: message?.error?.message ? message?.error?.message : message,
        }),
        console.log('error.----', message ? message : message?.error?.message)
      );
    });
};



export const dispatchGetInformation = async (
  dispatch,
  configHead,
  establishment_id,
) => {
  dispatch({type: LOADING});

  let API_BASE_URL;

  if (__DEV__) {
    API_BASE_URL = API_URL_DEV;
  } else {
    API_BASE_URL = API_URL_PROD;
  }
  let url = `${API_BASE_URL}/establishments/retrieve/${establishment_id}`;

  await axios
    .get(url, configHead)
    .then(res => {
      let Data = res.data;

      return (
        Data,
        dispatch({type: USER_INFORMATIONS, payload: Data.establishment}),
        dispatch({type: DELETE_MESSAGES})
      );
    })
    .catch(error => {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      return (
        error,
        //  dispatch({
        //    type: USER_INFORMATIONS_FAILED,
        //    payload: message?.error?.message ? message?.error?.message : '/message?.error?.message',
        //  }),
        console.log(
          'error.dispatchGetInformation',
          message?.error?.message ? message?.error?.message : message,
        )
      );
    });
};









// export const dispatchLoginStorage = async (
//   dispatch,
//   configHead,
//   userLogin,
//   userPassword,
// ) => {
//   dispatch({type: LOADING});
//   // console.log('start')

//   let url = 'https://dev500.live-resto.fr/apiv2e/establishments/authenticate';
//   let body = JSON.stringify({
//     login: userLogin,
//     password: userPassword,
//   });
//   await axios
//     .post(url, body, configHead)

//     .then(res => {
//       // console.log(
//       //   'DATA ||||||||||||| 2 ',
//       //   res.data.establishment,
//       // );
//       let Data = res.data.establishment;

//       return (
//         Data,
//         dispatch({type: LOGIN_SUCCESS, payload: Data}),
//         dispatch({type: DELETE_MESSAGES})
//         // console.log('resAsync', Data)
//       );
//     })
//     .catch(error => {
//       return (
//         error,
//         dispatch({type: LOGIN_FAILED, payload: 'échec de connexion !'}),
//         console.log('error.dispatchLoginStorage', error.message)
//       );
//     });
// };
