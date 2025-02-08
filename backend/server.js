import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Load environment variables
const PORT = process.env.PORT || 3000;
const VERDN_API_KEY = process.env.VERDN_API_KEY;

if (!VERDN_API_KEY) {
  console.error("❌ Missing VERDN_API_KEY environment variable.");
  process.exit(1);
}

// Root Route: Confirm the server is running
app.get("/", (req, res) => {
  res.json({ message: "Server is running! 🚀" });
});

/**
 * POST /track-action
 * Expects a JSON body like:
 * {
 *   "actionType": "plant_tree",
 *   "quantity": 1
 * }
 * 
 * This endpoint calls the Verdn API to register an environmental action.
 */
app.post("/track-action", async (req, res) => {
  try {
    const { actionType, quantity } = req.body;

    if (!actionType || !quantity) {
      return res.status(400).json({ error: "Missing 'actionType' or 'quantity' in request body." });
    }

    // Example call to the Verdn API (adjust the URL and payload based on the official docs)
    const response = await axios.post(
      "https://api.verdn.io/v1/track",
      {
        action: actionType,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${VERDN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Customize the message based on the action type
    const impactMessage =
      actionType === "plant_tree"
        ? `By reducing your footprint today, you've helped plant ${quantity} tree(s)!`
        : `By reducing your footprint today, you've made an impact of ${quantity}!`;

    res.json({ message: impactMessage, data: response.data });
  } catch (error) {
    console.error("Error in /track-action:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error tracking environmental action." });
  }
});

/**
 * GET /impact
 * Fetch overall impact data from the Verdn API.
 */
app.get("/impact", async (req, res) => {
  try {
    const response = await axios.get("https://api.verdn.io/v1/impact", {
      headers: {
        Authorization: `Bearer ${VERDN_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    res.json({ data: response.data });
  } catch (error) {
    console.error("Error in /impact:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error fetching impact data." });
  }
});

/**
 * POST /pledge
 * Optional endpoint for users to pledge eco-friendly actions.
 * Expects a JSON body like:
 * {
 *   "userId": "user123",
 *   "pledgeAction": "reduce_plastic_usage"
 * }
 */
app.post("/pledge", async (req, res) => {
  try {
    const { userId, pledgeAction } = req.body;
    if (!userId || !pledgeAction) {
      return res.status(400).json({ error: "Missing 'userId' or 'pledgeAction' in request body." });
    }

    // Example call to a Verdn-supported pledges endpoint
    const response = await axios.post(
      "https://api.verdn.io/v1/pledges",
      {
        userId,
        pledge: pledgeAction,
      },
      {
        headers: {
          Authorization: `Bearer ${VERDN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ message: "Pledge registered successfully!", data: response.data });
  } catch (error) {
    console.error("Error in /pledge:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error registering pledge." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
