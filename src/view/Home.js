import React, { useState } from "react";
import { getGroups } from "../firebase";

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

  return (
    <div className="home-container">
      <h1>Home Page</h1>

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
