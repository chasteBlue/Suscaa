import React from 'react';
import { Link } from 'react-router-dom';

const FrontPage = () => {
  return (
    <section className="hero is-fullheight is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            Welcome to the School Guidance Counselor Portal
          </h1>
          <h2 className="subtitle">
            Your first step towards a better school experience
          </h2>
          <div className="buttons is-centered">
            <Link to="/login" className="button is-link is-medium">
              Sign In
            </Link>
            <Link to="/register" className="button is-primary is-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FrontPage;
