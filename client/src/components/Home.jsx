import Navbar from './Navbar';
import Footer from './Footer';
import DropdownCity from './DropdownCity';
import DropdownType from './DropdownType';
import { useState } from 'react';

const Home = () => {
    const [selectedCity, setSelectedCity] = useState("Select a City");
    const [selectedSpaceType, setSelectedSpaceType] = useState("Select a Space Type");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Selected City:", selectedCity);
        console.log("Selected Space Type:", selectedSpaceType);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="flex min-h-screen w-full max-w-6xl">
                    <div className="w-1/3 flex items-center justify-center">
                        <h1 className="text-6xl font-black">Find your Perfect Space.</h1>
                    </div>
                    <div className="w-2/3 flex items-center justify-center space-x-4">
                        <div className="relative">
                            <DropdownCity setSelectedCity={setSelectedCity} />
                        </div>
                        <div className="relative">
                            <DropdownType setSelectedSpaceType={setSelectedSpaceType} />
                        </div>
                        <button 
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-white text-black rounded-md border-2 border-black transform transition-transform duration-300 hover:scale-105"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
