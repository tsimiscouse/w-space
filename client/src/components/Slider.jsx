// Carousel.jsx
import { useState } from 'react';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const cards = [
        <div key="1" className="h-[300px] p-4 flex flex-col justify-center items-center bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Place 1: Placeholder</h2>
            <p>Description placeholder.</p>
        </div>,
        <div key="2" className="h-[300px] p-4 flex flex-col justify-center items-center bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Place 2: Placeholder</h2>
            <p>Description Placeholder.</p>
        </div>,
        <div key="3" className="h-[300px] p-4 flex flex-col justify-center items-center bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Place 3:Placeholder</h2>
            <p>Description placeholder.</p>
        </div>,
        // Add more cards as needed
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? cards.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full max-w-xl mx-auto">
            <div className="overflow-hidden relative">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="min-w-full h-[300px] p-4 flex justify-center items-center bg-white rounded-lg shadow-md"
                        >
                            {card}
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 p-2 rounded-full"
            >
                &lt;
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 p-2 rounded-full"
            >
                &gt;
            </button>
        </div>
    );
};

export default Slider;
