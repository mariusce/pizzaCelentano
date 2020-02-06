import {combineReducers} from 'redux';
import global from './global';
import categories from './categories';
import products from './products';


const rootReducer = combineReducers({
  global,
  categories,
  products
});

export default rootReducer;
