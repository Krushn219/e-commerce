import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { COMPLETE, NOT_ACTIVE, OTP_VERIFY_REQUEST, REGISTER_REQUEST, SET_REGISTER_REQUEST_STATUS } from '../../store/actions/types';

const VendorRegistration = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { registerRequestStatus, verifyRequestStatus } = useSelector((state) => state.auth);
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const [isRegister, setisRegister] = useState(false);
  const [otp, setotp] = useState("");
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (registerRequestStatus === COMPLETE) {
      setotp("")
      setisRegister(true);
      dispatch({ type: SET_REGISTER_REQUEST_STATUS, payload: NOT_ACTIVE })
    }
  }, [registerRequestStatus])

  useEffect(() => {
    if (verifyRequestStatus === COMPLETE) {
      setotp("")
      navigate('/vendor-dashboard')
      dispatch({ type: SET_REGISTER_REQUEST_STATUS, payload: NOT_ACTIVE })
    }
  }, [verifyRequestStatus])

  const onSubmitHandler = () => {
    if (validate()) {
      dispatch({ type: REGISTER_REQUEST, payload: { email: userData.email } })
    }
  };

  const onVerifyOTP = () => {
    dispatch({
      type: OTP_VERIFY_REQUEST, payload: {
        firstname: userData.firstName,
        lastname: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        otp: otp
      }
    })
  };

  const onChangeHandler = (e) => {
    setuserData((value) => ({ ...value, [e?.target?.name]: e?.target?.value }));
  };

  const onChangeOTPHandler = (event) => {
    if (event.target.value.length <= 6) {
      setotp(event.target.value);
    }
  };

  const validate = () => {
    const { email, password, firstName, lastName, phone } = userData
    if (!firstName) {
      toast.error("Please enter first name")
      return false
    }

    if (!lastName) {
      toast.error("Please enter last name")
      return false
    }

    if (!email) {
      toast.error("Please enter email")
      return false;
    }

    if (!pattern.test(email)) {
      toast.error("Please enter email in correct format")
      return false;
    }

    if (!phone) {
      toast.error("Please enter phone")
      return false;
    }

    if (!password) {
      toast.error("Please enter password")
      return false;
    }

    return true;
  };

  return (
    <div className='container'>
      <div className="registration-wrapper reg-wrapper">
        {!isRegister ? (
          <div className="registration-sub-wrapper text-center">
            <h3 style={{ fontSize: "20px" }} className='reg-title'>Vendor Registration page</h3>
            <form>
              <div className="register-info">
                <div className="register-input">
                  <label className="reg-name">First Name :</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="first name"
                    value={userData.firstName}
                    onChange={onChangeHandler}
                  />{" "}
                  <br />
                </div>
                <div className="register-input">
                  <label className="reg-name">Last Name :</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    value={userData.lastName}
                    onChange={onChangeHandler}
                  />{" "}
                  <br />
                </div>
                <div className="register-input">
                  <label className="reg-name">Phone Number :</label>
                  <input
                    type="phone"
                    name="phone"
                    placeholder="phone"
                    value={userData.phone}
                    onChange={onChangeHandler}
                  />{" "}
                  <br />
                </div>
                <div className="register-input">
                  <label className="reg-name">Email Address :</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={userData.email}
                    onChange={onChangeHandler}
                  />{" "}
                  <br />
                </div>
                <div className="register-input">
                  <label className="reg-name">Password :</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={userData.password}
                    onChange={onChangeHandler}
                  />{" "}
                  <br />
                </div>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <input type='radio' id="Vendor" className="me-3" checked />
                  <label htmlFor="Vendor">I'm a Vendor</label>
                </div>
                <button className="register-btn" type="button" onClick={onSubmitHandler}>
                  Register Now
                </button>
              </div>
            </form>

          </div>
        ) : (
          <div className='otp-wrapper'>
            <p className='send'>Verify OTP</p> <br />
            <p className='send-message'>{`We have sent OTP on ${userData.email}.`}<br />
              {`This OTP will valid for only 5 minutes`}</p>
            <div>
              <form>
                <input type="number" maxLength={10} name="otp" placeholder="Enter OTP" value={otp} onChange={onChangeOTPHandler} className='otp-input' />
              </form>
              <button onClick={() => setisRegister(false)} className='cancel-btn'>Cancel</button>  <button onClick={onVerifyOTP} className='ok-btn'>Yes </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VendorRegistration