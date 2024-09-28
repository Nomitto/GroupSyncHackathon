import React, { useEffect, useState } from "react";
import Popup from 'react'
import { getGroups } from "../firebase";

function Home() {
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
export default Home;