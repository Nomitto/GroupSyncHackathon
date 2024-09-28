import React, { useEffect, useState } from "react";
import { auth, provider, handleSignIn } from "../firebase"
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";

function SignIn() {
    const [signedIn, setValue] = useState('')

    const handleClick = async () => {
        signInWithPopup(auth, provider).then(async (data) => {
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
            await handleSignIn(data.user.displayName, data.user.uid)
        })
    }

    useEffect(() => {
        setValue(localStorage.getItem("email"))
    })

    return (
        <div>
            {signedIn ? <Home/> : <button onClick={handleClick}>Sign In With Google</button> }
        </div>
    );
}
export default SignIn;