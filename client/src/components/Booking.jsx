import React, { useState } from 'react';

function BookingComponent(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userId, setUserId] = useState(props.userId || null); // If userId passed as prop, pre-populate
  const [status, setStatus] = useState('pending');
  const [bookingData, setBookingData] = useState({});

  const handleStartDateChange = (date) => setStartDate(date);
  const handleEndDateChange = (date) => setEndDate(date);

  const validateDates = () => {
    if (endDate && startDate && endDate < startDate) {
      alert('End date must be after start date!');
      return false;
    }
    return true;
  };

  const confirmBooking = () => {
    if (!validateDates()) return;

    const booking = {
      startDate,
      endDate,
      userId,
    };
    setBookingData(booking);

    // Implement API logic to send booking data to backend
    // (e.g., using fetch or Axios) and handle response
  };

  return (
    <div>
      <h2>Booking</h2>
      <label>Start Date:</label>
      <input type="date" onChange={(e) => handleStartDateChange(e.target.value)} />
      <label>End Date:</label>
      <input type="date" onChange={(e) => handleEndDateChange(e.target.value)} />
      <button onClick={confirmBooking}>Confirm Booking</button>
      {bookingData.startDate && (
        <p>
          Booking details: Start Date: {bookingData.startDate}, End Date: {bookingData.endDate}
        </p>
      )}
    </div>
  );
}

export default BookingComponent;