import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { COMPLETE, NOT_ACTIVE, OTP_VERIFY_REQUEST, REGISTER_REQUEST, SET_REGISTER_REQUEST_STATUS } from "../../store/actions/types";
import loginleft from '../../assets/Images/about-main.svg'

const Registration = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { registerRequestStatus, verifyRequestStatus } = useSelector((state) => state.auth);
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const [isRegister, setisRegister] = useState(false);
  const [otp, setotp] = useState("");
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    image: "",
    isAgree: false
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
      navigate('/my-account')
      dispatch({ type: SET_REGISTER_REQUEST_STATUS, payload: NOT_ACTIVE })
    }
  }, [verifyRequestStatus])

  const onSubmitHandler = () => {
    if (userData.isAgree) {
      if (validate()) {
        dispatch({ type: REGISTER_REQUEST, payload: { email: userData.email } })
      }
    } else {
      toast.error("Agree to please click")
    }
  };

  const formData = new FormData();
  formData.append("firstname", userData.firstName);
  formData.append("lastname", userData.lastName);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("phone", userData.phone);
  formData.append("image", userData.image);
  formData.append("otp", otp);

  const onVerifyOTP = () => {
    dispatch({
      type: OTP_VERIFY_REQUEST, payload: formData
    })
    toast.success('registered successfully')
    navigate(`/`)
  };

  const registeragree = (obj) => {
    setuserData({ ...userData, ...obj });
  };

  const fileSelectedHandler = (e) => {
    setuserData((value) => ({
      ...value,
      image: e?.target?.files[0],
    }));
  }

  const onChangeHandler = (e) => {
    setuserData((value) => ({ ...value, [e?.target?.name]: e?.target?.value }));
  };

  const onChangeOTPHandler = (event) => {
    if (event?.target.value.length <= 6) {
      setotp(event.target.value);
    } else {
      toast.error("max 6 digits add")
    }
  };

  const validate = () => {
    const { email, password, firstName, lastName, phone, image } = userData
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

    if (!phoneRegex.test(phone)) {
      toast.error("please enter mobile number in correct format")
      return false;
    }

    if (!password) {
      toast.error("Please enter password")
      return false;
    }

    if (!image) {
      toast.error("Please provide an image")
      return false;
    }

    return true;
  };

  const GoToVendorRegistration = () => {
    navigate(`/vendor-register`)
  }

  const TermsCondition = () => {
    navigate(`/terms-condition`)
  }

  const goTologin = () => {
    navigate(`/login`)
  }

  return (
    <>
      <div className="registration-wrapper">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="login-left-wrapper">
                <img src={loginleft} className='img-fluid' alt="img" />
              </div>
            </div>
            <div className="col-lg-6">
              {!isRegister ? (
                <div className="text-start registration-right-pannel">
                  <div className="already-registered justify-content-end align-items-center d-flex mb-3">
                    <p>Already have an account?</p>
                    <button className="sign-in-btnmain" onClick={goTologin}>Sign in</button>
                  </div>
                  <div className="login-title-main">
                    <h2>Welcome to Focus</h2>
                    <p>Register your account</p>
                  </div>
                  <div>
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
                          <label className="reg-name">Profile Image :</label>
                          <input
                            type="file"
                            name='image'
                            onChange={fileSelectedHandler} />
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
                        <div className="mt-4">
                          <input type='radio' id="Vendor" className="me-3" />
                          <label htmlFor="Vendor" onClick={GoToVendorRegistration}>I'm a Vendor</label>
                        </div>
                        <div className="mt-4 remember-info">
                          <div>
                            <input
                              type="checkbox"
                              className="form-check-input me-2"
                              checked={userData.isAgree}
                              name="isAgree"
                              onChange={(e) => registeragree({ isAgree: e.target.checked })}
                            />
                            <span>
                              I agree to the{" "}
                              <span
                                className="terms-condition"
                                onClick={TermsCondition}
                              >
                                terms and conditions
                              </span>
                              .
                            </span>
                          </div>
                        </div>
                        <button className="register-btn" type="button" onClick={onSubmitHandler}>
                          Register Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className='otp-wrapper'>
                  <p className='send'>Verify OTP</p> <br />
                  <p className='send-message pb-2'>{`We have sent OTP on ${userData.email}.`}<br />
                    {`This OTP will valid for only 5 minutes`}</p>
                  <div>
                    <form>
                      <input type="number" maxLength={10} name="otp" placeholder="Enter OTP" value={otp} onChange={onChangeOTPHandler} className='otp-input' />
                    </form>
                    <button onClick={() => setisRegister(false)} className='cancel-btn'>Cancel</button>  <button onClick={onVerifyOTP} className='ok-btn'>Yes</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
