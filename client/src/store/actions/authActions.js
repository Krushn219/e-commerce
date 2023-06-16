import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAIL, 
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
  LOGOUT_SUCCESS,
} from './types';

// export const loginRequest = (payload) => {
//   return {
//     type: LOGIN_REQUEST,
//     payload
//   }
// }

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

export const loginFail = (payload) => {
  return {
    type: LOGIN_FAIL,
    payload
  }
}

export const register = (payload) => {
  return {
    type: REGISTER_REQUEST,
    payload
  }
}

export const verificationOTP = (payload) => {
  return {
    type: OTP_VERIFY_REQUEST,
    payload
  }
}

// logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}
