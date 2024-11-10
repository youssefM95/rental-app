import React, { useContext } from 'react';
import { LoadingContext } from './LoadingContext';
import { Spinner } from 'reactstrap';

const GlobalSpinner = () => {
  const { loading } = useContext(LoadingContext);

  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <Spinner color="primary" />
    </div>
  );
};

export default GlobalSpinner;
