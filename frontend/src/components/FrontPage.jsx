
import React from 'react'
import { Link } from 'react-router-dom';

import logo from '../images/logo.png'
import image from '../images/counselor_image.JPG'

import './App.css'

const FrontPage = (props) => {
  return (
  
      <div className="landingpage01-landingpage01">
        <div className="landingpage01-frame1321316142">
          <div className="landingpage01-copy">
            <span className="landingpage01-text">
              <span>Welcome to the School Guidance Counselor Portal</span>
            </span>
            <span className="landingpage01-text02 Subheading">
              <span>Your first step towards a better school experience</span>
            </span>
            <Link to="/register">
            <button className="landingpage01-button">
              <span className="landingpage01-text04">
                <span>Book Appointment</span>
              </span>
            </button>
            </Link>
          </div>
        </div>
        <img
          src={image}
          alt="counselor_art_image"
          className="landingpage01-counselorclipart11"
        />
        <div className="landingpage01-navigation">
          <div className="landingpage01-items">
          <Link to="/login">
            <button className="landingpage01-button1">
              <span className="landingpage01-text06">
                <span>Login</span>
              </span>
            </button>
            </Link>
          </div>
          <span className="landingpage01-text08">
            <span>SU-SCA</span>
          </span>
          <Link to="/">
          <img src={logo} className="landingpage01-suscamainlogofinal1"/>
          </Link>

        </div>
      </div>
   
  )
}

export default FrontPage

