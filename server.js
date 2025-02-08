import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Enable CORS for the cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Load environment variables
const PORT = process.env.PORT || 3000;

// Sample API Route
app.get("/", (req, res) => {
  res.json({ message: "Server is running! 🚀" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
