import React from 'react';
import {Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children, redirect }) => {
  const authenticate = localStorage.getItem('userToken') ? true : false;
  return authenticate ? (
    children
  ) : (
    <Navigate to={`/login`}
    />
  );
};

export default PrivateRoute;