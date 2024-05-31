import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../images/logo.png"; 
import background from "../images/background.jpeg"

const UserProfile = ({ user }) => {
  return (
    <div className="profile-container">
      <div className="background-image" style={{ backgroundImage: `url(${background})` }}>
        <div className="profile-picture-container">
          <img src={logo} alt="Profile" className="profile-picture" />
        </div>
      </div>
      <div className="profile-details">
        <h1 className="profile-name">{user.name}</h1>
        <Link
          to={`/users/edit/${user.uuid}`}
          className="button is-info"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

const ViewProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/current");
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {authUser && <UserProfile user={authUser} />}
    </div>
  );
};

export default ViewProfile;

