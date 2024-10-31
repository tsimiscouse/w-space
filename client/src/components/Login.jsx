import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.jpg';

const Login = ({ onLoginSuccess }) => {
    const [data, setData] = useState({ email: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const url = "http://localhost:5000/api/auth"; 
            await axios.post(url, data, { withCredentials: true });
            if (rememberMe) {
                localStorage.setItem("email", data.email);
            } else {
                localStorage.removeItem("email");
            }
            onLoginSuccess(); 
            navigate("/app"); 
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message); 
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="absolute top-[20px] right-[0px] w-[800px] h-[600px] rounded-full bg-gradient-radial from-fuchsia-500 to-cyan-500 opacity-30 blur-3xl -z-10"></div>
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
                <div className="relative w-full max-w-lg flex flex-col">
                    <h1 className="text-6xl font-bold mb-[80px]">Creating better moment.</h1>
                    <h2 className="text-2xl font-bold mb-6 items-start">Login to your account</h2>
                    <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="outline-none border-2 border-gray-300 w-full p-4 rounded-lg focus:border-black mb-4 transition duration-200 ease-in"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="outline-none border-2 border-gray-300 w-full p-4 rounded-lg focus:border-black mb-4 transition duration-200 ease-in"
                        />
                        <div className="flex items-center justify-between w-full mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Remember Me
                            </label>
                        </div>
                        {error && (
                            <div className="w-full p-4 mb-4 text-white bg-red-500 rounded-lg text-center">
                                {error}
                            </div>
                        )}
                        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold transition-transform duration-300 hover:scale-105">
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <span>New Here? </span>
                        <Link to="/register" className="text-blue-600 underline">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
