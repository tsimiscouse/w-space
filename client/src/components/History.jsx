import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all"); // Filter: 'all', 'past', 'ongoing'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch bookings based on the filter
  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/history", {
        params: { filter }, // Send filter as query param
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Authorization token
      });
      setBookings(response.data); // Store bookings data in state
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch booking data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Booking History</h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show All
        </button>
        <button
          onClick={() => setFilter("past")}
          className={`px-4 py-2 rounded ${
            filter === "past" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Past
        </button>
        <button
          onClick={() => setFilter("ongoing")}
          className={`px-4 py-2 rounded ${
            filter === "ongoing" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Ongoing
        </button>
      </div>

      {/* Error or Loading State */}
      {loading && <p>Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Bookings Table */}
      {!loading && bookings.length > 0 && (
        <div className="bg-white shadow-md rounded">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Time</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">
                    {booking.bookingDetails.fullName}
                  </td>
                  <td className="py-2 px-4 border">
                    {booking.bookingDetails.email}
                  </td>
                  <td className="py-2 px-4 border">
                    {formatDate(booking.bookingDetails.date)}
                  </td>
                  <td className="py-2 px-4 border">
                    {booking.bookingDetails.startTime} -{" "}
                    {booking.bookingDetails.endTime}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(booking.bookingDetails.date) <
                    new Date() ? "Past" : "Ongoing"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && bookings.length === 0 && (
        <p>No bookings found for the selected filter.</p>
      )}
    </div>
  );
};

export default BookingHistory;
