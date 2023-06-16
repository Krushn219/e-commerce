import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { useState } from "react";
import ViewModalSignIn from "../../Components/ViewModalSignIn";
import ViewModalsmLogin from "../../Components/ViewModalsmLogin";

const cookie = new Cookies()

export default function RequireAuth() {
  const { email } = useParams()
  const [modalShow, setModalShow] = useState(true);
  const [ModalLoginShow, setModalLoginShow] = useState(true)
  const userInCookie = cookie.get('user')
  const location = useLocation();

  const closeModal = () => setModalShow(false);
  const closeModalLogin = () => setModalLoginShow(false)

  if (!userInCookie) {
    localStorage.setItem('nextPath', location.pathname)
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <>
      {location.pathname !== "/my-account" && location.pathname !== "/forgotPassword" && location.pathname !== `/reset-password/${email}` && <ViewModalSignIn show={modalShow} onHide={closeModal} />}
      {location.pathname !== "/my-account" && location.pathname !== "/forgotPassword" && location.pathname !== `/reset-password/${email}` && <ViewModalsmLogin show={ModalLoginShow} onHide={closeModalLogin} />}
      <Navigate to={() => { setModalShow(true); setModalLoginShow(true); }} />
    </>
  }

  return <Outlet />;
}
