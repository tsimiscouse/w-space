import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.jpg';

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
            const url = "http://localhost:5000/api/users";
            const { data: res } = await axios.post(url, data);
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
        <div className="flex min-h-screen">
            {/* Logo Section */}
            <div className="w-1/2 flex items-center justify-center bg-transparent">
                <img src={Logo} alt="W-Space Logo" style={{ width: '400px', height: 'auto' }} />
            </div>

            {/* Login Form Section */}
            <div className="w-1/2 flex items-center justify-center bg-transparent p-8">
                {loading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                        <div className="loader-wrapper">
                            <span className="loader">
                                <span className="loader-inner"></span>
                            </span>
                        </div>
                    </div>
                )}
                <div className="relative w-full flex max-w-lg flex-col">
                    <h1 className="text-6xl font-black mb-[50px]">Enhance productivity.</h1>
                    <h2 className="text-2xl font-black mb-1">Join now</h2>
                    <form className="flex flex-col w-full text-sm" onSubmit={handleSubmit}>
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
