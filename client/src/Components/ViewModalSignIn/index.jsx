import React, { useEffect, useState } from "react";
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Link, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import { COMPLETE, LOGIN_REQUEST, NOT_ACTIVE, OTP_VERIFY_REQUEST, REGISTER_REQUEST, SET_LOGIN_REQUEST_STATUS, SET_REGISTER_REQUEST_STATUS } from "../../store/actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ViewModalsmSignIn from "../ViewModalsmSignIn";
import ViewModalsmRegister from "../ViewModalsmRegister";
import OtpInput from "react-otp-input";

const ViewModalSignIn = (props) => {
  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegister, setModalRegiter] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loginRequestStatus } = useSelector((state) => state.auth);
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const { registerRequestStatus, verifyRequestStatus } = useSelector((state) => state.auth);
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const [isRegister, setisRegister] = useState(false);
  const [otp, setotp] = useState("");
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (validate(userData.email, userData.firstName, userData.lastName, userData.password, userData.email)) {
      dispatch({ type: REGISTER_REQUEST, payload: { email: userData.email } })
    }
  };

  const formData = new FormData();
  formData.append("firstname", userData.firstName);
  formData.append("lastname", userData.lastName);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("phone", userData.phone);
  formData.append("otp", otp);

  const onVerifyOTP = () => {
    dispatch({
      type: OTP_VERIFY_REQUEST, payload: formData
    })
    navigate(`/`)
  };

  const onChangeHandler = (e) => {
    setuserData((value) => ({ ...value, [e?.target?.name]: e?.target?.value }));
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

    if (!phoneRegex.test(phone)) {
      toast.error("please enter mobile number in correct format")
      return false;
    }

    if (!password) {
      toast.error("Please enter password")
      return false;
    }

    return true;
  };

  const TermsCondition = () => {
    navigate(`/terms-condition`)
  }

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
    isAgree: false
  });

  const handleInputField = (e) => {
    setloginData((value) => ({
      ...value,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  useEffect(() => {
    if (loginRequestStatus === COMPLETE) {
      const nextPath = localStorage.getItem("nextPath")
      navigate(nextPath || '/my-account')
      localStorage.removeItem("nextPath")
      dispatch({ type: SET_LOGIN_REQUEST_STATUS, payload: NOT_ACTIVE })
    }
  }, [loginRequestStatus])

  const handle = (e) => {
    e.preventDefault();
    if (loginData.isAgree) {
      if (validation(loginData?.email, loginData?.password)) {
        dispatch({ type: LOGIN_REQUEST, payload: { ...loginData } })
      }
    } else {
      toast.error("Agree to please click")
    }
  };

  const validation = (email, password) => {

    if (!email && !password) {
      toast.error("All fields are required")
      return false
    }

    if (!email) {
      toast.error("Please enter email")
      return false
    }

    if (!pattern.test(email)) {
      toast.error("Please enter email in correct format")
      return false
    }

    if (pattern.test(email) && !password) {
      toast.error("Please enter password")
      return false
    }
    return true;
  };

  const registeragree = (obj) => {
    setloginData({ ...loginData, ...obj });
  };

  const registeragreemain = (obj) => {
    setuserData({ ...userData, ...obj });
  };

  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton?.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton?.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  var signIn = document.getElementById("container");
  signIn?.classList.toggle("sign-in-container__show");
  signIn?.classList.remove("sign-up-container__show");

  var signUp = document.getElementById("container");
  signUp?.classList.toggle("sign-up-container__show");
  signUp?.classList.remove("sign-in-container__show");

  const closeModalsmLogin = () => setModalLogin(false)

  const closeModalsmRegister = () => setModalRegiter(false)

  return (
    <>
      {location.pathname !== "/my-account" && <ViewModalsmSignIn show={modalLogin} onHide={closeModalsmLogin} />}
      {location.pathname !== "/my-account" && <ViewModalsmRegister show={modalRegister} onHide={closeModalsmRegister} />}

      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        className="mt-4 category-view-modal login-main-modallarge modal-login-m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="login-modal-body">
          <div className="close-btn-login" onClick={props.onHide}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className="login-main-wrapper">
            <div className="container" id="container">
              {/* Login */}
              <div className="form-container  sign-in-container" id="sign__in">
                <form onSubmit={handle}>
                  <div className="header">Sign In</div>
                  <span className="under__social">
                    <Link to='' className="link signup-link">or use your account</Link>
                  </span>
                  <div className="button-input-group">
                    <div className="group input-group">
                      <input
                        onChange={handleInputField}
                        name="email"
                        value={loginData?.email}
                        type="email"
                        placeholder="Please enter email address"
                        required />
                    </div>
                    <div className="group input-group">
                      <input
                        type="password"
                        onChange={handleInputField}
                        name="password"
                        value={loginData?.password}
                        placeholder="Please enter password"
                        required />
                    </div>
                    {/* <div className="alert-text signup__alert">
                      <span className="help__text">At least 8 character</span>
                    </div> */}
                    <div className="form-link forgot pt-0">
                      <Link to="/forgotPassword" className="login-link">Forgot your password?</Link>
                    </div>
                    <div className="d-flex align-items-center remember-login-text mb-3">
                      <input type="checkbox"
                        className="form-check-input me-2 mt-0"
                        checked={loginData.isAgree}
                        name="isAgree"
                        onChange={(e) => registeragree({ isAgree: e.target.checked })} />
                      <p className='ms-2 mb-0'>Remember me</p>
                    </div>
                    <div className="group button-group">
                      <button className="signin-btn" type="submit">Sign in</button>
                    </div>
                    <p className="create-account d-flex align-items-center already-account"><span className="pe-2">Don't have an account?</span><Link to="" className="click-btn">Click here</Link></p>
                  </div>
                </form>
              </div>
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Welcome Back</h1>
                    <p>Please login your personal info</p>

                    <div className="group button-group">
                      <button className="ghost" id="signIn">Sign in</button>
                    </div>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start your journey with us</p>
                    <div className="group button-group">
                      <Link to=""><button className="ghost" id="signUp">Sign up</button></Link>
                    </div>
                  </div>
                </div>
              </div>
              {!isRegister ? (
                <div className="form-container  sign-up-container">
                  <form onSubmit={onSubmitHandler}>
                    <div className="header">Sign Up</div>
                    <span className="under__social">
                      <Link to="" className="link signin-link">or use your email for registration
                      </Link>
                    </span>
                    <div className="button-input-group">
                      <div className="group input-group">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="first name"
                          value={userData.firstName}
                          onChange={onChangeHandler}
                          required />
                      </div>
                      <div className="group input-group">
                        <input
                          type="text"
                          name="lastName"
                          placeholder="last name"
                          value={userData.lastName}
                          onChange={onChangeHandler}
                          required />
                      </div>
                      <div className="group input-group">
                        <input
                          type="phone"
                          name="phone"
                          placeholder="phone"
                          value={userData.phone}
                          onChange={onChangeHandler}
                          required />
                      </div>
                      <div className="group input-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="email"
                          value={userData.email}
                          onChange={onChangeHandler}
                          required />
                      </div>
                      <div className="group input-group">
                        <input
                          type="password"
                          name="password"
                          placeholder="password"
                          value={userData.password}
                          onChange={onChangeHandler}
                          required pattern=".{8,}" />
                      </div>
                      <div className="remember-info mb-3">
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={userData.isAgree}
                            name="isAgree"
                            onChange={(e) => registeragreemain({ isAgree: e.target.checked })}
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
                      <div className="group button-group">
                        <button className="signup-btn" type="submit">Sign Up</button>
                      </div>
                      {/* <p className="create-account d-flex align-items-center already-account"><span className="pe-2">Already have an account?</span><div onClick={() => setModalLogin(true)} className="click-btn">Click here</div></p> */}

                    </div>

                  </form>
                </div>
              ) : (
                <div className='form-container sign-up-container p-3'>
                  <p className='send'>Verify OTP</p> <br />
                  <p className='send-message pb-2'>{`We have sent OTP on ${userData.email}.`}<br />
                    {`This OTP will valid for only 5 minutes`}</p>
                  <div>
                    <form>
                      <OtpInput
                        value={otp}
                        onChange={(data) => setotp(data)}
                        numInputs={6}
                        className="inputStyle"
                      />
                    </form>
                    <button onClick={() => setisRegister(false)} className='cancel-btn'>Cancel</button>  <button onClick={onVerifyOTP} className='ok-btn'>Yes</button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ViewModalSignIn