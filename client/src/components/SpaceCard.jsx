import React from 'react';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-ID', { style: 'currency', currency: 'IDR' }).format(price);
};

const Card = ({ _id, name, location, category, description, image, price }) => {
  const navigate = useNavigate();

  // Navigate to the space detail page when card is clicked
  const handleClick = () => {
    navigate(`/spaces/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer flex items-center p-4"
    >
      <img src={image} alt={name} className="w-48 h-28 object-cover rounded-md mr-4" />
      <div className="flex-1 h-28 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-lg">{name}</h2>
          <p className="text-indigo-800 text-sm mt-3">{location}</p>
          <p className="text-gray-500 text-xs mb-1">{category}</p>
          <p className="text-gray-500 text-xs font-thin line-clamp-2">{description}</p>
        </div>
        <div className="flex justify-end items-center">
          <p className="font-bold text-base text-indigo-800">
            {formatPrice(price)} /hour
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
