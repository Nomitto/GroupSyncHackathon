import React from "react";
import { useNavigate, Link } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signin');
    };

    return (
        <div>
            <h1>GroupSync</h1>
            <Link to="/calendar">View Calendar</Link>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Home;