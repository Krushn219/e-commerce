import axios from 'axios';
import { GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, PRODUCTS_LOADING } from './types';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/items')
    .then(res => dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addItem = (item) => (dispatch) => {
  axios.post('/api/items', item)
    .then(res => dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = (id) => (dispatch) => {
  axios.delete(`/api/items/${id}`)
    .then(res => dispatch({
      type: DELETE_PRODUCT,
      payload: id
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const updateItem = (id, item) => (dispatch) => {
  axios.put(`/api/items/${id}`, item)
    .then(res => dispatch({
      type: UPDATE_PRODUCT,
      payload: Promise.all([id, res.data])
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setItemsLoading = () => {
  return {
    type: PRODUCTS_LOADING
  }
}