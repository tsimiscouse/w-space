import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import DropdownCity from './DropdownCity';
import DropdownType from './DropdownType';
import Section from './Section';
import SpaceCarousel from './SpaceCarousel';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import cws1 from '../assets/cws-section-1.jpg';
import cws2 from '../assets/cws-section-2.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const words = ["Space.", "Place.", "Room.", "Spot."];

const Home = () => {
    const [selectedCity, setSelectedCity] = useState("Select a City");
    const [selectedSpaceType, setSelectedSpaceType] = useState("Select a Space Type");
    const [currentWord, setCurrentWord] = useState("");
    const [spaces, setSpaces] = useState([]); // Stores the space data
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch spaces from your backend API (MongoDB)
        const fetchSpaces = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/spaces'); // Adjust URL as necessary
                setSpaces(response.data); // Set the spaces in state
            } catch (error) {
                console.error("Error fetching spaces:", error);
            }
        };

        fetchSpaces();
    }, []);

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
        navigate(`/search?query=city=${encodeURIComponent(selectedCity)}&type=${encodeURIComponent(selectedSpaceType)}`); 
    };

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

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
                        <div className='px-[80px] py-[60px] bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border-2 border-gray-100 flex gap-5 animate-fadeInScale'>
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
            <div className='min-h-[1080px] px-[40px]'>
                <div className="absolute left-[100px] w-[500px] h-[400px] rounded-full bg-gradient-radial from-fuchsia-500 to-cyan-500 opacity-30 blur-3xl -z-10"></div>
                {/* Section 1 */}
                <div data-aos="fade-left">
                    <Section
                        image={cws1}
                        title="Unlock Your Ideal Workspace"
                        description="Whether you're a startup or an established company, we provide the perfect space for your team. Discover flexible memberships and fully equipped offices that adapt to your needs, empowering your productivity."
                        link="#"
                    />    
                </div>          
                <div className="absolute right-[100px] w-[500px] h-[400px] rounded-full bg-gradient-radial from-fuchsia-500 to-cyan-500 opacity-30 blur-3xl -z-10"></div>
                {/* Section 2 */}
                <div data-aos="fade-right">
                    <Section
                        image={cws2}
                        title="Future-Ready Workspaces for Your Hybrid Workforce"
                        description="Transform your real estate strategy with scalable office solutions that blend flexibility and cost-efficiency. From coworking spaces to turnkey offices, we’ve got everything you need to power your hybrid work model."
                        link="#"
                        reverse={true}
                        data-aos="fade-right"
                    />
                </div>

                <div className="py-12 mb-12" data-aos="fade-up">
                    <SpaceCarousel />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
