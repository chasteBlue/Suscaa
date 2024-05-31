import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    getMeetings();
  }, []);

  const getMeetings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/meetings");
      console.log(response.data);
      if (Array.isArray(response.data.response)) {
        setMeetings(response.data.response);
      } else {
        console.error("Data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const deleteMeeting = async (meetingId) => {
    try {
      await axios.delete(`http://localhost:5000/meetings/${meetingId}`);
      getMeetings();
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderMeetings = (status) => {
    if (!Array.isArray(meetings)) {
      return null;
    }

    const filteredMeetings = meetings.filter((meeting) => meeting.status === status);
    if (filteredMeetings.length === 0) {
      return (
        <tr>
          <td colSpan={status === 'Pending' ? 4 : 6} className="has-text-centered">
            No {status.toLowerCase()} appointments
          </td>
        </tr>
      );
    }

    return filteredMeetings.map((meeting, index) => (
      <tr key={meeting.uuid}>
        <td>{index + 1}</td>
        <td>{meeting.name}</td>
        <td>{meeting.reason}</td>
        {status !== 'Pending' && (
          <>
            <td>{formatDate(meeting.date_counsel)}</td>
            <td>{meeting.counselors}</td>
            <td>{meeting.user ? meeting.user.name : 'N/A'}</td>
          </>
        )}
        {status === 'Pending' && (
          <td>
            <button onClick={() => deleteMeeting(meeting.uuid)} className="button is-small is-danger">
              Delete
            </button>
          </td>
        )}
      </tr>
    ));
  };

  return (
    <div className="container">
      <h1 className="title" style={{ padding: '10px', borderRadius: '5px' }}>Meetings</h1>
      <Link to="/meetings-history" className="button is-primary mb-2">
        Meetings History
      </Link>
      <div className="columns">
        <div className="column">
          <div className="box">
            <h2 className="subtitle" style={{ padding: '10px', borderRadius: '5px' }}>Pending Meetings</h2>
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr style={{ backgroundColor: 'yellow' }}>
                  <th>No</th>
                  <th>Name</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderMeetings('Pending')}</tbody>
            </table>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="subtitle" style={{ padding: '10px', borderRadius: '5px' }}>Approved Meetings</h2>
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr style={{ backgroundColor: 'lightgreen' }}>
                  <th>No</th>
                  <th>Name</th>
                  <th>Reason</th>
                  <th>Date of Counsel</th>
                  <th>Counselors</th>
                  <th>Sent By</th>
                </tr>
              </thead>
              <tbody>{renderMeetings('Approved')}</tbody>
            </table>
          </div>
          <div className="box">
            <h2 className="subtitle" style={{ padding: '10px', borderRadius: '5px' }}>Cancelled Meetings</h2>
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr style={{ backgroundColor: 'lightcoral' }}>
                  <th>No</th>
                  <th>Name</th>
                  <th>Reason</th>
                  <th>Date of Counsel</th>
                  <th>Counselors</th>
                  <th>Sent By</th>
                </tr>
              </thead>
              <tbody>{renderMeetings('Rejected')}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetings;
