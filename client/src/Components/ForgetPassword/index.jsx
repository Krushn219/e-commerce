import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Forgetpassword } from '../../Utils/APIs';
import ViewModalSignIn from '../ViewModalSignIn';
import ViewModalsmLogin from '../ViewModalsmLogin';

const ForgetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { email } = useParams()
  const pattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const [forgetPass, setforgetPass] = useState({
    email: ''
  })
  const [modalShow, setModalShow] = useState(false);
  const [ModalLoginShow, setModalLoginShow] = useState(false)

  const ResetPassword = async () => {
    if (validation(forgetPass.email)) {
      try {
        const res = await Forgetpassword(forgetPass);
        if (res.status === 200) {
          toast.info("Email send to your mail...please check");
          navigate(`/reset-password/${forgetPass.email}`);
        } else {
          toast.error('this email address is invalid')
        }
      } catch (e) {
        toast.error('this email address is invalid')
      }
    }
  }

  const validation = (email) => {
    if (!email) {
      toast.error("Please enter email");
      return false;
    }

    if (!pattern.test(email)) {
      toast.error("Please enter email in correct format");
      return false;
    }

    return true;
  };

  const handleInputField = (e) => {
    setforgetPass((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  const closeModal = () => setModalShow(false);

  const closeModalLogin = () => setModalLoginShow(false)

  return (
    <>
      {location.pathname !== `/reset-password/${email}` && <ViewModalSignIn show={modalShow} onHide={closeModal} />}
      {location.pathname !== `/reset-password/${email}` && <ViewModalsmLogin show={ModalLoginShow} onHide={closeModalLogin} />}
      <div className="login-wrapper forget-password-wrapper">
        <div className="container">
          <form>
            <div className="login-title">
              <h4 className="mb-0">Forgot password?</h4>
              <p>Enter the email address associated with your account and we will send a link to reset your password.</p>
            </div>
            <div className="login-info">
              <div className="row justify-content-center">
                <div className="col-lg-3 col-md-3">
                  <label htmlFor='emailAdd'>Email</label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div>
                    <input
                      id='emailAdd'
                      type="email"
                      onChange={handleInputField}
                      name="email"
                      className='email-inputmain'
                      value={forgetPass.email} />
                  </div>
                </div>
              </div>
              <button type='button' className='mb-0 mt-4' onClick={ResetPassword}>Reset Password</button>
              <p className='text-center sign-up-account pt-2'>Remember your password? <span onClick={() => { setModalShow(true); setModalLoginShow(true) }}>Sign in</span></p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword