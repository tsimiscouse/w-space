import { useState } from "react";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.jpg';
import api from '../axios';

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: res } = await api.post(`/users`);
            navigate("/");
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
            <div className="flex min-h-screen flex-col md:flex-row">
                <div className="absolute top-[20px] right-[0px] w-[800px] h-[600px] rounded-full bg-gradient-radial from-fuchsia-500 to-cyan-500 opacity-30 blur-3xl -z-10"></div>
                
                {/* Logo Section */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-transparent py-8 md:py-0">
                    <img 
                        src={Logo} 
                        alt="W-Space Logo" 
                        className="w-[150px] md:w-[300px] lg:w-[400px] h-auto mt-[50px] md:mt-0" 
                    />
                </div>

                {/* Signup Form Section */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-transparent p-8">
                    {loading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                            <div className="loader-wrapper">
                                <span className="loader">
                                    <span className="loader-inner"></span>
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="relative w-full max-w-lg flex flex-col items-center text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 md:mb-[50px] text-center">
                            Enhance productivity.
                        </h1>
                        <h2 className="text-2xl font-black mb-1 text-center">
                            Join now
                        </h2>
                        <form 
                            className="flex flex-col w-full max-w-[400px] text-sm" 
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                onChange={handleChange}
                                value={data.firstName}
                                required
                                className="mt-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={handleChange}
                                value={data.lastName}
                                required
                                className="mt-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className="mt-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className="mt-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {error && (
                                <div className="mt-4 w-full p-3 bg-red-500 text-white rounded-lg text-center">
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="mt-4 w-full py-4 bg-black text-white rounded-lg font-bold transition-transform duration-300 hover:scale-105"
                            >
                                Sign Up
                            </button>
                            <div className="mt-4 text-center">
                                <span>Already Have an Account? </span>
                                <Link to="/" className="text-blue-600 underline">
                                    Log In
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Signup;
