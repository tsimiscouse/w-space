import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Loader from './Loader/Loader';
import { FaCheckCircle, FaClock, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa';

const BookingReceipt = () => {
  const { _Id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings/${_Id}`);
        setBooking(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [_Id]);

  if (loading) {
    return <Loader />;
  }

  if (!booking) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-800">Booking Not Found</h2>
            <p className="mt-2 text-gray-600">The booking you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Format the date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate total hours and price
  const startTime = new Date(`2000-01-01T${booking.bookingDetails.startTime}`);
  const endTime = new Date(`2000-01-01T${booking.bookingDetails.endTime}`);
  const totalHours = (endTime - startTime) / (1000 * 60 * 60);
  const totalPrice = totalHours * booking.space.pricePerHour;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8 mt-[83px]">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-green-50 rounded-xl p-6 mb-8 flex items-center">
            <FaCheckCircle className="text-green-500 text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-green-800">Booking Confirmed!</h2>
              <p className="text-green-600">Your space has been successfully booked.</p>
            </div>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white p-6">
              <h1 className="text-2xl font-bold">Booking Receipt</h1>
              <p className="text-blue-100">Booking ID: {booking._id}</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Space Details */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Space Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800">{booking.space.name}</h3>
                    <p className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2" />
                      {booking.space.location.address}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center text-gray-600">
                      <FaCalendar className="mr-2" />
                      {formatDate(booking.bookingDetails.date)}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FaClock className="mr-2" />
                      {booking.bookingDetails.startTime} - {booking.bookingDetails.endTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="flex items-center text-gray-600">
                      <FaUser className="mr-2" />
                      {booking.bookingDetails.fullName}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FaEnvelope className="mr-2" />
                      {booking.bookingDetails.email}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center text-gray-600">
                      <FaPhone className="mr-2" />
                      {booking.bookingDetails.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Duration</span>
                    <span>{totalHours} hours</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Rate per hour</span>
                    <span>${booking.space.pricePerHour}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-gray-800 pt-4 border-t">
                    <span>Total Amount</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Important Information</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Please arrive 10 minutes before your booking time</li>
              <li>Bring a valid ID for verification</li>
              <li>Cancellation is available up to 24 hours before the booking time</li>
              <li>For any queries, please contact our support team</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingReceipt;