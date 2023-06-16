import { toast } from 'react-toastify';
import {
	LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
	REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
	OTP_VERIFY_REQUEST,
	OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
	LOGOUT_REQUEST,
	SET_LOGIN_REQUEST_STATUS,
	SET_LOGOUT_REQUEST_STATUS,
	SET_VERIFY_REQUEST_STATUS,
	SET_REGISTER_REQUEST_STATUS,
	NOT_ACTIVE,
	ACTIVE,
	COMPLETE,
	FAIL
} from '../actions/types';
import { Cookies } from 'react-cookie';
const cookie = new Cookies()

const initialState = {
  isAuthenticated: !!cookie.get('user') || null,
  user: cookie.get('user') || null,
	loginRequestStatus: NOT_ACTIVE,
	registerRequestStatus: NOT_ACTIVE,
	verifyRequestStatus: NOT_ACTIVE,
	logoutRequestStatus: NOT_ACTIVE
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case SET_LOGIN_REQUEST_STATUS:
			return {
				...state,
				loginRequestStatus: action.payload
			}
		case SET_LOGOUT_REQUEST_STATUS:
			return {
				...state,
				logoutRequestStatus: action.payload
			}
		case SET_REGISTER_REQUEST_STATUS:
			return {
				...state,
				registerRequestStatus: action.payload
			}
		case SET_VERIFY_REQUEST_STATUS:
			return {
				...state,
				verifyRequestStatus: action.payload
			}
		case LOGIN_REQUEST:
			return {
				...state,
				loginRequestStatus: ACTIVE
			};
		case LOGOUT_REQUEST:
			return {
				...state,
				logoutRequestStatus: ACTIVE
			};
		case REGISTER_REQUEST:
			return {
				...state,
				registerRequestStatus: ACTIVE
			};
		case OTP_VERIFY_REQUEST:
			return {
				...state,
				verifyRequestStatus: ACTIVE
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				registerRequestStatus: COMPLETE,
				isAuthenticated: false,
			}
		case LOGIN_SUCCESS:
			toast.info("Login successfully")
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loginRequestStatus: COMPLETE
			};
		case OTP_VERIFY_SUCCESS:
			toast.info("Login successfully")
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				verifyRequestStatus: COMPLETE
			};
		case LOGIN_FAIL:
			toast.error(action.payload)
			return {
				...state,
				user: null,
				isAuthenticated: false,
				loginRequestStatus: FAIL
			};
		case REGISTER_FAIL:
			toast.error(action.payload)
			return {
				...state,
				user: null,
				isAuthenticated: false,
				registerRequestStatus: FAIL
			};
		case OTP_VERIFY_FAIL:
			toast.error(action.payload)
			return {
				...state,
				user: null,
				isAuthenticated: false,
				verifyRequestStatus: FAIL
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				user: null,
				isAuthenticated: false,
				logoutRequestStatus: COMPLETE
			};
		default:
			return state;
	}
}