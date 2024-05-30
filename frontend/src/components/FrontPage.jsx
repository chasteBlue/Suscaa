import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/su-scaa-logo.png';
import '../custom.css'; // Bulma doesn't support text strokes. Made a custom .css instead

const FrontPage = () => {
  const [isHoveringSignIn, setIsHoveringSignIn] = useState(false);
  const [isHoveringSignUp, setIsHoveringSignUp] = useState(false);

  return (
    <section className="hero is-fullheight" style={{ backgroundColor: '#EBE1D5' }}>
      <div className="hero-body">
        <div className="container has-text-centered">
          <div
            className="box"
            style={{
              backgroundColor: 'rgba(196, 127, 96, 0.4)', // For the Box-ish opacity. Adjust the "a".
              padding: '20px',
            }}
          >
            <img 
              src={logo} 
              alt="Logo" 
              style={{ 
                marginBottom: '10px', 
                maxWidth: '500px', 
                width: '100%', 
                height: 'auto' 
              }} 
            />
            <div className="is-size-1 text-stroke" style={{ marginBottom: '30px', marginTop: '-70px' }}>
              <span style={{ color: 'red' }}>SU</span>
              <span style={{ color: 'white' }}>-SCA</span>
            </div>
            <h1 className="title is-size-3 has-text-black" style={{ marginTop: '20px' }}>
              Welcome to the SU-Student Counseling Appointment Portal
            </h1>
            <h2 className="subtitle has-text-black">
              Your first step towards a better school experience
            </h2>
            <div className="buttons is-centered">
              <Link
                to="/login"
                className="button is-link is-medium"
                style={{
                  backgroundColor: isHoveringSignIn ? '#3e4a45' : '#57615A',
                  borderColor: isHoveringSignIn ? '#3e4a45' : '#57615A',
                  color: 'white',
                }}
                onMouseEnter={() => setIsHoveringSignIn(true)}
                onMouseLeave={() => setIsHoveringSignIn(false)}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="button is-medium"
                style={{
                  backgroundColor: isHoveringSignUp ? '#a65f4a' : '#C47F60',
                  borderColor: isHoveringSignUp ? '#a65f4a' : '#C47F60',
                  color: 'white',
                }}
                onMouseEnter={() => setIsHoveringSignUp(true)}
                onMouseLeave={() => setIsHoveringSignUp(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FrontPage;
