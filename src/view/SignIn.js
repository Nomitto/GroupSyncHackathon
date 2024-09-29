import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import './SignIn.css';

function SignIn() {
    const [signedIn, setSignedIn] = useState('');
    const [stage, setStage] = useState(0); // Track the current stage (0: Hello, 1: Welcome, 2: Sign In Button)
    const navigate = useNavigate();

    const handleClick = async () => {
        signInWithPopup(auth, provider).then(async (data) => {
            setSignedIn(data.user.email);
            localStorage.setItem("email", data.user.email);
            navigate('/home'); // Navigate to home after successful sign in
        });
    };

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email) {
            setSignedIn(email);
            navigate('/home'); // If user is already signed in, navigate to home
        }

        // Stage 1: Show "Welcome to GroupSync" after "Hello" fades out (2 seconds)
        const welcomeTimer = setTimeout(() => {
            setStage(1);
        }, 2000);

        // Stage 2: Show the sign-in button after "Welcome to GroupSync" (4 seconds)
        const signInButtonTimer = setTimeout(() => {
            setStage(2);
        }, 4000);

        // Clean up timers when component unmounts
        return () => {
            clearTimeout(welcomeTimer);
            clearTimeout(signInButtonTimer);
        };
    }, [navigate]);

    return (
        <div className="signin-container">
            {/* Stage 0: Hello */}
            {stage === 0 && <div className="message">Hello.</div>}

            {/* Stage 1: Welcome to GroupSync */}
            {stage === 1 && <div className="message">Welcome to GroupSync.</div>}

            {/* Stage 2: Sign In Button */}
            {stage === 2 && (
                signedIn ? <Home /> : <button className="signin-button google-signin fade-in" onClick={handleClick}>Sign In With Google</button>
            )}
        </div>
    );
}

export default SignIn;
