import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StarterPage from "./StarterPage";
import CarbonFootprintTracker from "./CarbonFootprintTracker";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/tracker" element={<CarbonFootprintTracker />} />
        <Route path="/intro" element={<div>Intro / Registration Page (To Be Built)</div>} />
      </Routes>
    </Router>
  );
};

export default App;
