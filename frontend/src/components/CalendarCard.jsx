import React, { useState, useEffect } from 'react';
import "./App.css";

const CalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const dayOfWeek = currentDate.getDay();

  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getCalendarDays = () => {
    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }
    return calendarDays;
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3 className="title is-4">Current Date</h3>
          <p className="subtitle">{`${daysOfWeek[dayOfWeek]}, ${monthsOfYear[month]} ${day}, ${year}`}</p>
          <div className="calendar">
            <div className="calendar-header">
              {daysOfWeek.map(day => (
                <div key={day} className="calendar-header-day">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-body">
              {calendarDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`calendar-day ${day === currentDate.getDate() ? 'current-day' : ''}`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
