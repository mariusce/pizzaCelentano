import {
  INIT_DONE,
  SET_ERROR,
  SET_LOADING,
  FLUSH_STATE,
  UPDATE_CART,
  SET_AUTH
} from '../actions/global';

const INITIAL_STATE = {
  error: null,
  isInitDone: false,
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case INIT_DONE:
      return Object.assign({}, state, {isInitDone: true});
    case SET_LOADING:
      return Object.assign({}, state, {loading: action.value});
    case SET_ERROR:
      let error = action.value;
      return Object.assign({}, state, {error: error});
    case FLUSH_STATE:
      return Object.assign({}, state, INITIAL_STATE, {isInitDone: true});
    case SET_AUTH:
      return Object.assign({}, state, {auth: action.value});
    case UPDATE_CART:
      return Object.assign({}, state, {cart: action.value});
    default:
      return state;
  }
}
