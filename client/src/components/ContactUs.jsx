import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Import icon checklist dan error

const ContactUs = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState(""); // success or error
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

                // Kosongkan form setelah pesan dikirim
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

        // Sembunyikan pop-up setelah beberapa detik
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#D9E4F5] via-[#E3FDFD] to-[#F9E5E7]">
            <h1 className="text-6xl font-extrabold text-[#191B1D] mb-8 tracking-wide underline underline-offset-8 decoration-[#34D399]">
                Contact Us
            </h1>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 py-10 transform hover:scale-105 transition-transform duration-300"
            >
                <div className="mb-6">
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
                <div className="mb-6">
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
                <button
                    type="submit"
                    className="w-full bg-[#191B1D] text-white py-2 px-4 rounded hover:bg-[#383B40] focus:outline-none focus:ring focus:ring-[#9AB3F5]"
                >
                    Send
                </button>
            </form>

            {/* Pop-up Success/Error Message */}
            {showPopup && (
                <div
                    className={`fixed bottom-6 right-6 text-gray-800 py-5 px-6 rounded-lg shadow-lg flex items-center space-x-3 ${
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
    );
};

export default ContactUs;
