import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

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
    <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        <h1>AppName</h1>
        {!showOptions ? (
          <button onClick={handleStartClick} style={{ margin: "20px 0" }}>Start</button>
        ) : (
          <div className="user-options" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={() => handleSelection("new")}>New User</button>
            <button onClick={() => handleSelection("existing")}>Existing User</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StarterPage;
