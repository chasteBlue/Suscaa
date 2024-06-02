import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState({
    name: "",
    degree: "",
    school_year: "",
    reason: "",
    address_city: "",
    address_street: "",
    status: "",
    counselors: "", // Corrected property name
    date_counsel: "", // Corrected property name
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getMeetingById();
  }, [id]);

  const getMeetingById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/meetings/${id}`);
      const data = response.data.response;
      setMeeting({
        name: data.name || "",
        degree: data.degree || "",
        school_year: data.school_year || "",
        reason: data.reason || "",
        address_city: data.address_city || "",
        address_street: data.address_street || "",
        status: data.status || "",
        counselors: data.counselors || "",
        date_counsel: data.date_counsel || "",
      });
    } catch (error) {
      console.error("Error fetching meeting:", error);
    }
  };

  const updateMeeting = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/meetings/${id}`, {
        status: meeting.status,
        counselors: meeting.counselors, 
        date_counsel: meeting.date_counsel,
      });
      navigate("/meetings");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        console.error("Error updating meeting:", error);
      }
    }
  };

  const handleChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="title">Edit Meeting</h1>
      <h2 className="subtitle">Update Meeting Details</h2>
      <form onSubmit={updateMeeting}>
        <p className="has-text-centered">{msg}</p>

        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              type="text"
              className="input is-static"
              value={meeting.name}
              readOnly
            />
          </div>
        </div>
        
        <div className="field">
          <label className="label">Degree</label>
          <div className="control">
            <input
              type="text"
              className="input is-static"
              value={meeting.degree}
              readOnly
            />
          </div>
        </div>

        <div className="field">
          <label className="label">School Year</label>
          <div className="control">
            <input
              type="text"
              className="input is-static"
              value={meeting.school_year}
              readOnly
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Reason</label>
          <div className="control">
            <input
              type="text"
              className="input is-static"
              value={meeting.reason}
              readOnly
            />
          </div>
        </div>

        <div className="field">
          <label className="label">City</label>
          <div className="control">
            <input
              type="text"
              className="input is-static"
              value={meeting.address_city}
              readOnly
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Street</label>
          <div className="control">
            <input
              type="text"
              className="input is-static"
              value={meeting.address_street}
              readOnly
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Status</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                name="status"
                value={meeting.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Counselor</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                name="counselors" 
                value={meeting.counselors}
                onChange={handleChange}
              >
                <option value="">Select Counselor</option>
                <option value="Jazel Equia">Jazel Equia</option>
                <option value="Dynnhiel Talisayan">Dynnhiel Talisayan</option>
                <option value="Aubrey Heramis">Aubrey Heramis</option>
                <option value="Henry Dy">Henry Dy</option>
                <option value="Gail Quipit">Gail Quipit</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
        <label className="label">Date and Time</label>
        <div className="control">
          <input
            type="datetime-local"
            className="input"
            name="date_counsel" 
            value={meeting.date_counsel} 
            onChange={handleChange}
            placeholder="Date and Time"
          />
        </div>
      </div>


        <div className="field">
          <div className="control">
            <button type="submit" className="button is-success">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMeeting;

