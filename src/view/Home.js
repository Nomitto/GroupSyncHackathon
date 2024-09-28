import React, { useEffect, useState } from "react";
import Popup from 'react'
import { getGroups, getName, getUID, handleCreateGroup } from "../firebase";
import './Home.css'; // Import the CSS file

import CreateGroupButton from "../components/CreateGroupButton.tsx";
import CreateGroupPopUp from "../components/CreateGroupPopUp.tsx";
import handleCreateGroupBE from "../firebase.js";

function Home() {
  const [showPopUp, setShowPopUp] = useState(false);

  // Open the group creation popup
  const handleOpenPopUp = () => {
    setShowPopUp(true);
  };

  // Close the group creation popup
  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  // Handle group creation with group name and member emails
  const handleCreateGroup = (groupName, emails) => {
    if (!groupName || emails.length === 0) {
      console.error("Group name or emails missing");
      return;
    }
    console.log(`Group created: ${groupName}, with members: ${emails.join(", ")}`);
    handleCreateGroupBE();
    handleClosePopUp();
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [userGroups, setUserGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
        try {
            const res = await getGroups();
            setUserGroups(res);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    fetchData()
  }, []);

  if (loading) {
      return <p>Loading...</p>
  }

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Home;
