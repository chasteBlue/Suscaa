import React, { useState, useEffect } from "react";
import axios from "axios";

const HistoryMeetings = () => {
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderHistory = () => {
    if (!Array.isArray(meetings)) {
      return null;
    }

    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    const pastMeetings = meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date_counsel);
      return meeting.status !== 'Pending' && meetingDate <= sixHoursAgo;
    });

    if (pastMeetings.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="has-text-centered">
            No past meetings
          </td>
        </tr>
      );
    }

    return pastMeetings.map((meeting, index) => (
      <tr key={meeting.uuid} style={{ backgroundColor: meeting.status === 'Rejected' ? 'lightcoral' : 'lightgreen' }}>
        <td>{index + 1}</td>
        <td>{meeting.name}</td>
        <td>{meeting.reason}</td>
        <td>{formatDate(meeting.date_counsel)}</td>
        <td>{meeting.counselors}</td>
        <td>{meeting.user ? meeting.user.name : 'N/A'}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <h1 className="title" style={{ padding: '10px', borderRadius: '5px' }}>Meetings History</h1>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Date of Counsel</th>
            <th>Counselors</th>
            <th>Sent By</th>
          </tr>
        </thead>
        <tbody>{renderHistory()}</tbody>
      </table>
    </div>
  );
};

export default HistoryMeetings;
