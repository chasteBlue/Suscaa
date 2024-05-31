import React from "react";
import './App.css';

const CounselorsList = ({ counselors }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const renderBusinessHours = (counselor) => {
    const counselorIndex = counselors.findIndex((c) => c.name === counselor.name);
    const assignedDay = daysOfWeek[counselorIndex % daysOfWeek.length];

    return (
      <p className="business-hours">
        <strong className="title-color">  --- {assignedDay}:</strong> 9:00 am - 11:30 am, 2:30 pm - 4:00 pm
      </p>
    );
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="title is-4">Meet the SU Counselors</h3>
        <div className="counselor-list">
          {counselors.map((counselor, index) => (
            <div key={index} className="counselor-item">
              <div className="counselor-info">
                <div className="counselor-img">
                  <img src={counselor.image} alt={counselor.name} />
                </div>
                <p className="counselor-name">{counselor.name}</p>
                {renderBusinessHours(counselor)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounselorsList;
