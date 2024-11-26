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
import axios from 'axios';
import 'aos/dist/aos.css';
import WhyChooseUs from "./WhyChooseUs";
import Loader from './Loader/Loader'; 
import api from '../axios';

const words = ["Space.", "Place.", "Room.", "Spot."];

const Home = () => {
    const [selectedCity, setSelectedCity] = useState("Select a City");
    const [selectedSpaceType, setSelectedSpaceType] = useState("Select a Space Type");
    const [currentWord, setCurrentWord] = useState("");
    const [spaces, setSpaces] = useState([]); 
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false); 
    const [isLoading, setIsLoading] = useState(true); 

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                setIsLoading(true); 
                const response = await api.get(`/spaces`, { timeout: 5000 }); 
                setSpaces(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching spaces:", error);
                setSpaces([]); // Ensure spaces is an empty array on error
                setIsLoading(false);
            }
        };
        
        const checkUserToken = () => {
            const token = getCookie('userProfile');
            if (token) {
                try {
                    // Safely parse the token
                    const decodedToken = JSON.parse(decodeURIComponent(token));
                    if (decodedToken && decodedToken.role === 'admin') {
                        setIsAdmin(true);
                        navigate('/admin');
                    } else {
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error('Token decoding failed:', error);
                    // Clear invalid token
                    document.cookie = 'userProfile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                }
            }
        };

        fetchSpaces();
        checkUserToken();
    }, [navigate]);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (isDeleting) {
                if (charIndex > 0) {
                    setCurrentWord(prev => prev.slice(0, -1)); 
                    setCharIndex(prev => prev - 1);
                } else {
                    setIsDeleting(false);
                    setWordIndex(prev => (prev + 1) % words.length); 
                }
            } else {
                if (charIndex < words[wordIndex].length) {
                    setCurrentWord(words[wordIndex].slice(0, charIndex + 1)); 
                    setCharIndex(prev => prev + 1);
                } else {
                    setIsDeleting(true);
                }
            }
        }, 150); 

        return () => clearInterval(typingInterval);
    }, [isDeleting, charIndex, wordIndex]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCity !== "Select a City" && selectedSpaceType !== "Select a Space Type") {
            navigate(`/search?query=city=${encodeURIComponent(selectedCity)}&type=${encodeURIComponent(selectedSpaceType)}`); 
        } else {
            // Optional: Add toast or alert for user to select both city and space type
            alert("Please select both City and Space Type");
        }
    };

    useEffect(() => {
        AOS.init({ 
            duration: 2000,
            once: true, 
            offset: 100 
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {isLoading ? (
                <Loader /> 
            ) : (
                <div className="flex-grow">
                    <div className="relative">
                        <div className="absolute top-1/4 right-[50px] md:right-[120px] w-2/3 md:w-[750px] h-[400px] md:h-[400px] rounded-full bg-gradient-radial from-fuchsia-500 to-cyan-500 opacity-30 blur-3xl -z-10"></div>
                        
                        <div className="container mx-auto mt-8 sm:mt-0 sm:px-4 px-2 flex flex-col lg:flex-row items-center justify-center min-h-screen">
                            <div className="lg:w-[50%] xl:w-[30%] text-center lg:text-left mb-8 lg:mb-0 lg:ml-[80px]">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                                    Find your Perfect 
                                    <span className="sm:inline-block ml-3 hidden">{currentWord}</span>
                                    <span className="sm:inline-block hidden animate-blink">|</span> 
                                </h1>
                                <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
                                    <span className="inline-block ml-3 sm:hidden">{currentWord}</span>
                                    <span className="inline-block sm:hidden animate-blink">|</span> 
                                </div> 
                            </div>
                            
                            <div className="lg:w-1/2 w-full flex justify-center">
                                <div className="px-8 py-10 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border-2 border-gray-100 gap-5 animate-fadeInScale hidden sm:flex">
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

                            <div className="sm:hidden w-full flex justify-center">
                                <div className="px-8 py-10 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border-2 border-gray-100 flex-col space-y-8 animate-fadeInScale">
                                    <DropdownCity setSelectedCity={setSelectedCity} />
                                    <DropdownType setSelectedSpaceType={setSelectedSpaceType} />
                                    <button
                                        onClick={handleSubmit}
                                        className="text-[12px] w-full px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-70 text-white font-black rounded-md transform transition-transform duration-300 hover:scale-105"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4">
                        <div data-aos="fade-left">
                            <Section
                                image={cws1}
                                title="Unlock Your Ideal Workspace"
                                description="Whether you're a startup or an established company, we provide the perfect space for your team. Discover flexible memberships and fully equipped offices that adapt to your needs, empowering your productivity."
                                link="#"
                            />    
                        </div>          

                        <div data-aos="fade-right">
                            <Section
                                image={cws2}
                                title="Future-Ready Workspaces for Your Hybrid Workforce"
                                description="Transform your real estate strategy with scalable office solutions that blend flexibility and cost-efficiency. From coworking spaces to turnkey offices, we've got everything you need to power your hybrid work model."
                                link="#"
                                reverse={true}
                            />
                        </div>

                        <div data-aos="fade-up">
                            <WhyChooseUs />
                        </div>

                        <div className="py-12 mb-12" data-aos="fade-up">
                            <SpaceCarousel />
                        </div>
                    </div>
                    
                    <Footer />
                </div>
            )}
        </div>
    );
};

// Safer cookie retrieval function
function getCookie(name) {
    if (typeof document === 'undefined') return null;
    
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`));
    
    return cookieValue ? cookieValue.split('=')[1] : null;
}

export default Home;