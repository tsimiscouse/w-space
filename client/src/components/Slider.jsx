import React, { useState } from 'react';
import CarouselCard from './CarouselCard';

const Slider = ({ spaces }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % spaces.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? spaces.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full max-w-xl mx-auto">
            <div className="overflow-hidden relative">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {spaces.map((space) => (
                        <div key={space._id.$oid} className="min-w-full">
                            <CarouselCard
                                image={space.images[0].url}
                                name={space.name}
                                city={space.location.city}
                                country={space.location.country}
                                description={space.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={prevSlide}
                className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 text-white bg-gray-700 p-2 rounded-full transition-transform duration-300 hover:scale-105"
            >
                &lt;
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 text-white bg-gray-700 p-2 rounded-full transition-transform duration-300 hover:scale-105"
            >
                &gt;
            </button>
            <div className='flex justify-center mt-4'>
                {spaces.map((_, index)=>(
                    <button 
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}
                        onClick={()=>goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Slider;
