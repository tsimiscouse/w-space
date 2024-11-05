import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function FindLocation() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="justify-start font-sans font-semibold">
            <Routes>
            </Routes>
        </div>
    );
}

export default FindLocation;
