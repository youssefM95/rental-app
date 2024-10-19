import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Register = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState();
  const [date_of_birth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePhoneChange= (value) => {
    setPhoneNumber(value);
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", { first_name,last_name,address,phone_number,date_of_birth, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div className="container">
          <form>
            <h3>S'inscrire</h3>
            <div className="mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="first name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="last name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Date Of Birth</label>
              <input
                type="date"
                className="form-control"
                placeholder="dateof birth"
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Phone Number</label>
              <PhoneInput
                  country={'tn'}
                  onChange={handlePhoneChange}
                />
            </div>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleRegister}
              >
                S'inscrire
              </button>
            </div>
            <p className="forgot-password text-right">
              Déjà inscrit <a href="/login">connectez-vous?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
