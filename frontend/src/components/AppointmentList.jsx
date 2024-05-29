import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      console.log(response.data); 
      if (Array.isArray(response.data.response)) {
        setAppointments(response.data.response);
      } else {
        console.error("Data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${appointmentId}`);
      getAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const renderAppointments = () => {
    if (appointments.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="has-text-centered">No appointments available</td>
        </tr>
      );
    }
  
    const filteredAppointments = appointments.filter(appointment => appointment.status === 'Pending');
  
    if (filteredAppointments.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="has-text-centered">No pending appointments available</td>
        </tr>
      );
    }
  
    return filteredAppointments.map((appointment, index) => (
      <tr key={appointment.uuid}>
        <td>{index + 1}</td>
        <td>{appointment.name}</td>
        <td>{appointment.degree}</td>
        <td>{appointment.school_year}</td>
        <td>{appointment.reason}</td>
        <td>{appointment.status}</td>
        <td>{appointment.user ? appointment.user.name : 'N/A'}</td>
        <td>
          <Link
            to={`/appointments/edit/${appointment.uuid}`}
            className="button is-small is-info"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteAppointment(appointment.uuid)}
            className="button is-small is-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  
  return (
    <div>
      <h1 className="title">Appointments</h1>
      <h2 className="subtitle">List of Appointments</h2>
      <Link to="/appointments/add_appointment" className="button is-primary mb-2">
        Add New Appointment
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Degree</th>
            <th>School Year</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Sent By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderAppointments()}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
