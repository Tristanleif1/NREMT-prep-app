import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import '../SignupFormModal/SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // Initialize errors as an object
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (sessionUser) return <Redirect to="/" />;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    // Check if username is provided before checking length
    if (!formData.username) {
      formErrors.username = "Username is required";
    } else if (formData.username.length < 4) {
      formErrors.username = "Username must be at least 4 characters long";
    } else if (formData.username.length > 30) {
      formErrors.username = "Username must be less than 30 characters long";
    }

    if (!validateEmail(formData.email)) {
      formErrors.email = "Please provide a valid email address";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (formData.password === confirmPassword) {
      setIsSubmitting(true);
      const data = await dispatch(signUp(formData.username, formData.email, formData.password));
      setIsSubmitting(false);
      if (data) {
        setErrors(data);
      } else {
        history.push('/home');
      }
    } else {
      formErrors.conPassword = "Confirm Password field must be the same as the Password field";
      setErrors(formErrors);
    }
  };

  return (
    <div className="signup-modal">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <ul>
          {Object.values(errors).map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <div className="errors">{errors.email}</div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </label>
        <label>
          Username
          <div className="errors">{errors.username}</div>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </label>
        <label>
          Password
          <div className="errors">{errors.password}</div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </label>
        <label>
          Confirm Password
          <div className="errors">{errors.conPassword}</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="sign-up-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;