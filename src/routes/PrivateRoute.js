import React from 'react';
import {Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const authenticate = localStorage.getItem('userToken') ? true : false;
  return authenticate ? (
    element
  ) : (
    <Navigate to={`/login`}
    />
  );
};

export default PrivateRoute;