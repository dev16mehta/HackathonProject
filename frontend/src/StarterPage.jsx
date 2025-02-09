import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import TreeImage from "./assets/Tree2.png"; // Correct tree image path
import ClimateChangeImage from "./assets/climatechange.png"; // Import the climate change image

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
      {/* Climate Change Image */}
      <div className="climate-image-container">
        <img src={ClimateChangeImage} alt="Climate Change" className="climate-image" />
      </div>

      {/* Starter Content */}
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

      {/* Tree Image */}
      <div className="tree-container">
        <img src={TreeImage} alt="Tree" className="tree-image" />
      </div>
    </div>
  );
};

export default StarterPage;
