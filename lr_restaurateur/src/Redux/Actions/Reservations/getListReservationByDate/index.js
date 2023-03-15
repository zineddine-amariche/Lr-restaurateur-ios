import axios from "axios";
import { GET_RESR_BYDATE_FAILED, GET_RESR_BYDATE_SUCCESS } from "../../../Types/Reservations";
 

export const GetReservationsListByDate = async (dispatch, configHead, object ) => {
  // let url = 'https://manager.my-resto.net/apiv2e/bookings';
  let url = 'https://devgab.live-resto.fr/apiv2e/bookings';
  console.log('object', object)
  await axios
    .post(url, object, configHead)
    .then(response => {
      let result = response.data;
      return (
        result,
        // console.log('start res', JSON.stringify(result))
        dispatch({type: GET_RESR_BYDATE_SUCCESS, payload: result})
 
      );
    })
    .catch(error => {
      return (
        error,
        dispatch({type: GET_RESR_BYDATE_FAILED, payload: 'échec post !'}),
        console.log('error.GetReservationsListByDate', error.message)
      );
    });
};
