import { useEffect, useState } from "react";
import Loader from './Loader/Loader';
import Navbar from './Navbar';
import Footer from './Footer';
import ActivityCard from './ActivityCard';

const Activity = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setBookings(data);
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
    return <Loader />;
  }

  const dummyData = [
    {
      _id: '67456d47af4b73575bfaa44a',
      spaceId: '6729053ff2aba7999c12b4b7',
      userId: '672449799643ba49dcde5379',
      bookingDetails: {
        date: 'Tue Nov 26 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
        startTime: '13:40',
        endTime: '14:40'
      },
      status: 'pending',
      createdAt: 1732603207206,
      __v: 0
    },
    {
      _id: '67456d47af4b73575bfaa44b',
      spaceId: '6729053ff2aba7999c12b4b8',
      userId: '672449799643ba49dcde5380',
      bookingDetails: {
        date: 'Wed Nov 27 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
        startTime: '10:00',
        endTime: '11:00'
      },
      status: 'confirmed',
      createdAt: 1732603207207,
      __v: 0
    }
  ];

  const displayData = bookings.length > 0 ? bookings : dummyData;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="lg:text-4xl font-bold mb-12 text-center sm:text-2xl">Your Bookings</h1>
        {displayData.length > 0 ? (
          <div className="space-y-6">
            {displayData.map((booking) => (
              <ActivityCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <p className="text-xl">You don't have any bookings yet.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Activity;
