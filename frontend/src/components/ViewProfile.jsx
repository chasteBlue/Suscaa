import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfile = ({ user }) => {
  return (
    <div>
      <h1 className="title">Profile</h1>
      <div className="content">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <Link
        to={`/users/edit/${user.uuid}`}
        className="button is-small is-info"
      >
        Edit
      </Link>
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
