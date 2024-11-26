import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [spaces, setSpaces] = useState([]); // List of spaces for dropdown
  const [spaceId, setSpaceId] = useState(''); // For filtering based on spaceId
  const [error, setError] = useState(''); // For error handling

  useEffect(() => {
    fetchSpaces(); // Fetch the list of spaces on component mount
    fetchBookings(); // Fetch bookings initially
  }, []);

  useEffect(() => {
    fetchBookings(); // Re-fetch bookings whenever spaceId changes
  }, [spaceId]);

  // Fetch spaces for the dropdown
  const fetchSpaces = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/spaces/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSpaces(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching spaces:', error);
      setError('Error fetching spaces');
    }
  };

  // Fetch bookings based on selected spaceId
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/', {
        params: { spaceId }, // Send spaceId as query param
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBookings(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(error.response?.data?.message || 'Error fetching bookings');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 heading">All Booking History</h1>

      {/* SpaceId Filter */}
      <div className="mb-6">
        <label htmlFor="spaceId" className="block text-sm font-medium text-gray-700 label-text">
          Filter by Space
        </label>
        <select
          id="spaceId"
          value={spaceId}
          onChange={(e) => setSpaceId(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md input-field"
        >
          <option value="">All Spaces</option>
          {spaces.map((space) => (
            <option key={space._id} value={space._id}>
              {space.name}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Bookings Table */}
      <div className="bg-white shadow-md rounded overflow-x-auto table-container">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Space</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{booking.spaceId?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border">
                    {new Date(booking.bookingDetails.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {booking.bookingDetails.startTime} - {booking.bookingDetails.endTime}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingHistory;
