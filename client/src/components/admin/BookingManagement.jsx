import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Navbar from './AdminNavbar';
import Footer from '../Footer';
import { 
  Trash2, 
  Edit2, 
  Check, 
  Calendar, 
  Clock, 
  User,
} from 'lucide-react';
import api from '../../axios';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState("");
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Status color mapping
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  // Fetch all spaces on load
  useEffect(() => {
    fetchSpaces();
  }, []);

  // Fetch bookings when `selectedSpaceId` changes
  useEffect(() => {
    if (selectedSpaceId) {
      fetchBookings(selectedSpaceId);
    }
  }, [selectedSpaceId]);

  // Fetch bookings based on `spaceId`
  const fetchBookings = async (spaceId) => {
    try {
      const response = await api.get(
        `api/bookings?spaceId=${spaceId}`
      );
  
      const bookingsWithParsedTimes = response.data.map((booking) => {
        // Parse start and end times
        const parseTime = (timeString) => {
          if (!timeString) return null;
          const [hours, minutes] = timeString.split(':').map(Number);
          const time = new Date();
          time.setHours(hours, minutes, 0, 0);
          return time;
        };

        // Parse date
        const parseDate = (dateString) => {
          if (!dateString) return null;
          // Extract only the date part (e.g., "Mon Nov 25 2024")
          const dateParts = dateString.split(' ').slice(0, 4);
          return dateParts.join(' ');
        };
  
        return {
          ...booking,
          startTime: parseTime(booking.bookingDetails.startTime),
          endTime: parseTime(booking.bookingDetails.endTime),
          email: booking.bookingDetails.email,
          date: parseDate(booking.bookingDetails.date),
        };
      });
  
      setBookings(bookingsWithParsedTimes);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Fetch all spaces
  const fetchSpaces = async () => {
    try {
      const response = await api.get(`api/spaces`);
      setSpaces(response.data);
      if (response.data.length > 0) {
        // Automatically select the first space
        setSelectedSpaceId(response.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching spaces:", error);
    }
  };

  // Update booking status
  const handleUpdateBookingStatus = async () => {
    if (!selectedBooking) return;

    try {
      await api.patch(
        `api/bookings/${selectedBooking._id}/status`,
        { status: selectedBooking.status }
      );

      // Update the booking in the local state
      setBookings(bookings.map(booking => 
        booking._id === selectedBooking._id 
          ? {...booking, status: selectedBooking.status} 
          : booking
      ));

      // Close the status dialog
      setIsStatusDialogOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update booking status");
    }
  };

  // Open status update modal
  const openStatusUpdateModal = (booking) => {
    setSelectedBooking(booking);
    setIsStatusDialogOpen(true);
  };

  // Delete a booking
  const handleDeleteBooking = async (bookingId) => {
    try {
      await api.delete(`api/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking");
    }
  };

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="max-w-[1280px] mt-[70px] min-h-screen py-[80px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Booking Management
          </h1>
          <div className="flex items-center space-x-4">
            <label className="text-gray-600 font-medium">Select Space:</label>
            <select
              value={selectedSpaceId}
              onChange={(e) => setSelectedSpaceId(e.target.value)}
              className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {spaces.map((space) => (
                <option key={space._id} value={space._id}>
                  {space.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Update Modal */}
        {isStatusDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl w-96 p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Booking Status</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Status</label>
                  <select
                    value={selectedBooking?.status || 'pending'}
                    onChange={(e) => 
                      setSelectedBooking(prev => ({...prev, status: e.target.value}))
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setIsStatusDialogOpen(false);
                      setSelectedBooking(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateBookingStatus}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
                  >
                    <Check className="mr-2 w-5 h-5" /> Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    <User className="inline-block mr-2 w-5 h-5 text-gray-500" />
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    <Calendar className="inline-block mr-2 w-5 h-5 text-gray-500" />
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    <Clock className="inline-block mr-2 w-5 h-5 text-gray-500" />
                    Start Time
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    <Clock className="inline-block mr-2 w-5 h-5 text-gray-500" />
                    End Time
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{booking.email}</td>
                    <td className="px-6 py-4">{booking.date}</td>
                    <td className="px-6 py-4">
                      {booking.startTime 
                        ? booking.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {booking.endTime 
                        ? booking.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                        : "N/A"}
                    </td>
                    <td className="px-2 py-4">
                      <span className={`px-3 py-1 rounded-full uppercase text-xs font-medium ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center">
                      <button
                        onClick={() => openStatusUpdateModal(booking)}
                        className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition"
                        title="Update Status"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="text-red-600 hover:bg-red-100 p-2 rounded-full transition"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingManagement;