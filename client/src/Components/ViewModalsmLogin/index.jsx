import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import "./style.css"
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { COMPLETE, LOGIN_REQUEST, NOT_ACTIVE, SET_LOGIN_REQUEST_STATUS } from "../../store/actions/types";
import { Modal } from "react-bootstrap";
import ViewModalsmRegister from "../ViewModalsmRegister";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const ViewModalsmLogin = (props) => {
  const [ModalRegisterShow, setModalRegisterShow] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loginRequestStatus } = useSelector((state) => state.auth);
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

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

  const goToForgetPassword = () => {
    navigate(`/forgotPassword`)
  }

  const closeModalRegisterShow = () => setModalRegisterShow(false)

  return (
    <>
      <ViewModalsmRegister show={ModalRegisterShow} onHide={closeModalRegisterShow} />
      {!ModalRegisterShow && <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        className="mt-4 category-view-modal modal-login-m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="login-sm-modal-body login-main-wrapper">
          <div className="close-btn-login" onClick={props.onHide}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className="form-container sign-in-container" id="sign__in">
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
                <div className="form-link forgot pt-0">
                  <Link to="/forgotPassword" className="login-link" onClick={goToForgetPassword}>Forgot your password?</Link>
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
                <p className="create-account d-flex align-items-center"><span className="pe-2">Don't have an account?</span><div onClick={() => setModalRegisterShow(true)} className="click-btn">Click here</div></p>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>}
    </>
  )
}

export default ViewModalsmLogin