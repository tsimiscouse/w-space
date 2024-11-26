import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState(""); 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setPopupType("error");
            setPopupMessage("All fields are required!");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/contact/send-email`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                setPopupType("success");
                setPopupMessage("Message Sent! We'll reach out to you soon.");
                setShowPopup(true);

                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            } else {
                setPopupType("error");
                setPopupMessage("Failed to send the message. Please try again.");
                setShowPopup(true);
            }
        } catch (error) {
            setPopupType("error");
            setPopupMessage("An error occurred. Please try again.");
            setShowPopup(true);
        }

        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    return (
        <>
            <Navbar />
            <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#D9E4F5] via-[#E3FDFD] to-[#F9E5E7] p-6">
                {/* Background Gradient Decoration */}
                <div className="absolute top-1/4 right-[120px] w-[750px] h-[400px] rounded-full bg-gradient-radial from-fuchsia-500 to-cyan-500 opacity-30 blur-3xl -z-10 animate-fadeInScale"></div>
                
                {/* Header Section */}
                <h1 className="text-4xl font-bold text-center mb-8 animate-fadeInScale">
                    Let’s{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                         Get in Touch
                        </span>{" "}
                     and Connect!
                </h1>

                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl bg-white shadow-lg rounded-lg px-8 py-10 animate-fadeInScale"
                >
                    <div className="flex gap-4 mb-6">
                        {/* Name Input */}
                        <div className="flex-1">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-[#9AB3F5]"
                                required
                            />
                        </div>
                        {/* Email Input */}
                        <div className="flex-1">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-[#9AB3F5]"
                                required
                            />
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="message"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-[#9AB3F5]"
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    {/* Send Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-[#9AB3F5] shadow-lg transform hover:scale-105 transition-transform duration-200"
                        >
                            Send
                        </button>
                    </div>
                </form>

                {/* Pop-up Notification */}
                {showPopup && (
                    <div
                        className={`fixed bottom-6 right-6 text-gray-800 py-5 px-6 rounded-lg shadow-lg flex items-center space-x-3 animate-fadeInScale ${
                            popupType === "success"
                                ? "bg-[#34D399] text-white"
                                : "bg-red-500 text-white"
                        }`}
                    >
                        {popupType === "success" ? (
                            <FaCheckCircle className="h-8 w-8" />
                        ) : (
                            <FaExclamationCircle className="h-8 w-8" />
                        )}
                        <div>
                            <p className="text-lg font-bold">{popupMessage}</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
