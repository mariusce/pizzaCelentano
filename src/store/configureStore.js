import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import {createLogger} from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(
  thunk, createLogger()
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
