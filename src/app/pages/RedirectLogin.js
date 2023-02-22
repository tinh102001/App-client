import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';

const RedirectLogin = () => {
  const location = useLocation();
  return (
    <>
      <Navigate to={'auth/login'} state={{ referrer: location.pathname }} />
    </>
  );
};

export default RedirectLogin;
