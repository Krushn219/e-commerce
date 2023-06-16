import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const initialState = {};

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
	initialState,
	reducer: rootReducer,
	middleware: [sagaMiddleware],
	devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga)

export default store;