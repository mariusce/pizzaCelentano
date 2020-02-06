import {
    GET_PRODUCTS,
    UPDATE_PRODUCTS
} from '../actions/products';

import {FLUSH_STATE} from '../actions/global';

const INITIAL_STATE = {
  data: null,   
  isFetching: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, {
        data: action.value,
        isFetching: false
      });
    case UPDATE_PRODUCTS:
      return Object.assign({}, state, {data: action.value})
    case FLUSH_STATE:
      return Object.assign({}, state, INITIAL_STATE);
    default:
      return state;
  }
}