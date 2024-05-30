import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import accept from '../images/accept.svg';
import appointments from '../images/appointments.svg';
import pending from '../images/pending.svg';
import reject from '../images/reject.svg';
import CalendarCard from "./CalendarCard.jsx";
import CounselorsList from "./CounselorsList";
import GailQuipit from "../images/GailQuipit.jpg"; 
import JazelEquia from "../images/JazelEquia.jpg"; 
import DynnhielTalisayan from "../images/DynnhielTalisayan.jpg"; 
import AubreyHeramis from "../images/AubreyHeramis.jpg"; 
import HenryDy from "../images/HenryDy.jpg"; 
import './App.css';
const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [pendingMeetingsCount, setPendingMeetingsCount] = useState(0);
  const [acceptedMeetingsCount, setAcceptedMeetingsCount] = useState(0);
  const [rejectedMeetingsCount, setRejectedMeetingsCount] = useState(0);
  const counselors = [
    {name:'Dynnhiel Talisayan', image: DynnhielTalisayan},
    {name: 'Jazel Equia', image: JazelEquia},
    {name:'Aubrey Heramis', image: AubreyHeramis},
    {name:'Henry Dy', image: HenryDy },
    { name: "Gail Quipit", image: GailQuipit }
  ];

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const appointmentsResponse = await axios.get("http://localhost:5000/appointments");
      const meetingsResponse = await axios.get("http://localhost:5000/meetings");

      const appointments = appointmentsResponse.data.response;
      const meetings = meetingsResponse.data.response;

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

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });


  return (
    <div className="columns is-gapless is-multiline">
      {/* Main Content */}
      <div className="column is-full">
        <section className="section">
          <div className="container">
          <div className="box">
              <h1 className="title">Dashboard / <span className="title-color">{user && (user.role === 'admin' ? 'ADMIN' : 'STUDENT')}</span></h1>
              <h2 className="subtitle">
                Welcome Back <strong>{user && user.name}</strong>
              </h2>
              <div className="time-info">
                <p className="subtitle"><b>Time:</b> {currentTime}</p>
              </div>
          </div>

            <div className="columns is-multiline">
              {/* Statistics Cards */}
              <div className="column is-one-quarter">
                <div className="card">
                  <div className="card-content">
                    <figure className="image is-64x64">
                      <img src={appointments} alt="Total Appointments" />
                    </figure>
                    <p className="title">{appointmentsCount}</p>
                    <p className="subtitle">Total Appointments</p>
                  </div>
                </div>
              </div>
              <div className="column is-one-quarter">
                <div className="card">
                  <div className="card-content">
                    <figure className="image is-64x64">
                      <img src={pending} alt="Pending Meetings" />
                    </figure>
                    <p className="title">{pendingMeetingsCount}</p>
                    <p className="subtitle">Pending Meetings</p>
                  </div>
                </div>
              </div>
              <div className="column is-one-quarter">
                <div className="card">
                  <div className="card-content">
                    <figure className="image is-64x64">
                      <img src={accept} alt="Accepted Meetings" />
                    </figure>
                    <p className="title">{acceptedMeetingsCount}</p>
                    <p className="subtitle">Accepted Meetings</p>
                  </div>
                </div>
              </div>
              <div className="column is-one-quarter">
                <div className="card">
                  <div className="card-content">
                    <figure className="image is-64x64">
                      <img src={reject} alt="Rejected Meetings" />
                    </figure>
                    <p className="title">{rejectedMeetingsCount}</p>
                    <p className="subtitle">Cancelled Meetings</p>
                  </div>
                </div>
              </div>

              {/* Calendar Card */}
              <div className="column is-half">
                <CalendarCard />
              </div>

              {/* Counselors List */}
              <div className="column is-half">
                <CounselorsList counselors={counselors} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Welcome;
