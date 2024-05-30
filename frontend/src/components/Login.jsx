import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser, reset } from "../features/authSlice";
import logo from '../components/su-scaa-logo.png'; // Make sure the path to your logo is correct

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
        <section className="hero is-fullheight is-fullwidth" style={{ backgroundColor: '#EBE1D5' }}>
            <div className="hero-body">
                <div className="container has-text-centered">
                    <Link to="/" ><img src={logo} alt="Logo" style={{ marginBottom: '20px', maxWidth: '300px', height: 'auto' }} /></Link>
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <form onSubmit={Auth} className="box">
                                {isError && <p className='has-text-centered'>{message}</p>}
                                <h1 className="title is-2">Sign In</h1>
                                <p className='mt-1 mb-3'>Welcome to SU-SCA</p>
                                <div className="field">
                                    <label className="label has-text-left">Email</label>
                                    <div className="control">
                                        <input 
                                            type="text" 
                                            className={`input ${emailError ? 'is-danger' : ''}`} 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            placeholder='Email' 
                                        />
                                    </div>
                                    {emailError && <p className="help is-danger">{emailError}</p>}
                                </div>

                                <div className="field">
                                    <label className="label has-text-left">Password</label>
                                    <div className="control">
                                        <input 
                                            type="password" 
                                            className="input" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            placeholder='*********' 
                                        />
                                    </div>
                                </div>

                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth" type='submit'>
                                        {isLoading ? "Loading..." : "Login"}
                                    </button>
                                </div>
                                <Link to="/register" className="is-primary is-medium">New here? Sign Up!</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;
