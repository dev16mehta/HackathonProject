import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './StarterPage.css';  // Importing external CSS

const StarterPage = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const handleStartClick = () => {
    setShowOptions(true); // Show the New User & Existing User buttons
  };

  const handleSelection = (type) => {
    if (type === "new") {
      navigate("/tracker"); // Redirect to the Carbon Footprint Tracker
    } else if (type === "existing") {
      navigate("/intro"); // Redirect to an intro/register page
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1>ITS UHHH CARBON EMISSIONS TRACKER THING</h1>
        {!showOptions ? (
          <button onClick={handleStartClick} className="start-button">Start</button>
        ) : (
          <div className="user-options">
            <button onClick={() => handleSelection("new")}>New User</button>
            <button onClick={() => handleSelection("existing")}>Existing User</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StarterPage;