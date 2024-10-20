import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
            // Include withCredentials to handle cookies properly
            const { data: res } = await axios.post(url, data, { withCredentials: true });
            // Manage email storage based on rememberMe
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="loader-wrapper">
                        <span className="loader">
                            <span className="loader-inner"></span>
                        </span>
                    </div>
                </div>
            )}
            <div className="relative w-11/12 max-w-4xl h-auto flex rounded-lg shadow-lg overflow-hidden">
                <div className="w-3/4 flex flex-col items-center justify-center bg-white p-8">
                    <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                        <h1 className="text-4xl font-bold mb-6">Login to Your Account</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="outline-none border w-full p-4 rounded-lg bg-green-100 mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="outline-none border w-full p-4 rounded-lg bg-green-100 mb-4"
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
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold transition-transform duration-300 hover:scale-105">
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <div className="w-2/5 flex flex-col items-center justify-center bg-blue-600 text-white p-8">
                    <h1 className="text-4xl font-bold mb-4">New Here?</h1>
                    <Link to="/register">
                        <button type="button" className="w-full bg-white text-blue-600 px-5 py-2 rounded-lg font-bold transition-transform duration-300 hover:scale-105">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
