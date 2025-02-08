import React, { useState } from "react";

const CarbonFootprintTracker = () => {
  const [answers, setAnswers] = useState({
    transport: "",
    diet: "",
    energy: "",
    shopping: "",
  });
  const [result, setResult] = useState(null);
  const [badge, setBadge] = useState("");

  // Predefined carbon footprint values (example)
  const carbonData = {
    transport: { car: 10, public_transport: 5, bike: 1, walk: 0 },
    diet: { meat: 8, vegetarian: 5, vegan: 3 },
    energy: 2, // CO2 per hour
    shopping: { fast: 6, sustainable: 2 },
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const calculateFootprint = () => {
    let totalCO2 =
      (carbonData.transport[answers.transport] || 0) +
      (carbonData.diet[answers.diet] || 0) +
      (answers.energy ? parseInt(answers.energy) * carbonData.energy : 0) +
      (carbonData.shopping[answers.shopping] || 0);

    // Set gamification badge
    if (totalCO2 < 10) setBadge("🌱 Eco Warrior");
    else if (totalCO2 < 20) setBadge("♻️ Sustainability Starter");
    else setBadge("🌍 Can Improve");

    setResult(totalCO2);
  };

  return (
    <div className="container">
      <h1>🌍 Virtual Carbon Footprint Tracker</h1>
      <p>Calculate your daily carbon footprint & get eco-friendly tips!</p>

      {!result ? (
        <div className="form">
          <label>How do you commute daily?</label>
          <select name="transport" onChange={handleChange}>
            <option value="">Select...</option>
            <option value="car">Car</option>
            <option value="public_transport">Public Transport</option>
            <option value="bike">Bike</option>
            <option value="walk">Walk</option>
          </select>

          <label>What’s your diet?</label>
          <select name="diet" onChange={handleChange}>
            <option value="">Select...</option>
            <option value="meat">Meat</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>

          <label>How many hours do you use electronic devices daily?</label>
          <input type="number" name="energy" onChange={handleChange} />

          <label>Do you buy sustainable or fast fashion?</label>
          <select name="shopping" onChange={handleChange}>
            <option value="">Select...</option>
            <option value="fast">Fast Fashion</option>
            <option value="sustainable">Sustainable</option>
          </select>

          <button onClick={calculateFootprint}>Calculate Footprint</button>
        </div>
      ) : (
        <div className="results">
          <h2>Your Estimated Carbon Footprint: {result} kg CO₂</h2>
          <p>🌿 Suggested Actions:</p>
          <ul>
            {answers.transport === "car" && <li>Switch to public transport to save CO₂.</li>}
            {answers.diet === "meat" && <li>Try a plant-based meal once a week.</li>}
            {answers.shopping === "fast" && <li>Choose sustainable brands for a lower footprint.</li>}
          </ul>
          <p className="badge">🎖 {badge}</p>
          <p className="verdn">🌱 Thanks to your eco-friendly choices, you've helped plant 1 tree! (Mock Verdn API)</p>

          <button onClick={() => setResult(null)}>Recalculate</button>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintTracker;
