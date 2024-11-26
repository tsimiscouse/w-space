import React from "react";

const ActivityCard = ({ booking, onStatusChange }) => {
  const handleConfirm = () => onStatusChange(booking._id, "confirmed");
  const handleCancel = () => onStatusChange(booking._id, "canceled");

  const getStatusClasses = (status) => {
    switch (status) {
      case "Confirmed":
        return "border-green-600 bg-green-100 text-green-600";
      case "Pending":
        return "border-yellow-600 bg-yellow-100 text-yellow-600";
      case "Canceled":
        return "border-red-600 bg-red-100 text-red-600";
      default:
        return "border-gray-600 bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white w-full flex flex-col justify-between">
      <div className="flex">
        <div className="mr-4">
          <img src="/assets/wsphoto.jpg" alt="Booking Image" className="w-32 h-32 object-cover rounded-lg" />
        </div>
        <div className="flex-grow">
          <h2 className="text-xl font-semibold mb-2">Place Name: {booking.spaceId}</h2>
          <p className="text-gray-600">
            Time: {booking.bookingDetails.startTime} - {booking.bookingDetails.endTime}
          </p>
          <p className="text-gray-600">
            Created At: {new Date(booking.createdAt).toLocaleDateString()}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Status: <span className={`px-2 py-1 border rounded ${getStatusClasses(booking.status)}`}>{booking.status}</span>
            </p>
            <div className="flex gap-4 ml-auto">
                <button
                onClick={handleCancel}
                className="w-24 px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors focus:ring-4 focus:ring-gray-200"
                >
                Cancel
                </button>
                <button
                onClick={handleConfirm}
                className="w-24 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200"
                >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
