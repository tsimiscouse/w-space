import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home';
import Loader from './components/Loader/Loader.jsx'; 
<<<<<<< Updated upstream
=======
import FindPage from './components/FindPage.jsx';
import SpacePage from './components/SpacePage.jsx';
import BookingReceipt from './components/BookingReceipt.jsx';
import Activity from './components/Activity.jsx';
>>>>>>> Stashed changes
import './App.css';
import FindPage from './components/FindPage.jsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const authState = localStorage.getItem('token');
        if (authState) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

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
<<<<<<< Updated upstream
                <Route path="/register" element={<Signup />} />
                <Route path="/app" element={
                    isAuthenticated ? (
                        <Home />
                    ) : (
                        <Login onLoginSuccess={handleLoginSuccess} />
                    )
                } />
                <Route path="/search" element={
                    isAuthenticated ? (
                        <FindPage />
                    ) : (
                        <Login onLoginSuccess={handleLoginSuccess} />
                    )
                } />
=======
                <Route path="/signup" element={<Signup />} />
                {isAuthenticated ? (
                    <>
                        <Route path="/app" element={<Home />} />
                        <Route path="/search" element={<FindPage />} />
                        <Route path="/spaces/:_id" element={<SpacePage />} />
                        <Route path="/booking-receipt/:_Id" element={<BookingReceipt />} />
                        <Route path="/activity" element={<Activity />} />
                    </>
                ) : (
                    <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                )}
>>>>>>> Stashed changes
            </Routes>
        </div>
    );
}

export default App;
