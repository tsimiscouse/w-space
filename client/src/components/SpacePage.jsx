import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Loader from './Loader/Loader';
import { FaArrowLeft, FaArrowRight, FaWifi, FaParking, 
         FaRestroom, FaChair, FaProjectDiagram, FaCoffee, FaAccessibleIcon, 
         FaAirFreshener, FaVolumeUp, FaTint, FaPrint, FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BookingConfirmationPopup from './BookingPopup';
import api from '../axios';

// Map the amenities to their respective icons
const amenityIcons = {
  'Wi-Fi': FaWifi,
  'Parking': FaParking,
  'Air Conditioning': FaAirFreshener,
  'Restroom': FaRestroom,
  'Chairs': FaChair,
  'Projector': FaProjectDiagram,
  'Coffee Machine': FaCoffee,
  'Accessibility': FaAccessibleIcon,
  'Sound System': FaVolumeUp, 
  'Free Water': FaTint,  
  'Printer and Scanner': FaPrint,
};


const renderStars = (ratings) => {
  const stars = [];
  const fullStars = Math.floor(ratings); // Number of full stars
  const hasHalfStar = ratings % 1 >= 0.5; // Half star if the decimal is 0.5 or more
  const totalStars = hasHalfStar ? fullStars + 1 : fullStars; // Full + Half stars
  const emptyStars = 5 - totalStars; // Remaining stars to complete 5

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
  }

  // Add half star if applicable
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
  }

  return stars;
};

const SpacePage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [bookingConfirmationDetails, setBookingConfirmationDetails] = useState(null);
  
  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {
        const response = await api.get(`api/spaces/${_id}`);
        setSpace(response.data);
        setLoading(false);

        // Ensure Google Maps API is being loaded and triggered correctly
        if (window.google && response.data.location) {
          const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: response.data.location.lat, lng: response.data.location.lng },
            zoom: 15,
          });

          new window.google.maps.Marker({
            position: { lat: response.data.location.lat, lng: response.data.location.lng },
            map: map,
            title: response.data.name,
          });
        } else {
          console.error("Google Maps API is not available or the location data is missing.");
        }
      } catch (error) {
        console.error('Error fetching space details:', error);
        setLoading(false);
      }
    };

    fetchSpaceDetails();
    
    // Additional call to make sure Google Maps API is loaded
    const checkGoogleMapsAPI = () => {
      if (window.google) {
        console.log("Google Maps API is successfully loaded.");
      } else {
        console.error("Google Maps API is not loaded.");
      }
    };

    checkGoogleMapsAPI();

  }, [_id]);

  useEffect(() => {
      AOS.init({ duration: 2000 });
  }, []);

  const getUserId = () => {
    const cookies = document.cookie.split(';');
    let userProfile = null;

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('userProfile=')) {
        userProfile = cookie.substring('userProfile='.length);
        break;
      }
    }

    if (!userProfile) return null;

    try {
      const parsedUserProfile = JSON.parse(decodeURIComponent(userProfile));
      return parsedUserProfile.userId;
    } catch (error) {
      console.error('Error parsing userProfile cookie:', error);
      return null;
    }
  };

  const handleBooking = async () => {
    const userId = getUserId();
    if (!userId) {
      alert('You need to be logged in to book a space');
      navigate('/');
      return;
    }

    const spaceAvailabilityCheck = await checkSpaceAvailability(bookingDate, startTime, endTime);
    if (!spaceAvailabilityCheck.available) {
      alert('The space is already booked for the selected time');
      return;
    }

    const bookingData = {
      spaceId: _id,
      userId: userId,
      bookingDetails: {
        fullName,
        email,
        phone,
        date: bookingDate,
        startTime,
        endTime,
      },
    };

    try {
      await api.post(`api/bookings`, bookingData, {
        withCredentials: true,
      });
      setBookingConfirmationDetails(bookingData.bookingDetails);
      setShowConfirmationPopup(true);
    } catch (error) {
      console.error('Error booking space:', error);
      alert('There was an error processing your booking.');
    }
  };

  const checkSpaceAvailability = async (bookingDate, startTime, endTime) => {
    try {
      const response = await api.get(`api/bookings/check-availability`, {
        params: {
          spaceId: _id,
          date: bookingDate,
          startTime,
          endTime,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error checking space availability:', error);
      alert('There was an error checking space availability.');
      return { available: false }; 
    }
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % space.images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + space.images.length) % space.images.length);
  };

  // Format price in Rupiah (IDR)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      {showConfirmationPopup && (
        <BookingConfirmationPopup 
          isOpen={showConfirmationPopup}
          onClose={() => setShowConfirmationPopup(false)}
          bookingDetails={bookingConfirmationDetails}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-grow mt-[83px] p-4 lg:p-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          {/* Left Column - Space Details */}
          <div className="w-full lg:w-2/3 space-y-6" data-aos="fade">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">{space.name}</h1>
              
              {/* Image Slider */}
              <div className="relative h-[300px] md:h-[400px] mb-6 rounded-xl overflow-hidden">
                <img
                  src={space.images[currentIndex].url}
                  alt={space.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={goToPrev}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                >
                  <FaArrowRight />
                </button>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">Category</p>
                  <p className='text-black'>{space.category}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">Price per Hour</p>
                  <p className='text-blue-600'>{formatPrice(space.pricePerHour)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">Capacity</p>
                  <p className='text-black'>{space.capacity} people</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">Ratings</p>
                  <div className="flex items-center">
                    {renderStars(space.ratings)}
                    <span className="ml-2 text-gray-700">{space.ratings?.toFixed(1) || "0.0"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Description</h2>
              <p className="text-gray-700 leading-relaxed">{space.description}</p>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Amenities</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {space.amenities.slice(0, 4).map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || FaAccessibleIcon;
                  return (
                    <div key={index} className="flex items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <IconComponent className="w-6 h-6 text-blue-500 mr-3" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Location</h2>
              <p className="text-gray-400 mb-4">
                {`${space.location.address}, ${space.location.city}, ${space.location.state}, ${space.location.country}`}
              </p>
              <div id="map" className="h-[300px] rounded-lg"></div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24" data-aos="fade">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Book this Space</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />

                <div className="flex gap-4">
                  <input
                    type="time"
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <input
                    type="time"
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>

                <button
                  className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200"
                  onClick={handleBooking}
                >
                  Book Space
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SpacePage;
