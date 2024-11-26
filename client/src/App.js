import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home';
import Loader from './components/Loader/Loader.jsx'; 
import FindPage from './components/FindPage.jsx';
import SpacePage from './components/SpacePage.jsx';
import BookingReceipt from './components/BookingReceipt.jsx';
import ContactUs from './components/ContactUs.jsx';
import AboutUs from './components/AboutUs.jsx'; 
import OurTeam from './components/OurTeam.jsx'; 
import Activity from './components/Activity.jsx';
import './App.css';

import AdminDashboard from './components/admin/AdminDashboard.jsx';
import SpaceManagement from './components/admin/SpaceManagement.jsx';
import BookingManagement from './components/admin/BookingManagement.jsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    setIsAuthenticated(true);
    
                    const token = getCookie('userProfile'); // Get token from cookies
                    if (token) {
                        try {
                            // Decode URL-encoded JSON manually
                            const decodedToken = JSON.parse(decodeURIComponent(token));
                            if (decodedToken.role === 'admin') {
                                setIsAdmin(true);
                            } else {
                                setIsAdmin(false);
                            }
                        } catch (error) {
                            console.error('Token decoding failed:', error);
                            setIsAuthenticated(false); // Handle invalid token
                        }
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error('Authentication check failed:', err);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setIsLoading(true);
        setTimeout(() => {
            window.location.reload();
            navigate('/');
            setIsLoading(false);
        }, 4000);
    };


    if (isLoading) {
        return <Loader />; 
    }

    return (
        <Routes>
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            {isAuthenticated ? (
                <>
                    <Route path="/app" element={<Home />} />
                    <Route path="/search" element={<FindPage />} />
                    <Route path="/spaces/:_id" element={<SpacePage />} />
                    <Route path="/booking-receipt/:_Id" element={<BookingReceipt />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/our-team" element={<OurTeam />} />
                    <Route path="/activity" element={<Activity />} /> 
                      

                    {/* Admin Routes - Protected */}
                    {isAdmin && (
                        <>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/spaces" element={<SpaceManagement />} />
                            <Route path="/admin/bookings" element={<BookingManagement />} />
                        </>
                    )}
                </>
            ) : (
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            )}
        </Routes>
    );
}

// Helper function to retrieve a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

export default App;
