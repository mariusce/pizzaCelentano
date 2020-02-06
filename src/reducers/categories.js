import {
    GET_CATEGORIES
} from '../actions/categories';

import {FLUSH_STATE} from '../actions/global';

const INITIAL_STATE = {
  data: null,   
  isFetching: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, {
        data: action.value,
        isFetching: false
      });
    case FLUSH_STATE:
      return Object.assign({}, state, INITIAL_STATE);
    default:
      return state;
  }
}