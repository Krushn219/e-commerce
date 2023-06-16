import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import "./style.css"
import loginleft from '../../assets/Images/about-main.svg'
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { COMPLETE, LOGIN_REQUEST, NOT_ACTIVE, OTP_VERIFY_REQUEST, REGISTER_REQUEST, SET_LOGIN_REQUEST_STATUS, SET_REGISTER_REQUEST_STATUS } from "../../store/actions/types";


const Login = () => {

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

  const goToForgetPassword = () => {
    navigate(`/forgotPassword`)
  }

  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton?.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton?.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  function myFunction___ad() {
    var signIn = document.getElementById("container");
    signIn?.classList.toggle("sign-in-container__show");
    signIn?.classList.remove("sign-up-container__show");
  }

  function myFunction___hi() {
    var signUp = document.getElementById("container");
    signUp?.classList.toggle("sign-up-container__show");
    signUp?.classList.remove("sign-in-container__show");
  }

  return (
    <>
      <div className="login-main-wrapper">
        <div className="container" id="container">
          {!isRegister ? (
            <div className="form-container  sign-up-container">
              <form action="">
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
                      className="reg-img-input"
                      type="file"
                      name='image'
                      onChange={fileSelectedHandler} />
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
                  <div className="alert-text signup__alert">
                    <span className="help__text">At least 8 character</span>
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
                    <button className="signup-btn" onClick={onSubmitHandler}>Sign Up</button>
                  </div>
                  {/* <div className="log__in___adata">
                    <h5 className="" onclick={myFunction___ad()}> LogIn this web</h5>
                  </div> */}
                </div>

              </form>
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
                    required pattern=".{8,}" />
                </div>
                <div className="alert-text signup__alert">
                  <span className="help__text">At least 8 character</span>
                </div>
                <div className="form-link forgot">
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

                <div className="log__in___adata">
                  <h5 className="" onClick={myFunction___hi()}> SignUp this web</h5>
                </div>
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
                  <button className="ghost" id="signUp" onClick={onSubmitHandler}>Sign up</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* <div className="login-wrapper">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="login-left-wrapper">
                <img src={loginleft} className='img-fluid' alt="img" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="login-main-wrapper-data text-start">
                <div className="login-title-main">
                  <h2>Hello, <br /> Welcome back</h2>
                </div>
                <form>
                  <div>
                    <input
                      className="login-name-input"
                      onChange={handleInputField}
                      name="email"
                      value={loginData?.email}
                      type="email"
                      placeholder="Please enter email address"
                    />
                    <input
                      type="password"
                      className="login-name-input"
                      onChange={handleInputField}
                      name="password"
                      value={loginData?.password}
                      placeholder="Please enter password"
                    />
                    <div className="remember-login d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center remember-login-text">
                        <input type="checkbox"
                          className="form-check-input me-2 mt-0"
                          checked={loginData.isAgree}
                          name="isAgree"
                          onChange={(e) => registeragree({ isAgree: e.target.checked })} />
                        <p className='ms-2 mb-0'>Remember me</p>
                      </div>
                      <div>
                        <p className="forget-pass mb-0" onClick={goToForgetPassword}>Forget Your Password?</p>
                      </div>
                    </div>
                    <button type='button' className="login-btn-main" onClick={handle}>Login</button>
                    <p className="create-account"><span className="pe-2">Don't have an account?</span><Link to="/register" className="click-btn">Click here</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Login;
