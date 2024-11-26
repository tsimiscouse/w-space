import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "aos/dist/aos.css";
import AOS from "aos";

const teamMembersRow1 = [
    { name: "Barbara Neanake A.", image: "https://github.com/tsimiscouse/w-space/blob/main/asset/Barbara.png?raw=true" },
    { name: "Muhammad Luthfi A.", image: "https://github.com/tsimiscouse/w-space/blob/main/asset/Lutfi.png?raw=true" },
];

const teamMembersRow2 = [
    { name: "Josua Adhi Candra N.", image: "https://github.com/tsimiscouse/w-space/blob/main/asset/Hoho.png?raw=true" },
    { name: "Muhammad Aqiil F.", image: "https://github.com/tsimiscouse/w-space/blob/main/asset/Aqiil.png?raw=true" },
    { name: "Ramadhani F.", image: "https://github.com/tsimiscouse/w-space/blob/main/asset/Febs.png?raw=true" },
];

const OurTeam = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-100 to-white">
            {/* Navbar */}
            <Navbar />

            {/* Header Section */}
            <div className="container mx-auto px-6 pt-40 pb-16">
                <div
                    className="text-center mb-16 px-[80px] py-[60px] bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border-2 border-gray-100 shadow-lg animate-fadeInScale"
                    data-aos="fade-down"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-[#191B1D] mb-4">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Team</span>
                    </h1>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        W-Space is the result of shared passion, creativity, and dedication. Together, we’ve built something extraordinary.
                    </p>
                </div>
            </div>

            {/* Team Members Section */}
            <div className="container mx-auto px-6 pb-16">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 py-12">
                    {teamMembersRow1.map((member, index) => (
                        <div
                            key={index}
                            className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-transform transform hover:scale-105"
                            data-aos="fade-up"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="rounded-full w-40 h-40 mx-auto mb-4 shadow-md border-4 border-purple-300"
                            />
                            <h2 className="text-lg font-bold text-[#191B1D]">{member.name}</h2>
                        </div>
                    ))}
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 py-12">
                    {teamMembersRow2.map((member, index) => (
                        <div
                            key={index}
                            className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-transform transform hover:scale-105"
                            data-aos="fade-up"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="rounded-full w-40 h-40 mx-auto mb-4 shadow-md border-4 border-purple-300"
                            />
                            <h2 className="text-lg font-bold text-[#191B1D]">{member.name}</h2>
                        </div>
                    ))}
                </div>
            </div>

            {/* Documentation Section */}
            <div className="container mx-auto px-6 py-12 text-center">
                <p className="text-gray-700 leading-relaxed">
                    Documentation for this project is available on our{" "}
                    <a
                        href="https://github.com/tsimiscouse/w-space"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:text-purple-700 font-bold underline"
                    >
                        GitHub repository
                    </a>. 
                </p>
                <p className="text-gray-700 mt-4 leading-relaxed">
                    For more technical details and our project presentation, access the full documentation through{" "}
                    <a
                        href="https://bit.ly/PAW_16"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:text-purple-700 font-bold underline"
                    >
                        bit.ly/PAW_16
                    </a>.
                </p>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default OurTeam;
