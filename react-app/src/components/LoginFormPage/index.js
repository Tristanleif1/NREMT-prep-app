import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { CiMail, CiLock } from "react-icons/ci";
import './LoginFormPage.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  const handleDemo = () => {
    const email = "demo@aa.io";
    const password = "password";
    dispatch(login(email, password));
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form-page">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <h1>Log In</h1>
          <div className="login-form-page-email">
            <label htmlFor="email" className="email-label">Email</label>
            <div className="login-page-email-for-icon">
              <CiMail className="login-email-icon" />
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input-email"
                placeholder="Email"
                style={{ paddingLeft: "30px" + (email ? "20px" : "")}}
              />
            </div>
          </div>
        <div className="login-form-page-password">
          <div className="login-page-password">
            <label htmlFor="password" className="password-label">Password</label>
            <CiLock className="signup-lock-sign" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input-password"
              style={{ paddingLeft: "30px" + (password ? "20px" : "")}}
            />
          </div>
        </div>
        <p className="login-form-signup-button">
          Don't have an account?
          <a href="/signup">   Sign up here!</a>
        </p>
          <button type="submit" className="login-btn-submit">Log In</button>
          <button type="button" className="login-btn-demo" onClick={handleDemo}>
            Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormPage;