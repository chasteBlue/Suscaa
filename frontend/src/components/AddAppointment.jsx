import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAppointment = () => {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('personal problems');
  const [degree, setDegree] = useState('');
  const [school_year, setSchoolYear] = useState('1');
  const [student_id, setStudentID] = useState('');
  const [address_street, setStreet] = useState('');
  const [address_city, setCity] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const addAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/appointments', {
        name,
        reason,
        degree,
        school_year: parseInt(school_year),
        student_id,
        address_street,
        address_city,
      });
      navigate('/appointments');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Appointments</h1>
      <h2 className="subtitle">Add Appointment</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={addAppointment}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Reason</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    >
                      <option value="personal problems">Personal Problems</option>
                      <option value="school">School</option>
                      <option value="peer">Peer</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="box">
                <h3 className="subtitle">School Information</h3>
                <div className="field">
                  <label className="label">Degree</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                      >
                        <option value="" disabled>Select your degree</option>
                        <option value="Science in Agricultural Business">Bachelor of Science in Agricultural Business</option>
                        <option value="Science in Agriculture Major in Agronomy">Bachelor of Science in Agriculture Major in Agronomy</option>
                         <option value="Science in Agriculture Major in Animal Science">Bachelor of Science in Agriculture Major in Animal Science</option>
                          <option value="Library and Information Science">Bachelor of Library and Information Science</option>
                          <option value="Science in Computer Science">Bachelor of Science in Computer Science</option>
                          <option value="Science in Information Systems">Bachelor of Science in Information Systems</option>
                          <option value="Science in Information Technology">Bachelor of Science in Information Technology</option>
                          <option value="Science in Accountancy">Bachelor of Science in Accountancy</option>
                          <option value="Science in Accountancy">College of Science in Accountancy</option>
                          <option value="Science in Nursing">Bachelor of Science in Nursing</option>
                          <option value="Mass Communication">Bachelor of Mass Communication</option>
                          <option value="Education">College of Education</option>
                          <option value="Science in Medical Technology">Bachelor of Science in Medical Technology</option>
                          <option value="Science in Environmental Science">Bachelor of Science in Environmental Science</option>
                          <option value="Science in Marine Biology">Bachelor of Science in Marine Biology</option>
                          <option value="Science in Marine Biology">Bachelor of Science in Physical Therapy</option>
                          <option value="Science in Foreign Affairs">Bachelor of Science in Foreign Affairs</option>
                          <option value="Science in Public Administration">Bachelor of Science in Public Administration</option>
                          <option value="Divinity School">Divinity School</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">School Year</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                      value={school_year}
                      onChange={(e) => setSchoolYear(e.target.value)}
                    >
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="5">5th Year</option>
                    </select>
                    </div>
                  
                  </div>
                </div>

                <div className="field">
                  <label className="label">Student ID</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input"
                      value={student_id}
                      onChange={(e) => setStudentID(e.target.value)}
                      placeholder="Student ID"
                    />
                  </div>
                </div>
              </div>

              <div className="box">
                <h3 className="subtitle">Address Information</h3>
                <div className="field">
                  <label className="label">Address - Street</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={address_street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Street"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Address - City</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={address_city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                    />
                  </div>
                </div>
              </div>

              <div className="field mt-5">
                <button className="button is-success is-fullwidth">
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;
