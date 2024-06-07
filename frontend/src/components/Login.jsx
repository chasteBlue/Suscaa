import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser, reset } from "../features/authSlice";
import logo from '../images/logo.png'
import './App.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const Auth = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        setEmailError("");
        dispatch(LoginUser({ email, password }));
    };

    return (
        <section className="login-container">
            <div className="login-login">
                <form onSubmit={Auth} className="login-content">
                    <div className="login-copy">
                    <Link to = "/"><img src={logo} alt="Logo" className="login-suscamainlogofinal2" /></Link>
                        <h1 className="login-text">Sign In</h1>
                        <p className='login-text02'>Welcome to SU-SCA</p>
                    </div>
                    {isError && <p className='has-text-danger has-text-centered'>{message}</p>}
                    <div className="login-inputandbutton">
                        <input 
                            type="text" 
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
                        <button className="login-button" type='submit'>
                            {isLoading ? "Loading..." : "Login"}
                        </button>
                    </div>
                    <Link to="/register" className="is-primary is-medium">New here? Sign Up!</Link>
                </form>
            </div>
        </section>
    )
}

export default Login;
