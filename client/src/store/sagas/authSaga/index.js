import { call, put, takeLatest } from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST
} from '../../actions/types';
import { signIn, signUp, verifyOTP } from '../../../Utils/APIs';
import { Cookies } from 'react-cookie'
import { toast } from 'react-toastify';
const cookie = new Cookies()

function* userLogin(action) {
  try {
    const body = JSON.stringify(action.payload)
    const res = yield call(signIn, body);
    if (res.status === 200) {
      cookie.set("user", { email: res.data.email, token: res.data.token }, { path: "/" })
      localStorage.setItem("token", res.data.token)
      yield put({ type: LOGIN_SUCCESS, payload: res.data });
    } else {
      yield put({ type: LOGIN_FAIL, payload: "Internal server error" });
    }
  } catch (e) {
    if (e.response.status === 400) {
      yield put({ type: LOGIN_FAIL, payload: e.response.data || "Invalid data" });
    } else {
      yield put({ type: LOGIN_FAIL, payload: e.message });
    }
  }
}

function* userRegister(action) {
  try {
    const body = JSON.stringify(action.payload)
    const res = yield call(signUp, body);
    if (res.status === 200) {
      yield put({ type: REGISTER_SUCCESS, payload: res.data });
    } else {
      yield put({ type: REGISTER_FAIL, payload: "Internal server error" });
    }
  } catch (e) {
    if (e.response.status === 409) {
      yield put({ type: REGISTER_FAIL, payload: "User already exist" });
    } else {
      yield put({ type: REGISTER_FAIL, payload: e.message });
    }
  }
}

function* OTPVerification(action) {
  try {
    const res = yield call(verifyOTP, action.payload);
    if (res.status === 201) {
      cookie.set("user", { email: res.data.email, token: res.data.user.token }, { path: "/" })
      localStorage.setItem("token", res.data.user.token)
      yield put({ type: OTP_VERIFY_SUCCESS, payload: res.data });
      toast.success("Registered successfully")
    } else {
      yield put({ type: OTP_VERIFY_FAIL, payload: "Internal server error" });
    }
  } catch (e) {
    if (e.response.status === 400) {
      yield put({ type: OTP_VERIFY_FAIL, payload: "wrong OTP" });
    } else {
      yield put({ type: OTP_VERIFY_FAIL, payload: e.message });
    }
  }
}

function* userLogout() {
  localStorage.removeItem("token")
  cookie.remove('user')
  yield put({ type: LOGOUT_SUCCESS })
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, userLogin);
  yield takeLatest(REGISTER_REQUEST, userRegister);
  yield takeLatest(OTP_VERIFY_REQUEST, OTPVerification);
  yield takeLatest(LOGOUT_REQUEST, userLogout);
}

export default authSaga;