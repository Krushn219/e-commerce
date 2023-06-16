import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Resetpassword } from '../../Utils/APIs'

const ResetPassword = () => {
  const { email } = useParams()
  const navigate = useNavigate()
  const [resetPass, setresetPass] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  const ResetYourPassword = async () => {
    if (validation(resetPass.newPassword, resetPass.confirmPassword)) {
      try {
        const res = await Resetpassword(resetPass, email);
        if (res.status === 200) {
          toast.success("change password successfully")
          navigate(`/`)
        } else {
          toast.error("User does not exist..")
        }
      } catch (error) {
        toast.error('User does not exist..')
      }
    }
  }

  const validation = (newPassword, confirmPassword) => {
    if (!newPassword) {
      toast.error("Please enter newPassword");
      return false;
    }

    if (!confirmPassword) {
      toast.error("Please enter Confirmpassword");
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("password does not match..")
      return false;
    }

    return true;
  };

  const handleInputField = (e) => {
    setresetPass((value) => ({
      ...value,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div className="login-wrapper reset-password-wrapper">
      <div className="container">
        <form>
          <div className="login-title">
            <h4 className='mb-0'>Reset Password</h4>
            <p>Please enter your new password.</p>
          </div>
          <div className="login-info">
            <div className="row mb-3 align-items-center justify-content-center">
              <div className="col-md-3 pe-2">
                <label htmlFor="newpassword">New Password</label>
              </div>
              <div className="col-md-6">
                <input
                  className="login-name-input"
                  type="password"
                  id='newpassword'
                  name='newPassword'
                  value={resetPass.newPassword}
                  onChange={handleInputField}
                />
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-md-3 pe-2">
                <label htmlFor="confirmPassword me-2">Confirm Password</label>
              </div>
              <div className="col-md-6">
                <input
                  className="login-name-input"
                  type="password"
                  id='confirmPassword'
                  name='confirmPassword'
                  value={resetPass.confirmPassword}
                  onChange={handleInputField}
                />
              </div>
            </div>
            <button type='button' className='mb-0 mt-4' onClick={ResetYourPassword}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword