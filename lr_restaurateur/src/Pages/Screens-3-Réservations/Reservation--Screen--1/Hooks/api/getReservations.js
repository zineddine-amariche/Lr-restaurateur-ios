import {useMutation} from 'react-query';
import axios from 'axios';

const getingListReservation = (object, configHead) => {
  let url = `https://manager.my-resto.net/apiv2e/bookings`;

  return axios.post(url, object, configHead);
};

export const useGetListReservations = () => {
  return useMutation(getingListReservation);
};
