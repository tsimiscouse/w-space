import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home';
import Loader from './components/Loader/Loader.jsx'; 
import FindPage from './components/FindPage.jsx';
import SpacePage from './components/SpacePage.jsx';
import BookingReceipt from './components/BookingReceipt.jsx';
import ContactUs from './components/ContactUs.jsx'; // Import halaman Contact Us
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/profile', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    setIsAuthenticated(true);
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
        navigate('/app'); 
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="justify-start font-sans font-semibold">
            <Routes>
                <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/signup" element={<Signup />} />
                {isAuthenticated ? (
                    <>
                        <Route path="/app" element={<Home />} />
                        <Route path="/search" element={<FindPage />} />
                        <Route path="/spaces/:_id" element={<SpacePage />} />
                        <Route path="/booking-receipt/:_Id" element={<BookingReceipt />} />
                        <Route path="/contact-us" element={<ContactUs />} /> {/* Tambahkan routing ini */}
                    </>
                ) : (
                    <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                )}
            </Routes>
        </div>
    );
}

export default App;
