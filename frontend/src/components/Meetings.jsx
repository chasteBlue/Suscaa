import React, { useState, useEffect } from "react";
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

  const renderMeetings = () => {
    if (!Array.isArray(meetings) || meetings.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="has-text-centered">No meetings available</td>
        </tr>
      );
    }

    return meetings.map((meeting, index) => (
      <tr key={meeting.uuid}>
        <td>{index + 1}</td>
        <td>{meeting.name}</td>
        <td>{meeting.reason}</td>
        <td>{meeting.date_counsel}</td>
        <td>{meeting.counselors}</td>
        <td>{meeting.status}</td>
        <td>{meeting.user ? meeting.user.name : 'N/A'}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h1 className="title">Meetings</h1>
      <h2 className="subtitle">List of Meetings</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Date of Counsel</th>
            <th>Counselors</th>
            <th>Status</th>
            <th>Sent By</th>
          </tr>
        </thead>
        <tbody>
          {renderMeetings()}
        </tbody>
      </table>
    </div>
  );
};

export default Meetings;
