// CreateGroupButton.tsx
import React from "react";

const CreateGroupButton = ({ onClick }) => {
  return (
    <button className="create-group-button" onClick={onClick}>
      Create Group
    </button>
  );
};

export default CreateGroupButton;
