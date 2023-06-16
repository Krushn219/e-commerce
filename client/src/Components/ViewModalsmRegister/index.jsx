import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { COMPLETE, NOT_ACTIVE, OTP_VERIFY_REQUEST, REGISTER_REQUEST, SET_REGISTER_REQUEST_STATUS } from "../../store/actions/types";
import loginleft from '../../assets/Images/about-main.svg'
import { Modal } from "react-bootstrap";
import ViewModalsmLogin from "../ViewModalsmLogin";
import OtpInput from "react-otp-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const ViewModalsmRegister = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [ModalLoginShow, setModalLoginShow] = useState(false)
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
      navigate('/profile')
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
  formData.append("otp", otp);

  const onVerifyOTP = () => {
    dispatch({
      type: OTP_VERIFY_REQUEST, payload: formData
    })
    navigate(`/`)
  };

  const registeragree = (obj) => {
    setuserData({ ...userData, ...obj });
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

  const closeModalLogin = () => setModalLoginShow(false)

  return (
    <>
      {/* {location.pathname !== "/my-account" && location.pathname !== "/forgotPassword" && <ViewModalsmLogin show={ModalLoginShow} onHide={closeModalLogin} />} */}
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        className="mt-4 category-view-modal modal-login-m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="register-sm-modal-body">
          <div className="close-btn-login" onClick={props.onHide}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className="registration-wrapper text-center">
            <div className="container">
              <div className="login-main-wrapper">
                <div className="header">Sign Up</div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="login-left-wrapper">
                    <img src={loginleft} className='img-fluid' alt="img" />
                  </div>
                </div>
                <div className="col-lg-6">
                  {!isRegister ? (
                    <div className="text-start registration-right-pannel">
                      <div className="login-title-main">
                        <p>Register your account</p>
                      </div>
                      <div>
                        <form>
                          <div className="register-info">
                            <div className="register-input">
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
                              <input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={userData.password}
                                onChange={onChangeHandler}
                              />{" "}
                              <br />
                            </div>
                            {/* <div className="mt-4">
                              <input type='radio' id="Vendor" className="me-3" />
                              <label htmlFor="Vendor" onClick={GoToVendorRegistration}>I'm a Vendor</label>
                            </div> */}
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
                            {/* <div className="already-registered justify-content-center align-items-center d-flex mb-3">
                              <p>Already have an account?</p>
                              <p onClick={() => setModalLoginShow(true)}>Sign in</p>
                            </div> */}
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
                        <form className="d-flex justify-content-center">
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
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ViewModalsmRegister