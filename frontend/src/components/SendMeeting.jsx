import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SendMeeting = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    getMeetings();
  }, []);

  const getMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/meetings');
      if (Array.isArray(response.data.response)) {
        setMeetings(response.data.response);
      } else {
        console.error('Data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const deleteMeeting = async (meetingId) => {
    try {
      await axios.delete(`http://localhost:5000/meetings/${meetingId}`);
      getMeetings();
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  const renderMeetings = (status) => {
    if (!Array.isArray(meetings)) {
      return null;
    }

    return meetings
      .filter((meeting) => meeting.status === status)
      .map((meeting, index) => (
        <tr key={meeting.uuid}>
          <td>{index + 1}</td>
          <td>{meeting.name}</td>
          <td>{meeting.reason}</td>
          {status !== 'Pending' && (
            <>
              <td>{formatDateTime(meeting.date_counsel)}</td>
              <td>{meeting.counselors}</td>
            </>
          )}
          <td>{meeting.status}</td>
          <td>{meeting.user ? meeting.user.name : 'N/A'}</td>
            <td>
              <Link to={`/meetings/edit/${meeting.uuid}`} className="button is-small is-info mr-1">
                Manage Send
              </Link>
          
          {status === 'Pending' ? (
          
              <button onClick={() => deleteMeeting(meeting.uuid)} className="button is-small is-danger">
                Delete
              </button>
           
          ) : null} </td>
        </tr>
      ));
  };

  return (
    <div>
      <h1 className="title" style={{ padding: '10px', borderRadius: '5px' }}>Send Meetings</h1>
      <Link to="/meetings-history" className="button is-primary mb-2">
        Meetings History
      </Link>

      <h2 className="subtitle" style={{ padding: '10px', borderRadius: '5px' }}>Pending Meetings</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr style={{ backgroundColor: 'yellow' }}>
            <th>No</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Sent By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderMeetings('Pending')}</tbody>
      </table>

      <h2 className="subtitle" style={{ padding: '10px', borderRadius: '5px' }}>Approved Meetings</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr style={{ backgroundColor: 'lightgreen' }}>
            <th>No</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Date of Counsel</th>
            <th>Counselors</th>
            <th>Status</th>
            <th>Sent By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderMeetings('Approved')}</tbody>
      </table>

      <h2 className="subtitle" style={{ padding: '10px', borderRadius: '5px' }}>Cancelled Meetings</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr style={{ backgroundColor: 'lightcoral' }}>
            <th>No</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Date of Counsel</th>
            <th>Counselors</th>
            <th>Status</th>
            <th>Sent By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderMeetings('Rejected')}</tbody>
      </table>
    </div>
  );
};

export default SendMeeting;
