import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StarterPage from "./StarterPage.jsx";
import CarbonFootprintTracker from "./CarbonFootprintTracker.jsx";
import RegistrationPage from "./RegistrationPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/tracker" element={<CarbonFootprintTracker />} />
      </Routes>
    </Router>
  );
}

export default App;