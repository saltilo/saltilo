import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;

app.use(cors());

app.get("/cryptoprice", async (req, res) => {
  console.log("Using API Key:", process.env.API_KEY);
  const { symbol } = req.query;

  if (!symbol) {
    console.error("Symbol is missing");
    return res.status(400).json({ error: "Symbol is required" });
  }

  try {
    const apiUrl = `https://api.api-ninjas.com/v1/cryptoprice?symbol=${symbol}`;
    console.log("Forwarding request to external API:", apiUrl);

    const response = await fetch(apiUrl, {
      headers: { "X-Api-Key": process.env.API_KEY },
    });

    console.log("External API response status:", response.status);

    if (!response.ok) {
      console.error("External API error:", response.statusText);
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();
    console.log("External API response data:", data);
    res.json(data);
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
