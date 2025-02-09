import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewUserIntro.css"; 

const NewUserIntro = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1); // Track which page the user is on

  // Function to go to the next page
  const nextPage = () => {
    if (page < 3) {
      setPage(page + 1);
    } else {
      navigate("/tracker"); // Redirect to questionnaire after last page
    }
  };

  return (
    <div className="intro-container">
      <div className="intro-box">
        {page === 1 && (
          <>
            <h2>What is Carbon Track?</h2>
            <p>Carbon Track is designed to help you calculate and reduce your carbon footprint.</p>
            <button onClick={nextPage} className="next-btn">Next →</button>
          </>
        )}
      </div>
    </div>
  );
};

export default NewUserIntro;