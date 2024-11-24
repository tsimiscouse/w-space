import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "./SpaceCarouselStyles.css";

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
        const response = await axios.get("http://localhost:5000/api/spaces");
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
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="lg:text-4xl font-bold mb-12 text-center sm:text-2xl">Recommended Spaces</h2>
      {spaces.length > 0 ? (
        <Slider {...settings}>
          {spaces.map((space) => (
            <div key={space._id} className="p-4">
              <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col items-center sm:h-[300px] md:h-[350px] lg:h-[400px] transform hover:scale-105 hover:translate-y-[-5px] transition-all duration-300">
                {/* Display the first image only or fallback if not available */}
                <img
                  src={space.images[0].url}
                  alt={space.name}
                  className="w-full h-48 object-cover sm:h-36 md:h-40 lg:h-48"
                />

                <div className="p-4 flex flex-col flex-grow w-full">
                  <h3 className="font-bold text-lg sm:text-sm md:text-base lg:text-lg">{space.name}</h3>
                  <p className="text-gray-400 text-md sm:text-xs md:text-sm">{space.category}</p>

                  <p className="text-gray-500 text-sm sm:text-xs md:text-sm mt-1">
                    {space.location?.city}, {space.location?.state} - {space.location?.country}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-xs md:text-sm mt-2 line-clamp-3">
                    {space.description}
                  </p>
                  <div className="mt-auto flex justify-between items-center w-full">
                    <span className="font-bold text-indigo-800 sm:text-xs md:text-sm lg:text-base">
                      {formatPrice(space.pricePerHour)} /hour
                    </span>
                    <button
                      onClick={() => handleSelectSpace(space)}
                      className="text-indigo-600 hover:underline text-sm sm:text-xs md:text-sm lg:text-base"
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center">No spaces available at the moment.</p>
      )}
    </div>
  );
};

export default SpaceCarousel;
