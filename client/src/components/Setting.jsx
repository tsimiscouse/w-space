import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../userService";

const Settings = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false); // For success popup
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await getProfile(token);
                setProfile(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch profile data.");
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateProfile(token, profile);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000); // Auto-hide success popup
            setLoading(false);
        } catch (err) {
            setError("Failed to update profile.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#D9E4F5] via-[#E3FDFD] to-[#F9E5E7] flex items-center justify-center p-8">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-10 transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                    Account Settings
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    Let's update your W-Space personal details, avatar, and email here!
                </p>

                {loading && <p className="text-center text-blue-500">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-3 shadow-md">
                            <span className="text-gray-500 text-5xl">👤</span>
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                            Upload Picture
                        </button>
                    </div>

                    {/* Form */}
                    <form className="flex-1" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="firstName"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                First Name:
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="lastName"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Last Name:
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Email Address:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={profile.email}
                                disabled
                                className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg shadow hover:bg-gray-400 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Popup */}
            {success && (
                <div className="fixed bottom-8 right-8 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 animate-fade">
                    <span className="text-lg font-medium">Profile Updated Successfully!</span>
                </div>
            )}
        </div>
    );
};

export default Settings;
