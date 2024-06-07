// Register.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser, reset } from "../features/authSlice";
import logo from '../images/logo.png'
import './App.css'; //I just recycled the Login classes.

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuccess, isError, message } = useSelector((state) => state.auth);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        if (!validatePassword()) {
            return;
        }
        setEmailError("");
        dispatch(RegisterUser({ name, email, password }));
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/login");
        }
        dispatch(reset());
    }, [isSuccess, dispatch, navigate]);

    return (
        <section className="login-container">
            <div className="login-login">
                <form onSubmit={handleRegister} className="login-content">
                    <div className="login-copy">
                    <Link to = "/"><img src={logo} alt="Logo" className="login-suscamainlogofinal2" /></Link>
                        <h1 className="login-text">Sign Up</h1>
                        <p className='login-text02'>Student's Safe Place</p>
                    </div>
                    {isError && <p className='has-text-danger has-text-centered'>{message}</p>}
                    <div className="login-inputandbutton">
                        <input
                            type="text"
                            className="login-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Full name'
                        />
                        <input
                            type="email"
                            className={`login-field ${emailError ? 'is-danger' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                        {emailError && <p className="help is-danger">{emailError}</p>}
                        <input
                            type="password"
                            className="login-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                        />
                        <input
                            type="password"
                            className={`login-field ${passwordError ? 'is-danger' : ''}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm Password'
                        />
                        {passwordError && <p className="help is-danger">{passwordError}</p>}
                        <button className="login-button" type='submit'>
                            Sign Up
                        </button>
                    </div>
                    <Link to="/login" className="is-primary is-medium">Already have an account? Sign In!</Link>
                </form>
            </div>
        </section>
    );
};

export default Register;
