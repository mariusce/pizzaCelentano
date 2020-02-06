import {firestoreForThisApp} from '../../App';
import {setLoading, setError} from './global';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';

export function getProducts(dispatch) {
    dispatch(setLoading(true));
    dispatch(setError(null));
    return firestoreForThisApp.collection("products").get().then((response) => {
        let products = [];
        response.forEach((doc) => {
            products.push(Object.assign({}, {id: doc.id}, doc.data()));
        });
        dispatch(setLoading(false));
        dispatch({
            type: GET_PRODUCTS,
            value: products
        })
    });
}

export function updateProducts(products) {
    return {
        type: UPDATE_PRODUCTS,
        value: products
    }
}