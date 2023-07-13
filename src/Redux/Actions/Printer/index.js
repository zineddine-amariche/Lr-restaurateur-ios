import {ADD, DELETE} from '../../Types/Printer';

export const Add = val => {
  return {
    type: ADD,
    payload: val + 1,
  };
};
export const Minus = val => {
  return {
    type: DELETE,
    payload: val - 1,
  };
};


