import {firestoreForThisApp} from '../../App';
import {setLoading, setError} from './global';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export function getCategories(dispatch) {
    dispatch(setLoading(true));
    dispatch(setError(null));
    return firestoreForThisApp.collection("categories").get().then((response) => {
        let categories = [];
        response.forEach((doc) => {
            categories.push(Object.assign({}, {id: doc.id}, doc.data()));
        });
        dispatch(setLoading(false));
        dispatch({
            type: GET_CATEGORIES,
            value: categories
        })
    });
}