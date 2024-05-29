// Register.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser, reset } from "../features/authSlice";

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
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <form onSubmit={handleRegister} className="box">
                                {isError && <p className='has-text-centered'>{message}</p>}
                                <h1 className="title is-2">Sign Up</h1>
                                <p className='mt-1 mb-3'>Student's Safe Place</p>

                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder='Full name'
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input
                                            type="email"
                                            className={`input ${emailError ? 'is-danger' : ''}`}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Email'
                                        />
                                    </div>
                                    {emailError && <p className="help is-danger">{emailError}</p>}
                                </div>

                                <div className="field">
                                    <label className="label">Password</label>
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

                                <div className="field">
                                    <label className="label">Confirm Password</label>
                                    <div className="control">
                                        <input
                                            type="password"
                                            className={`input ${passwordError ? 'is-danger' : ''}`}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder='*********'
                                        />
                                    </div>
                                    {passwordError && <p className="help is-danger">{passwordError}</p>}
                                </div>

                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth" type='submit'>
                                        Sign Up
                                    </button>
                                </div>
                                <Link to="/login" className="is-primary is-medium">Already have an account? Sign In!</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
