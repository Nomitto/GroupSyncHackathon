import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { getGroups, getName, getUID, handleCreateGroup } from "../firebase";
import './Home.css'; // Import the CSS file

import CreateGroupButton from "../components/CreateGroupButton.tsx";
import CreateGroupPopUp from "../components/CreateGroupPopUp.tsx";
import { handleCreateGroupBE } from "../firebase.js";
import NavBar from "../components/NavBar.tsx";

function Home() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    handleCreateGroupBE(groupName);
    handleClosePopUp();
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin'); // Use navigate to redirect to sign in page
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getGroups();
        setUserGroups(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  let greeting = "Welcome, " + getName(); // getName now always returns a safe value

  return (
    <div className="home-container">
      <NavBar /> {/* Include NavBar */}
      <h1>{greeting}</h1>

      {/* Navigation Links */}
      <Link to="/calendar">View Calendar</Link>
      <Link to="/heatmap">View Calendar Heatmap</Link>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      {/* Button to open Create Group popup */}
      <CreateGroupButton onClick={handleOpenPopUp} />

      {/* Group creation popup */}
      {showPopUp && (
        <CreateGroupPopUp
          closePopUp={handleClosePopUp}
          handleCreateGroup={handleCreateGroup}
        />
      )}
    </div>
  );
}

export default Home;
