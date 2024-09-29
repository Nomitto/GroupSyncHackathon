import React, { useEffect, useState } from "react";
import { auth, provider } from "./config"
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function SignIn() {
    const [value, setValue] = useState('null')
    const navigate = useNavigate();
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
            navigate('/home')
        })
    }

    useEffect(() => {
        const email = localStorage.getItem("email");
        if(email){
            setValue(email)
            navigate('/home')
        }
    }, [navigate])

    if(value){
        navigate('/home')
    }
    return (
        <div>
            <button onClick={handleClick}>Signin With Google</button>
        </div>
    );
}
export default SignIn;
