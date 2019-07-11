import axios from 'axios';
import {
  GET_PHONE_LIST_REQUEST,
  GET_PHONE_LIST_SUCCESS,
  GET_PHONE_LIST_FAILURE,
} from './../redux/action-type';

import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
} from './../redux/action-type';

export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id,
  };
};

//last
export function getPhoneList() {
  return dispatch => {
    dispatch({ type: GET_PHONE_LIST_REQUEST });
    axios
      .get(
        `https://raw.githubusercontent.com/mate-academy/phone-catalogue-static/master/api/phones.json`
      )
      .then(response => {
        dispatch({ type: GET_PHONE_LIST_SUCCESS, phones: response.data });
      })
      .catch(() => {
        dispatch({ type: GET_PHONE_LIST_FAILURE });
      });
  };
}
