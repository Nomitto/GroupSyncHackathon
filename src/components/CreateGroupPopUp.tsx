import React, { useState } from "react";

interface PopUpStyles {
  overlay: React.CSSProperties;
  popup: React.CSSProperties;
}

const CreateGroupPopUp = ({ closePopUp, handleCreateGroup }) => {
  // Use React state to track the input value
  const [groupName, setGroupName] = useState("");

  const styles: PopUpStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    popup: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      width: "300px",
      textAlign: "center" as "center", // Explicitly cast as 'center'
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Create a New Group</h2>
        <input
          id="groupName"
          type="text"
          placeholder="Enter group name"
          value={groupName} // Bind the value to state
          onChange={(e) => setGroupName(e.target.value)} // Update state when the input changes
        />
        <button
          onClick={() => {
            handleCreateGroup(groupName); // Call your custom function with groupName
            closePopUp(); // Close the popup
          }}
        >
          Create
        </button>
        <button onClick={closePopUp}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateGroupPopUp;
