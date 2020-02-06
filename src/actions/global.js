
export const INIT_DONE = 'persist/REHYDRATE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const FLUSH_STATE = 'FLUSH_STATE';
export const UPDATE_CART = 'UPDATE_CART';
export const SET_AUTH = 'SET_AUTH';


export function setLoading(loading) {
    return {
        type: SET_LOADING,
        value: loading
    };
}

export function setError(error) {
    return {
        type: SET_ERROR,
        value: error
    };
}

export function flushState() {
  return {
    type: FLUSH_STATE,
    value: null
  };
}

export function updateCart(cart) {
  return {
    type: UPDATE_CART,
    value: cart
  };
}

export function setAuth(auth) {
  return {
    type: SET_AUTH,
    value: auth
  };
}