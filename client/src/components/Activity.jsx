import { useEffect, useState } from "react";
import Loader from './Loader/Loader'; // Assuming you have a Loader component to show during the fetch

const Activity = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch the bookings of the current user from the backend
        const response = await fetch('http://localhost:5000/api/bookings/user', {
          method: 'GET',
          credentials: 'include', // Ensures authentication cookie is sent with the request
        });

        if (response.ok) {
          const data = await response.json();
          setBookings(data); // Store the bookings in the state
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) {
    return <Loader />; // Show loading indicator until the data is fetched
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Your Bookings</h1>
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h2 className="text-xl font-semibold">{booking.bookingDetails.fullName}</h2>
              <p className="text-gray-500">{booking.bookingDetails.location}</p>
              <p className="mt-2">Date: {new Date(booking.bookingDetails.date).toLocaleDateString()}</p>
              <p className="mt-2">Time: {booking.bookingDetails.startTime} - {booking.bookingDetails.endTime}</p>
              <p className="mt-2">{booking.bookingDetails.description}</p>
              <p className="mt-2 text-sm text-gray-500">Status: {booking.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl">You don't have any bookings yet.</p>
      )}
    </div>
  );
};

export default Activity;
