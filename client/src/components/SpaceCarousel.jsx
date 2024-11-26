import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import api from '../axios';

// Utility function to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const SpaceCarousel = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch spaces from the API
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await api.get(`/spaces`);
        setSpaces(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching spaces:", error);
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  // Handle selecting a space
  const handleSelectSpace = (space) => {
    navigate(`/spaces/${space._id}`);
  };

  // React Slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: 'unslick'
      }
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Recommended Spaces
        </h2>
        <Link 
          to="/search" 
          className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
        >
          Learn More
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </Link>
      </div>

      {spaces.length > 0 ? (
        <>
          {/* Carousel for lg and above */}
          <div className="hidden lg:block">
            <Slider {...settings}>
              {spaces.map((space) => (
                <div key={space._id} className="p-4">
                  <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col items-center h-[400px] transform hover:scale-105 hover:translate-y-[-5px] transition-all duration-300">
                    <img
                      src={space.images[0].url}
                      alt={space.name}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-4 flex flex-col flex-grow w-full">
                      <h3 className="font-bold text-lg line-clamp-1">{space.name}</h3>
                      <p className="text-gray-400 text-sm">{space.category}</p>

                      <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                        {space.location?.city}, {space.location?.state} - {space.location?.country}
                      </p>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                        {space.description}
                      </p>
                      <div className="mt-auto flex justify-between items-center w-full">
                        <span className="font-bold text-indigo-800">
                          {formatPrice(space.pricePerHour)} /hour
                        </span>
                        <button
                          onClick={() => handleSelectSpace(space)}
                          className="text-indigo-600 hover:underline"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Grid for smaller screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:hidden">
            {spaces.slice(0, 6).map((space) => (
              <div 
                key={space._id} 
                className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 hover:translate-y-[-5px] transition-all duration-300"
              >
                <img
                  src={space.images[0].url}
                  alt={space.name}
                  className="w-full h-32 sm:h-48 object-cover"
                />

                <div className="py-2 px-4 sm:p-4">
                  <h3 className="font-bold text-lg sm:text-lg line-clamp-1">{space.name}</h3>
                  <p className="text-gray-400 text-xs sm:text-md line-clamp-1">{space.category}</p>

                  <p className="text-gray-500 text-md sm:text-md mt-1 line-clamp-1">
                    {space.location?.city}, {space.location?.state}
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-bold text-indigo-800 text-md sm:text-lg">
                      {formatPrice(space.pricePerHour)} /hour
                    </span>
                    <button
                      onClick={() => handleSelectSpace(space)}
                      className="text-indigo-600 hover:underline text-xs sm:text-md"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">No spaces available at the moment.</p>
      )}
    </div>
  );
};

export default SpaceCarousel;