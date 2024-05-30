import React from "react";
import './App.css';

const CounselorsList = ({ counselors }) => {
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounselorsList;
