<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import CreateGroupButton from "../components/CreateGroupButton.tsx";
import CreateGroupPopUp from "../components/CreateGroupPopUp.tsx";

function Home() {
  const [showPopUp, setShowPopUp] = useState(false);

  const openPopUp = () => {
    setShowPopUp(true);
  };

  const handleCreateGroup = (groupName) => {
    console.log("Group created: " + groupName);
  }

  const closePopUp = () => {
    setShowPopUp(false);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={logout}>Logout</button>
      <CreateGroupButton onClick={openPopUp} />
      {showPopUp && <CreateGroupPopUp closePopUp={closePopUp} handleCreateGroup={handleCreateGroup} />}
    </div>
  );
>>>>>>> roshan
}

export default Home;
