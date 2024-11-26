import React, { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "aos/dist/aos.css";
import AOS from "aos";

const AboutUs = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    }, []);

    return (
        <div
            className="relative min-h-screen overflow-hidden"
            style={{
                background: "linear-gradient(to bottom right, #ffffff, #e0e7ff, #f3e8ff)", // Subtle white to blue and purple gradient
            }}
        >
            {/* Navbar */}
            <Navbar />

            {/* Header Section */}
            <div className="container mx-auto px-6 pt-32 pb-16">
                <div
                    className="text-center mb-16 px-[80px] py-[60px] bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border-2 border-gray-100 animate-fadeInScale"
                    data-aos="fade-down"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#191B1D]">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Us</span>
                    </h1>
                    <p className="mt-4 text-gray-700">
                        Discover W-Space, a revolutionary platform crafted to redefine how teams collaborate, innovate, and grow.
                    </p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="container mx-auto px-6 pb-16 space-y-16">
                {/* Section 1: Welcome */}
                <div
                    className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10"
                    data-aos="fade-right"
                >
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-[#191B1D] mb-4">
                            Welcome to W-Space
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to W-Space, where space meets simplicity! Whether you're looking for co-working spaces, private offices, or event venues, we connect you to the perfect space with ease, speed, and transparency. No more hassle, just seamless bookings tailored to your needs.
                        </p>
                    </div>
                    <img
                        src="https://blog.go-work.com/wp-content/uploads/2020/02/definisi-coworking-space.jpg"
                        alt="Vibrant Coworking Spaces"
                        className="lg:w-1/3 w-full rounded-lg shadow-lg"
                    />
                </div>

                {/* Section 2: Mission */}
                <div
                    className="flex flex-col lg:flex-row items-center justify-between gap-10"
                    data-aos="fade-left"
                >
                    <img
                        src="https://img.jakpost.net/c/2018/11/16/2018_11_16_58796_1542336203._large.jpg"
                        alt="Our Mission"
                        className="lg:w-1/3 w-full rounded-lg shadow-lg"
                    />
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-[#191B1D] mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            At W-Space, our mission is simple: to redefine how you find and book spaces. We aim to create opportunities by bridging the gap between users and providers, ensuring efficient and innovative space utilization.
                        </p>
                    </div>
                </div>

                {/* Section 3: Why W-Space */}
                <div
                    className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10"
                    data-aos="fade-right"
                >
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-[#191B1D] mb-4">Why W-Space?</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We solve the struggles of traditional space booking:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 leading-relaxed">
                            <li>One-stop platform for all types of spaces.</li>
                            <li>Real-time availability updates.</li>
                            <li>Custom filters for your needs.</li>
                            <li>Simplified processes, so you focus on what matters most.</li>
                        </ul>
                    </div>
                    <img
                        src="https://www.comfortfurniture.com.sg/blog/wp-content/uploads/2020/04/how-to-make-the-office-space-look-attractive-and-fun-comfort-furniture.jpg"
                        alt="What is W-Space"
                        className="lg:w-1/3 w-full rounded-lg shadow-lg"
                    />
                </div>

                {/* Section 4: Technology */}
                <div
                    className="flex flex-col lg:flex-row items-center justify-between gap-10"
                    data-aos="fade-right"
                >
                    <img
                        src="https://miro.medium.com/v2/resize:fit:1200/1*FVtCyRdJ6KOr4YswTtwMeA.jpeg"
                        alt="Technology"
                        className="lg:w-1/3 w-full rounded-lg shadow-lg"
                    />
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-[#191B1D] mb-4">Our Technology</h2>
                        <p className="text-gray-600 leading-relaxed">
                            At the heart of W-Space lies state-of-the-art technology, designed to provide a seamless and efficient experience. Our sleek, user-friendly interface is powered by React.js, while robust back-end operations are handled by Node.js and Express.js. Real-time data updates are supported by MongoDB Atlas, ensuring that you’re always connected to the most up-to-date information. Together, these technologies form the backbone of W-Space, delivering an experience that’s as innovative as it is reliable.
                        </p>
                    </div>
                </div>

                {/* Section 5: The Team */}
                <div className="text-center mt-20 animate-fadeInScale" data-aos="fade-left">
                    <h2 className="text-3xl font-bold text-[#191B1D] mb-6">
                        The Team Behind W-Space
                    </h2>
                    <p className="text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        "W-Space is more than just a project; it’s a testament to the power of teamwork, creativity, and resilience. Crafted with passion and precision, this platform is the final project of Group 16 AW in the Web App Development class."
                    </p>
                    <img
                        src="https://github.com/tsimiscouse/w-space/blob/barbs/asset/PAW16.png?raw=true"
                        alt="PAW 16 Team"
                        className="mx-auto rounded-lg shadow-lg w-full h-auto transition-transform duration-500 hover:scale-105"
                        data-aos="fade-right"
                    />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutUs;
