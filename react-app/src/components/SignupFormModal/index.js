import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    })
    // const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); 
	const history = useHistory();
    const {closeModal} = useModal();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {}
        if(formData.username.length < 4){
            formErrors.username = "Username must be at least 4 characters long"
        }
        if(!formData.username){
            formErrors.username = "Username is required"
        }

        if(formData.username.length > 30){
            formErrors.username = "Username must be less than 30 characters long"
        }

        if(!validateEmail(formData.email)){
            formErrors.email = "Please provide a valid email address";
        }

        if(!formData.password){
            formErrors.password = "Password is required"
        }

        if (Object.keys(formErrors).length > 0){
            setErrors(formErrors);
            return
        }


        if (formData.password === confirmPassword) {
            setIsSubmitting(true);
            const data = await dispatch(signUp(formData.username, formData.email, formData.password));
            setIsSubmitting(false);
            if (data) {
                setErrors(data);
            } else {
                closeModal();
				history.push('/home')
            }

        } else {
            formErrors.conPassword = "Confirm Pasword field must be the same as the Password field"
            setErrors(formErrors)
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
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </label>
                <label>
                    Username
                    <div className="errors">{errors.username}</div>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required
                    />
                </label>
                <label>
                    Password
                    <div className="errors">{errors.password}</div>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
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
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}

export default SignupFormModal;