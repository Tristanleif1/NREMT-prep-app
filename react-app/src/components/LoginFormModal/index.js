import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === '' || password === '') {
      const newErrors = [];
      if(email === '') newErrors.push('email : This field is required.');
      if(password === '') newErrors.push('password : This field is required.');
      setErrors(newErrors);
      return;
    }

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal();
    }
  };

  return (
    <div className="login-modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <ul>
          {errors.map((error, idx) => (
            <li className="error-message" key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
