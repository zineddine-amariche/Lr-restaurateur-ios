import axios from "axios";
import moment from "moment";
import {
  LOADING_BYID_POST,
  POST_RESRBYID_SUCCESS,
  POST_RESRBYID_FAILED,
} from "../../../Types/Reservations";
import { GetReservationsListByDate } from "../getListReservationByDate";
import { GetReservationsData } from "../reservationsActions";

export const postReservations = async (
  dispatch,
  configHead,
  object,
  // DesAcitvePopUp
) => {
  //  console.log('configHead', configHead)
  // let url = `https://manager.my-resto.net/apiv2e/bookings/handleConfirm`;
   let url = `https://devgab.live-resto.fr/apiv2e/bookings/handleConfirm`;
  dispatch({ type: LOADING_BYID_POST });
  // console.log('object', object)
  await axios
    .post(url, object, configHead)
    .then((response) => {
      let result = response.data;
      // console.log('result', result)
      // DesAcitvePopUp();
      return (
        result,
        console.log("result result result", result),
        dispatch({ type: POST_RESRBYID_SUCCESS, payload: result.booking }),
        GetReservationsData(dispatch, configHead),
        GetReservationsListByDate(dispatch, configHead, { 
          for_when: moment(new Date()).format('YYYY-MM-DD'),})

      );
    })
    .catch((error) => {
      return (
        error,
        dispatch({ type: POST_RESRBYID_FAILED, payload: "échec request !" }),
        console.log("error.message", error.message)
      );
    });
};
