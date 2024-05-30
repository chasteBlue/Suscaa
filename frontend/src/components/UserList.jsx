import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <div className="user-list-container">
      <div className="user-list">
        <h1 className="title">Users</h1>
        <h2 className="subtitle">List of Users</h2>
        <div className="columns is-multiline">
          {users.map((user, index) => (
            <div key={user.uuid} className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <p className="title">{user.name}</p>
                  <p className="subtitle">{user.email}</p>
                  <p className="content">Role: {user.role}</p>
                  <div className="buttons">
                    <Link
                      to={`/users/edit/${user.uuid}`}
                      className="button is-info is-small"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user.uuid)}
                      className="button is-danger is-small"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
