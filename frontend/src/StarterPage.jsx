import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Import styles

const StarterPage = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const handleStartClick = () => {
    setShowOptions(true);
  };

  const handleSelection = (type) => {
    if (type === "new") {
      navigate("/tracker");
    } else if (type === "existing") {
      navigate("/register");
    }
  };

  return (
    <div className="starter-layout">
      {/* Left side: Starter Page content (40%) */}
      <div className="starter-container">
        <h1>CarbonTrack</h1>
        {!showOptions ? (
          <button onClick={handleStartClick} className="start-btn">Start</button>
        ) : (
          <div className="user-options">
            <button onClick={() => handleSelection("new")} className="user-btn">New User</button>
            <button onClick={() => handleSelection("existing")} className="user-btn">Existing User</button>
          </div>
        )}
      </div>

      {/* Right side: Blank space (60%) */}
      <div className="blank-space"></div>
    </div>
  );
};

export default StarterPage;
