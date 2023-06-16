import {
	GET_PRODUCTS,
	PRODUCTS_LOADING
} from '../actions/types';

const initialState = {
	products: [],
	loading: false
}

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			return {
				...state,
				products: action.payload,
				loading: false
			}

		case PRODUCTS_LOADING:
			return {
				...state,
				loading: true
			}

		default:
			return state;
	}
}