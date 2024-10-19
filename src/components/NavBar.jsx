import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#007bff', color: '#fff' }}>
      <Link to="/" style={{ marginRight: '1rem', color: 'white' }}>Home</Link>
      <Link to="/properties" style={{ marginRight: '1rem', color: 'white' }}>Properties</Link>
    </nav>
  );
};

export default Navbar;