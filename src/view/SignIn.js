import React, { useEffect, useState } from "react";
import { auth, provider, handleSignIn } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";
import './SignIn.css';

function SignIn() {
    const [signedIn, setValue] = useState('');
    const [stage, setStage] = useState(0); // Track the current stage (0: Hello, 1: Welcome, 2: Sign In Button)

    const handleClick = async () => {
        signInWithPopup(auth, provider).then(async (data) => {
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
            await handleSignIn(data.user.displayName, data.user.uid);
        });
    };

    useEffect(() => {
        setValue(localStorage.getItem("email"));

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
    }, []);

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
