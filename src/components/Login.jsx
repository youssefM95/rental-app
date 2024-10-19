import { Component, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
const Login = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/login', { email, password });
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('user',JSON.stringify(response.data.user));
        alert("Login successful!");
        navigate('/');
      } catch (error) {
        console.error("Login error", error);
        alert("Invalid credentials");
      }
    };
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  export default Login;
