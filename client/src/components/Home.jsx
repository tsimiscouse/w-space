import Navbar from './Navbar';
import Footer from './Footer';
import DropdownCity from './DropdownCity';
import DropdownType from './DropdownType';
import { useState, useEffect } from 'react';
import './Home.css';
import Slider from './Slider';

const words = ["Space.", "Place.", "Room.", "Spot."];

const Home = () => {
    const [selectedCity, setSelectedCity] = useState("Select a City");
    const [selectedSpaceType, setSelectedSpaceType] = useState("Select a Space Type");
    const [currentWord, setCurrentWord] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (isDeleting) {
                if (charIndex > 0) {
                    setCurrentWord(prev => prev.slice(0, -1)); 
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setWordIndex((wordIndex + 1) % words.length); 
                }
            } else {
                if (charIndex < words[wordIndex].length) {
                    setCurrentWord(words[wordIndex].slice(0, charIndex + 1)); 
                    setCharIndex(charIndex + 1);
                } else {
                    setIsDeleting(true);
                }
            }
        }, 150); 

        return () => clearInterval(typingInterval);
    }, [isDeleting, charIndex, wordIndex]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Selected City:", selectedCity);
        console.log("Selected Space Type:", selectedSpaceType);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="absolute top-1/4 right-[120px] w-[750px] h-[400px] rounded-full bg-gradient-radial from-fuchsia-500 to-cyan-500 opacity-30 blur-3xl -z-10"></div>
            <div className="flex-grow flex items-center justify-center">
                <div className="flex min-h-screen w-full max-w-6xl mt-4">
                    <div className="w-[450px] flex items-center justify-center">
                        <h1 className="text-6xl font-black">
                            Find your Perfect 
                            <span className="inline-block ml-3">{currentWord}</span>
                            <span className="inline-block animate-blink">|</span> 
                        </h1>
                    </div>
                    <div className="w-2/3 flex items-center justify-center space-x-4">
                        <div className='px-[80px] py-[60px] bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border-2 border-gray-100 flex gap-5 animate-fadeInScale  '>
                            <DropdownCity setSelectedCity={setSelectedCity} />
                            <DropdownType setSelectedSpaceType={setSelectedSpaceType} />
                            <button 
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-70 text-white font-black rounded-md transform transition-transform duration-300 hover:scale-105"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-5">
                <Slider />
            </div>
            <div className="mt-5">
                <Footer />
            </div>
        </div>
    );
};

export default Home;
