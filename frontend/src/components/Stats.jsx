import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = () => {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [pendingMeetingsCount, setPendingMeetingsCount] = useState(0);
  const [acceptedMeetingsCount, setAcceptedMeetingsCount] = useState(0);
  const [rejectedMeetingsCount, setRejectedMeetingsCount] = useState(0);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const appointmentsResponse = await axios.get("http://localhost:5000/appointments");
      const meetingsResponse = await axios.get("http://localhost:5000/meetings");

      const appointments = appointmentsResponse.data.response;
      const meetings = meetingsResponse.data.response;

      // Counting logic for each statistic
      const appointmentsCount = appointments.length;
      const pendingMeetingsCount = meetings.filter(meeting => meeting.status === 'Pending').length;
      const acceptedMeetingsCount = meetings.filter(meeting => meeting.status === 'Approved').length;
      const rejectedMeetingsCount = meetings.filter(meeting => meeting.status === 'Rejected').length;

      setAppointmentsCount(appointmentsCount);
      setPendingMeetingsCount(pendingMeetingsCount);
      setAcceptedMeetingsCount(acceptedMeetingsCount);
      setRejectedMeetingsCount(rejectedMeetingsCount);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="box has-text-centered">
            <p className="title is-4">{appointmentsCount}</p>
            <p className="subtitle is-6">Appointments</p>
          </div>
        </div>
        <div className="column">
          <div className="box has-text-centered">
            <p className="title is-4">{pendingMeetingsCount}</p>
            <p className="subtitle is-6">Pending Meetings</p>
          </div>
        </div>
        <div className="column">
          <div className="box has-text-centered">
            <p className="title is-4">{acceptedMeetingsCount}</p>
            <p className="subtitle is-6">Accepted Meetings</p>
          </div>
        </div>
        <div className="column">
          <div className="box has-text-centered">
            <p className="title is-4">{rejectedMeetingsCount}</p>
            <p className="subtitle is-6">Rejected Meetings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
