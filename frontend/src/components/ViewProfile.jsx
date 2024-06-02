import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import logo from "../images/logo.png";
import background from "../images/background.jpeg";

const localizer = momentLocalizer(moment);

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
        <Link to={`/users/edit/${user.uuid}`} className="button is-info">
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
  const [meetings, setMeetings] = useState([]);
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

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/meetings");
        console.log("Fetched meetings:", response.data);
        if (Array.isArray(response.data.response)) {
          setMeetings(response.data.response);
        } else {
          console.error("Data is not an array:", response.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  let approvedMeetings = [];
  if (Array.isArray(meetings)) {
    approvedMeetings = meetings.filter(meeting => meeting.status === 'Approved');
  }
  
  console.log("Filtered approved meetings:", approvedMeetings);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const counselorColors = {
    'Dynnhiel Talisayan': '#42536d',
    'Jazel Equia': '#656388',
    'Aubrey Heramis': '#788aa0',
    'Henry Dy': '#647474',
    'Gail Quipit': '#949bb4',
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = counselorColors[event.title] || 'blue';
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  return (
    <div>
      {authUser && <UserProfile user={authUser} />}
      <div style={{ height: '500px', margin: '50px' }}>
        <Calendar
          localizer={localizer}
          events={approvedMeetings.map(meeting => ({
            title: meeting.counselors,
            start: new Date(meeting.date_counsel),
            end: new Date(new Date(meeting.date_counsel).getTime() + 60 * 60 * 1000),
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
};

export default ViewProfile;
