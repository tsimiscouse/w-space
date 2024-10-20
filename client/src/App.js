import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authState = localStorage.getItem('token');
        if (authState) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        navigate('/app'); 
    };

    return (
        <div className="wrapper font-poppins font-semibold">
            <Routes>
                <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/app" element={
                    isAuthenticated ? (
                        <h1>Welcome to the App!</h1> 
                    ) : (
                        <Login onLoginSuccess={handleLoginSuccess} />
                    )
                } />
            </Routes>
        </div>
    );
}

export default App;
