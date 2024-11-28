import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import api from '../axios';

const BookingConfirmationPopup = ({ 
  isOpen, 
  onClose, 
  bookingDetails 
}) => {
  const { _id } = useParams(); // Get the space ID from URL
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      if (!isOpen) return;

      try {
        const response = await axios.get(`https://api.w-space.site/api/spaces/${_id}`);
        setSpaceDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching space details:', error);
        setLoading(false);
      }
    };

    fetchSpaceDetails();
  }, [isOpen, _id]);

  // Helper function to format price (reusing the one from SpacePage)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  // Calculate total price based on booking duration
  const calculateTotalPrice = () => {
    if (!spaceDetails || !bookingDetails) return 'N/A';
    
    // Calculate hours between start and end time
    const start = new Date(`1970-01-01T${bookingDetails.startTime}`);
    const end = new Date(`1970-01-01T${bookingDetails.endTime}`);
    const diffInHours = Math.abs(end - start) / (1000 * 60 * 60);
    
    return formatPrice(spaceDetails.pricePerHour * diffInHours);
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 50 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
          className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-green-500 text-white p-6 text-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-16 h-16 mx-auto mb-4 animate-bounce"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
              />
            </svg>
            <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-semibold text-gray-500">Space Name</p>
                <p>{spaceDetails?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Date</p>
                <p>{bookingDetails.date}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Time</p>
                <p>{`${bookingDetails.startTime} - ${bookingDetails.endTime}`}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Total Price</p>
                <p>{calculateTotalPrice()}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/bookings'}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Bookings
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BookingConfirmationPopup;