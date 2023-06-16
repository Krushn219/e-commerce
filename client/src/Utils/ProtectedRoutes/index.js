import React from 'react';
import { Route } from 'react-router-dom';
import { Cookies } from 'react-cookie';
// import Forbidden from '../../views/errors/Forbidden';


const cookie = new Cookies()

const ProtectedRoute = ({ element, children, ...rest }) => { // { roles, element, children, ...rest }
  const userInCookie = cookie.get('user')

  if (!userInCookie) {
    login();
    return <></>;
  }

  // if (roles.length > 0) {
  //   const routeRoles = roles.map((role) => role.toLowerCase());
  //   const userRoles = (user && user.roles ? user.roles : []).map((role) => role.toLowerCase());
  //   if (miscUtils.intersection(routeRoles, userRoles).length === 0) {
  //     return <Forbidden />;
  //   }
  // }

  return (
    <Route element={element} {...rest}>
      {children}
    </Route>
  );
};

export default ProtectedRoute;