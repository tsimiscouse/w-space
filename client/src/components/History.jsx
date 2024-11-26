import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'past', 'upcoming'

  useEffect(() => {
    fetchBookings();
  }, [filter]); // Refetch bookings setiap kali filter berubah

  // Fungsi untuk mengambil data booking dari backend
  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/history", {
        params: { filter },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Mendapatkan token dari localStorage
      });
      setBookings(response.data.data); // Ambil data booking dari response
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Menentukan status booking berdasarkan waktu
  const getStatus = (startTime, endTime, date) => {
    const currentTime = new Date();
    const bookingDate = new Date(date);
    const bookingStartTime = new Date(`${bookingDate.toISOString().split('T')[0]}T${startTime}`);
    const bookingEndTime = new Date(`${bookingDate.toISOString().split('T')[0]}T${endTime}`);

    if (bookingEndTime < currentTime) {
      return 'Past';
    } else if (bookingStartTime > currentTime) {
      return 'Upcoming';
    } else {
      return 'Ongoing';
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Booking History</h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Show All
        </button>
        <button
          onClick={() => setFilter('past')}
          className={`px-4 py-2 rounded ${filter === 'past' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Past
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded ${filter === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Upcoming
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-100">
               
                <td className="py-2 px-4 border">{booking.bookingDetails.date}</td>
                <td className="py-2 px-4 border">
                  {booking.bookingDetails.startTime} - {booking.bookingDetails.endTime}
                </td>
                <td className="py-2 px-4 border">
                  {getStatus(booking.bookingDetails.startTime, booking.bookingDetails.endTime, booking.bookingDetails.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingHistory;
