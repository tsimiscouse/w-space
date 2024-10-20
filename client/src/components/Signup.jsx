import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {loading && (
                <div className="loader-wrapper">
                    <span className="loader">
                        <span className="loader-inner"></span>
                    </span>
                </div>
            )}
            <div className="flex w-[900px] h-[500px] rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col items-center justify-center w-1/3 bg-[#1260CC] text-white">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <Link to="/">
                        <button
                            type="button"
                            className="mt-4 px-4 py-2 bg-white text-[#1260CC] rounded-lg font-bold transition-transform duration-300 hover:scale-105"
                        >
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center w-2/3 bg-white">
                    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                        <h1 className="text-4xl font-bold">Create Account</h1>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className="mt-4 p-4 border border-gray-300 rounded-lg w-[370px] focus:outline-none focus:ring-2 focus:ring-[#1260CC]"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className="mt-4 p-4 border border-gray-300 rounded-lg w-[370px] focus:outline-none focus:ring-2 focus:ring-[#1260CC]"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="mt-4 p-4 border border-gray-300 rounded-lg w-[370px] focus:outline-none focus:ring-2 focus:ring-[#1260CC]"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="mt-4 p-4 border border-gray-300 rounded-lg w-[370px] focus:outline-none focus:ring-2 focus:ring-[#1260CC]"
                        />
                        {error && (
                            <div className="mt-4 w-[370px] p-4 bg-red-500 text-white rounded-lg text-center">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="mt-4 w-full py-2 bg-[#1260CC] text-white rounded-lg font-bold transition-transform duration-300 hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
