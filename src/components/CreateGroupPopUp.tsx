import React, { useState } from "react";

interface PopUpStyles {
  overlay: React.CSSProperties;
  popup: React.CSSProperties;
}

const CreateGroupPopUp = ({ closePopUp, handleCreateGroup }) => {
  // Use React state to track the input value
  const [groupName, setGroupName] = useState("");
  const [email, setEmail] = useState(""); // Current email being typed
  const [emails, setEmails] = useState<string[]>([]); // Array of strings

  // Function to add email to list and clear input
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && email) {
      if (validateEmail(email)) {
        setEmails([...emails, email]); // Add email to list
        setEmail(""); // Clear input
      } else {
        alert("Please enter a valid email address.");
      }
      e.preventDefault();
    }
  };

  // Function to remove an email
  const removeEmail = (indexToRemove) => {
    setEmails(emails.filter((_, index) => index !== indexToRemove));
  };

  // Basic email validation
  const validateEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  const styles = {
    overlay: {
      position: "fixed" as "fixed",
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
    emailContainer: {
      display: "flex",
      flexWrap: "wrap" as "wrap",
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    chip: {
      display: "flex",
      alignItems: "center",
      background: "#e0e0e0",
      borderRadius: "15px",
      padding: "5px 10px",
      margin: "5px",
    },
    remove: {
      marginLeft: "10px",
      cursor: "pointer",
    },
    input: {
      border: "none",
      flex: "1",
      outline: "none",
    },
  };

  return (
    <div>
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
          <div style={styles.emailContainer}>
            {/* Render each email as a chip */}
            {emails.map((email, index) => (
              <div key={index} style={styles.chip}>
                {email}
                <span style={styles.remove} onClick={() => removeEmail(index)}>
                  &times;
                </span>
              </div>
            ))}
            <input
              type="text"
              value={email}
              placeholder="Enter email and press Enter"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
            />
          </div>
          <button
            onClick={() => {
              handleCreateGroup(groupName, emails); // Call your custom function with groupName
              closePopUp(); // Close the popup
            }}
          >
            Create
          </button>
          <button onClick={closePopUp}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPopUp;
