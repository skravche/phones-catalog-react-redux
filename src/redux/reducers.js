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

const initialState = {
  listLoading: false,
  phones: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PHONE_LIST_REQUEST:
      return {
        ...state,
        listLoading: true,
      };
    case GET_PHONE_LIST_SUCCESS:
      return {
        ...state,
        listLoading: false,
        phones: action.phones,
      };
    case GET_PHONE_LIST_FAILURE:
      return {
        ...state,
        listLoading: false,
      };

    //new
    case ADD_TO_CART:
      return {
        ...state,
        card: '',
        // cart: {  ...state.cart,[{id: '', }]}}
      };

    default:
      return state;
  }
}

// function todoApp(state = initialState, action) {
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//       return Object.assign({}, state, {
//         visibilityFilter: action.filter
//       })
//     default:
//       return state
//   }
// }
