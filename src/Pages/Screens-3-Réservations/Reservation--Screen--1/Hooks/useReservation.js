import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postReservations} from '../../../../Redux/Actions/Reservations/accepte_decline_reservations';
import {GetReservationsById} from '../../../../Redux/Actions/Reservations/GetResrvation';
import {API_URL_PROD, API_URL_DEV} from '@env';

export function useReservation() {
  const Commandes = useSelector(state => state.Commandes);
  const {toComfirm, others, loading_btn, refresh} = Commandes;
  const Printer = useSelector(state => state.Printer);
  const {isPrinter} = Printer;

  const [orders, setOrders] = useState([]);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const mergedArray = [...toComfirm, ...others];
  const {Token, login, establishments} = auth;

  let configHead = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'fr',
      accept: 'application/json',
      Authorization: 'Bearer ' + Token,
      login: login?.login,
      establishment: establishments?.id,
    },
  };

  const GetProducts = async id => {
    try {
      if (Token) {
        // console.log('fetch', Token, id);

        // let url = "https://m2.live-resto.fr/apiv2e/orders/details"
        // let url = 'https://devgab.live-resto.fr/apiv2e/orders/details';


    let API_BASE_URL;

    if (__DEV__) {
      API_BASE_URL = API_URL_DEV;
    } else {
      API_BASE_URL = API_URL_PROD;
    }

    let url = `${API_BASE_URL}/orders/details`;

        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'fr',
            Authorization: 'Bearer ' + Token,
            login: login?.login,
            establishment: establishments?.id,
          },
          body: JSON.stringify({
            orderId: id,
          }),
        })
          .then(res => res.json())
          .then(dataStatus => {
            // console.log('dataStatus', dataStatus.order.products);
            setOrders(dataStatus.order.products);
            // dispatch({type: SUCCESS});

            // console.log('orders', orders)
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [Loading, setLoading] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [VisibleV, setVisibleV] = useState(false);

  const ActiveChange = () => {
    setIsChanged(true);
  };

  const getReservations = useSelector(state => state.getReservations);

  const {result_token} = getReservations;
  const {establishment_id, pos_id, token} = result_token;

  let configHeader = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'fr',
      accept: 'application/json',
      Authorization: 'Bearer ' + token,
      login: login?.login,
      establishment: establishments?.id,
    },
  };
  const set = () => {
    setVisible(true);
  };

  const AcitvePopUp = id => {
    setVisible(true);
    GetReservationsById(dispatch, configHeader, id);
  };
  const DesAcitvePopUp = () => {
    setVisible(false);
  };

  const AcitvePopUpV = id => {
    console.log('id', id);
    setVisibleV(true);
    // GetReservationsById(dispatch, configHeader, id);
  };

  const DesAcitvePopUpV = () => {
    setVisibleV(false);
  };

  const ToReservation = () => {
    navigation.navigate('Reservation');
  };

  const ToCommandes = () => {
    navigation.navigate('Commandes');
  };

  return {
    DesAcitvePopUp,
    AcitvePopUp,
    ActiveChange,
    GetProducts,
    mergedArray,
    orders,
    Visible,
    VisibleV,
    AcitvePopUpV,
    DesAcitvePopUpV,
    set,
    configHead,
    configHeader,
    dispatch,
    ToReservation,
    ToCommandes,
  };
}
